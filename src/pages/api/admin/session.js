import { adminConfigured, hasAdminSession } from "../../../lib/server/adminAuth";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ success: true, configured: adminConfigured(), authenticated: hasAdminSession(req) });
}
