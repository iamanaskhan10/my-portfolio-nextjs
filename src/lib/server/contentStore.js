import path from "node:path";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { cloneDefaultContent } from "../../data/contentDefaults";
import { validatePortfolioContent } from "./contentValidation";

const contentPath = () => path.resolve(process.env.PORTFOLIO_CONTENT_PATH || path.join(process.cwd(), "content", "portfolio.json"));
let writeQueue = Promise.resolve();

export async function getPortfolioContent({ publicOnly = false } = {}) {
  let content;
  try {
    content = validatePortfolioContent(JSON.parse(await readFile(contentPath(), "utf8")));
  } catch (error) {
    if (error?.code !== "ENOENT") console.error("Using bundled portfolio content:", error.message);
    content = cloneDefaultContent();
  }

  if (!publicOnly) return content;
  return {
    ...content,
    projects: content.projects.filter((project) => project.published !== false),
  };
}

export async function savePortfolioContent(input) {
  const prepared = {
    ...input,
    version: 1,
    updatedAt: new Date().toISOString(),
    projects: input?.projects?.map((project) => ({ ...project, cover: project.gallery?.[0] || null })),
  };
  const content = validatePortfolioContent(prepared);
  const destination = contentPath();
  const operation = async () => {
    await mkdir(path.dirname(destination), { recursive: true });
    const temporary = `${destination}.${process.pid}.tmp`;
    await writeFile(temporary, `${JSON.stringify(content, null, 2)}\n`, "utf8");
    await rename(temporary, destination);
    return content;
  };
  writeQueue = writeQueue.then(operation, operation);
  return writeQueue;
}

export function getUploadDirectory() {
  return path.resolve(process.env.PORTFOLIO_UPLOAD_DIR || path.join(process.cwd(), "public", "uploads"));
}
