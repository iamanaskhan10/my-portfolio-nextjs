import { getPortfolioContent } from "../../lib/server/contentStore";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }
  const content = await getPortfolioContent({ publicOnly: true });
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ success: true, content });
}
