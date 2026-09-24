import crypto from "node:crypto";

export const ADMIN_COOKIE = "portfolio_admin";
const SESSION_SECONDS = 8 * 60 * 60;

const encode = (value) => Buffer.from(value).toString("base64url");
const sign = (value, secret) => crypto.createHmac("sha256", secret).update(value).digest("base64url");

function getConfig() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  return { configured: Boolean(password?.length >= 12 && secret?.length >= 32), password, secret };
}

function parseCookies(header = "") {
  return Object.fromEntries(header.split(";").map((part) => part.trim().split(/=(.*)/s).slice(0, 2)).filter(([key, value]) => key && value));
}

export function verifyAdminPassword(candidate) {
  const config = getConfig();
  if (!config.configured || typeof candidate !== "string") return false;
  const supplied = Buffer.from(candidate);
  const expected = Buffer.from(config.password);
  return supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
}

export function createAdminSession() {
  const { configured, secret } = getConfig();
  if (!configured) throw new Error("Admin access is not configured.");
  const payload = encode(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS }));
  return `${payload}.${sign(payload, secret)}`;
}

export function hasAdminSession(req) {
  const { configured, secret } = getConfig();
  if (!configured) return false;
  const token = parseCookies(req.headers.cookie)[ADMIN_COOKIE];
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload, secret);
  const suppliedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (suppliedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(suppliedBuffer, expectedBuffer)) return false;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")).exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function requireAdmin(req, res) {
  if (hasAdminSession(req)) return true;
  res.status(401).json({ success: false, message: "Sign in to continue." });
  return false;
}

export function adminConfigured() {
  return getConfig().configured;
}

export function sessionCookie(token, req, maxAge = SESSION_SECONDS) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const secure = forwardedProto === "https" || process.env.NODE_ENV === "production";
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;
}

export function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const expectedHost = req.headers["x-forwarded-host"] || req.headers.host;
    return new URL(origin).host === expectedHost;
  } catch {
    return false;
  }
}
