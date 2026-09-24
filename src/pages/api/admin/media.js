import crypto from "node:crypto";
import path from "node:path";
import { mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import { requireAdmin, sameOrigin } from "../../../lib/server/adminAuth";
import { getUploadDirectory } from "../../../lib/server/contentStore";

export const config = { api: { bodyParser: { sizeLimit: "14mb" } } };

const TYPES = {
  "image/png": { extension: "png", valid: (buffer) => buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) },
  "image/jpeg": { extension: "jpg", valid: (buffer) => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff },
  "image/webp": { extension: "webp", valid: (buffer) => buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP" },
  "image/gif": { extension: "gif", valid: (buffer) => buffer.subarray(0, 4).toString() === "GIF8" },
};
const MAX_BYTES = 10 * 1024 * 1024;
const mediaUrl = (name) => `/api/media/${encodeURIComponent(name)}`;

async function listMedia() {
  const directory = getUploadDirectory();
  await mkdir(directory, { recursive: true });
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.filter((entry) => entry.isFile() && /\.(png|jpe?g|webp|gif)$/i.test(entry.name)).map(async (entry) => {
    const details = await stat(path.join(directory, entry.name));
    return { name: entry.name, url: mediaUrl(entry.name), size: details.size, modifiedAt: details.mtime.toISOString() };
  }));
  return files.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") return res.status(200).json({ success: true, media: await listMedia() });
  if (!sameOrigin(req)) return res.status(403).json({ success: false, message: "Request origin was rejected." });

  if (req.method === "POST") {
    try {
      const type = TYPES[req.body?.type];
      if (!type || typeof req.body?.data !== "string") throw new Error("Choose a PNG, JPEG, WebP, or GIF image.");
      const buffer = Buffer.from(req.body.data, "base64");
      if (!buffer.length || buffer.length > MAX_BYTES || !type.valid(buffer)) throw new Error("The image is invalid or larger than 10 MB.");
      const stem = String(req.body?.name || "image").replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "image";
      const filename = `${stem}-${crypto.randomUUID().slice(0, 8)}.${type.extension}`;
      const directory = getUploadDirectory();
      await mkdir(directory, { recursive: true });
      await writeFile(path.join(directory, filename), buffer, { flag: "wx" });
      return res.status(201).json({ success: true, media: { name: filename, url: mediaUrl(filename), size: buffer.length, width: Number(req.body?.width) || 1, height: Number(req.body?.height) || 1, modifiedAt: new Date().toISOString() } });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message || "Upload failed." });
    }
  }

  if (req.method === "DELETE") {
    const name = String(req.query.name || "");
    if (!/^[a-z0-9][a-z0-9-]*\.(png|jpg|jpeg|webp|gif)$/i.test(name) || path.basename(name) !== name) return res.status(400).json({ success: false, message: "Invalid media name." });
    try {
      await unlink(path.join(getUploadDirectory(), name));
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error?.code === "ENOENT") return res.status(404).json({ success: false, message: "Media not found." });
      return res.status(500).json({ success: false, message: "Media could not be deleted." });
    }
  }

  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ success: false, message: "Method not allowed." });
}
