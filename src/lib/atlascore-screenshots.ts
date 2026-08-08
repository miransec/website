import { existsSync } from "fs";
import path from "path";

export const atlascoreScreenshotFiles = [
  "ask-ai.png",
  "dashboard.png",
  "knowledge.png",
  "search.png",
  "workspaces.png",
  "security.png",
] as const;

export type AtlascoreScreenshotFile =
  (typeof atlascoreScreenshotFiles)[number];

export function atlascoreScreenshotSrc(
  file: AtlascoreScreenshotFile,
): string | null {
  const full = path.join(
    process.cwd(),
    "public",
    "projects",
    "atlascore",
    file,
  );
  return existsSync(full) ? `/projects/atlascore/${file}` : null;
}

export function hasAtlascoreScreenshot(
  file: AtlascoreScreenshotFile,
): boolean {
  return atlascoreScreenshotSrc(file) !== null;
}
