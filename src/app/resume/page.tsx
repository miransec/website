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
    <div className="container-page py-16 md:py-20">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-medium tracking-tight text-fg md:text-4xl">
          Résumé
        </h1>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          {available
            ? "Download the current résumé PDF."
            : "The résumé PDF is not published yet. This route is prepared for when the file is added at public/resume.pdf."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ResumeCta />
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md px-4 py-2.5 text-sm text-fg-muted hover:bg-surface-hover hover:text-fg"
          >
            Contact
          </Link>
        </div>
      </header>
    </div>
  );
}
