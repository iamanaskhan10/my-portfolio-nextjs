import { createAdminSession, sessionCookie, sameOrigin, verifyAdminPassword } from "../../../lib/server/adminAuth";

const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }
  if (!sameOrigin(req)) return res.status(403).json({ success: false, message: "Request origin was rejected." });

  const address = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
  const now = Date.now();
  const record = attempts.get(address);
  const current = !record || now - record.startedAt > WINDOW_MS ? { startedAt: now, count: 0 } : record;
  if (current.count >= MAX_ATTEMPTS) return res.status(429).json({ success: false, message: "Too many attempts. Try again later." });

  if (!verifyAdminPassword(req.body?.password)) {
    attempts.set(address, { ...current, count: current.count + 1 });
    return res.status(401).json({ success: false, message: "Incorrect password." });
  }

  attempts.delete(address);
  const token = createAdminSession();
  res.setHeader("Set-Cookie", sessionCookie(token, req));
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ success: true });
}
