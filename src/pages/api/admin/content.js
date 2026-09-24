import { requireAdmin, sameOrigin } from "../../../lib/server/adminAuth";
import { getPortfolioContent, savePortfolioContent } from "../../../lib/server/contentStore";

export const config = { api: { bodyParser: { sizeLimit: "2mb" } } };

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    return res.status(200).json({ success: true, content: await getPortfolioContent() });
  }
  if (req.method === "PUT") {
    if (!sameOrigin(req)) return res.status(403).json({ success: false, message: "Request origin was rejected." });
    try {
      const content = await savePortfolioContent(req.body?.content);
      return res.status(200).json({ success: true, content });
    } catch (error) {
      console.error("Content save failed:", error);
      return res.status(400).json({ success: false, message: error.message || "Content could not be saved." });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ success: false, message: "Method not allowed." });
}
