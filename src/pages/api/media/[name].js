import path from "node:path";
import { readFile } from "node:fs/promises";
import { getUploadDirectory } from "../../../lib/server/contentStore";

const MIME_TYPES = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

// Runtime uploads must be served dynamically: Next's production public-file
// inventory is created at startup and does not include later uploads.
export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }
  const name = req.query.name;
  if (typeof name !== "string" || !/^[a-z0-9][a-z0-9-]*\.(png|jpe?g|webp|gif)$/i.test(name)) {
    return res.status(404).end();
  }
  try {
    const buffer = await readFile(path.join(getUploadDirectory(), name));
    res.setHeader("Content-Type", MIME_TYPES[name.split(".").pop().toLowerCase()]);
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "public, max-age=3600");
    return req.method === "HEAD" ? res.status(200).end() : res.status(200).send(buffer);
  } catch (error) {
    return res.status(error.code === "ENOENT" ? 404 : 500).end();
  }
}
