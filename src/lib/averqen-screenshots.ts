import { existsSync } from "fs";
import path from "path";

export const averqenScreenshotFiles = [
  "dashboard.png",
  "incidents.png",
  "incident-detail.png",
  "entities.png",
  "threat-intel.png",
  "response.png",
] as const;

export type AverqenScreenshotFile = (typeof averqenScreenshotFiles)[number];

export function averqenScreenshotSrc(
  file: AverqenScreenshotFile,
): string | null {
  const full = path.join(
    process.cwd(),
    "public",
    "projects",
    "averqen",
    file,
  );
  return existsSync(full) ? `/projects/averqen/${file}` : null;
}

export function hasAverqenScreenshot(file: AverqenScreenshotFile): boolean {
  return averqenScreenshotSrc(file) !== null;
}
