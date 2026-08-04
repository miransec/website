import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "fs";
import path from "path";
import { ResumeCta } from "@/components/ResumeCta";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé download for Miran — AI Engineer.",
  alternates: { canonical: "/resume" },
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  const resumePath = path.join(
    process.cwd(),
    "public",
    siteConfig.resume.path.replace(/^\//, ""),
  );
  const available = siteConfig.resume.available && existsSync(resumePath);

  return (
    <div className="container-page py-14 md:py-20">
      <p className="section-label">résumé</p>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-4xl">
        Résumé
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
        {available
          ? "Download the current résumé PDF."
          : "The résumé PDF is not published yet."}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <ResumeCta />
        <Link
          href="/contact"
          className="font-mono-ui text-xs text-fg-subtle hover:text-fg"
        >
          contact →
        </Link>
      </div>
    </div>
  );
}
