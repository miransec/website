import Link from "next/link";
import type { WritingArticle } from "@/data/writing";
import { readingMinutes } from "@/data/writing";

type ArticleLayoutProps = {
  article: WritingArticle;
};

export function ArticleLayout({ article }: ArticleLayoutProps) {
  const minutes = readingMinutes(article);

  return (
    <article className="container-page py-14 md:py-20">
      <nav className="font-mono-ui text-xs text-fg-subtle" aria-label="Breadcrumb">
        <Link href="/writing" className="hover:text-fg">
          writing
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="text-fg-muted">{article.slug}</span>
      </nav>

      <header className="mt-8 max-w-[46rem]">
        <p className="font-mono-ui text-xs tracking-wide text-fg-subtle">
          <span className="text-accent-fg">{article.index}</span>
          <span className="mx-1.5 text-fg-subtle/60">/</span>
          <span>{article.tags.join(" · ")}</span>
          <span className="mx-2 text-fg-subtle/50">·</span>
          <span>{minutes} min read</span>
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-[2.5rem] md:leading-[1.1]">
          {article.title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
          {article.description}
        </p>
      </header>

      <div className="mt-12 max-w-[46rem] space-y-10 md:mt-14 md:space-y-12">
        {article.sections.map((section) => (
          <section key={section.heading} className="scroll-mt-24">
            <h2 className="font-mono-ui text-xs tracking-wide text-fg-subtle">
              {section.heading.toLowerCase()}
            </h2>
            <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-fg-muted">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {article.relatedProject ? (
        <p className="mt-14 max-w-[46rem] border-t border-border pt-8 font-mono-ui text-xs text-fg-subtle">
          Related:{" "}
          <Link
            href={article.relatedProject.href}
            className="text-accent-fg transition-colors duration-200 hover:underline"
          >
            {article.relatedProject.label} →
          </Link>
        </p>
      ) : null}
    </article>
  );
}
