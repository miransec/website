import { existsSync } from "fs";
import path from "path";
import { siteConfig } from "@/data/site";
import { Button } from "./Button";

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
        className={`inline-flex items-center rounded-md border border-border px-4 py-2.5 text-sm text-fg-subtle ${className}`}
      >
        Résumé coming soon
      </span>
    );
  }

  return (
    <Button
      href={siteConfig.resume.path}
      variant="secondary"
      external
      className={className}
      aria-label="Download résumé PDF"
    >
      Download résumé
    </Button>
  );
}
