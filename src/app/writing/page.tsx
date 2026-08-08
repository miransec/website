import type { Metadata } from "next";
import Link from "next/link";
import { readingMinutes, writingArticles } from "@/data/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering notes on building AI systems where retrieval, authorization, evaluation, and security matter as much as the model.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="section-label">writing</p>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-4xl">
        Engineering notes
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
        Notes on building AI systems where retrieval, authorization, evaluation,
        and security matter as much as the model.
      </p>

      <ul className="mt-12 divide-y divide-border border-y border-border">
        {writingArticles.map((article) => {
          const minutes = readingMinutes(article);
          return (
            <li key={article.slug}>
              <Link
                href={`/writing/${article.slug}`}
                className="group block py-6 transition-colors duration-200 hover:bg-surface/40"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono-ui text-[11px] tracking-wide text-fg-subtle">
                    <span className="text-accent-fg">{article.index}</span>
                    <span className="mx-1.5 text-fg-subtle/60">/</span>
                    <span>{minutes} min</span>
                  </p>
                  <span className="font-mono-ui text-xs text-fg-subtle transition-colors duration-200 group-hover:text-fg">
                    Read note →
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent-fg md:text-[1.35rem]">
                  {article.title}
                </h2>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-fg-muted">
                  {article.description}
                </p>
                <p className="mt-3 font-mono-ui text-[11px] text-fg-subtle">
                  {article.tags.join(" · ")}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
