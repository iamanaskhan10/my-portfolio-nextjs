import { randomBytes } from "node:crypto";
import { readFile, appendFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "dotenv";

const destination = path.resolve(".env.local");
let existing = "";
try {
  existing = await readFile(destination, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const configuration = parse(existing);
const additions = [];
for (const [key, bytes] of [["ADMIN_PASSWORD", 18], ["ADMIN_SESSION_SECRET", 48]]) {
  if (!configuration[key]?.trim()) additions.push(`${key}=${randomBytes(bytes).toString("base64url")}`);
}
if (additions.length) {
  await appendFile(destination, `\n# Local portfolio CMS\n${additions.join("\n")}\n`, { encoding: "utf8", mode: 0o600 });
}
console.log(additions.length ? "CMS credentials generated in .env.local. Existing settings were preserved." : "CMS credentials already exist in .env.local. No changes made.");
console.log("Use the ADMIN_PASSWORD value to sign in at /admin. Restart the server after setup.");
