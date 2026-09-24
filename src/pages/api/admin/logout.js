import { sessionCookie, sameOrigin } from "../../../lib/server/adminAuth";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }
  if (!sameOrigin(req)) return res.status(403).json({ success: false, message: "Request origin was rejected." });
  res.setHeader("Set-Cookie", sessionCookie("", req, 0));
  return res.status(200).json({ success: true });
}
