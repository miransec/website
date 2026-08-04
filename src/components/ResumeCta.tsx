import { existsSync } from "fs";
import path from "path";
import { siteConfig } from "@/data/site";

export function ResumeCta({ className = "" }: { className?: string }) {
  const resumePath = path.join(
    process.cwd(),
    "public",
    siteConfig.resume.path.replace(/^\//, ""),
  );
  const available = siteConfig.resume.available && existsSync(resumePath);

  if (!available) {
    return (
      <span
        className={`font-mono-ui text-xs text-fg-subtle ${className}`}
      >
        résumé coming soon
      </span>
    );
  }

  return (
    <a
      href={siteConfig.resume.path}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono-ui text-xs text-accent-fg hover:underline ${className}`}
      aria-label="Download résumé PDF"
    >
      download résumé →
    </a>
  );
}
