import Link from "next/link";
import { SystemCard } from "@/components/SystemCard";
import { HeroTagline } from "@/components/HeroTagline";
import { getFeaturedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="container-wide py-10 md:py-14">
      <section className="fade-in max-w-2xl">
        <h1 className="font-display text-[2.75rem] font-bold leading-[0.95] tracking-[-0.03em] text-fg md:text-6xl md:leading-[0.92]">
          {siteConfig.name}
        </h1>
        <p className="fade-in-up mt-5 max-w-lg text-[15px] leading-relaxed text-fg-muted md:text-base">
          <HeroTagline
            base="AI engineer building "
            lines={[
              "secure, intelligent systems.",
              "production-grade RAG pipelines.",
              "database-enforced AI isolation.",
              "grounded generation with citations.",
              "evaluation as a release gate.",
            ]}
          />
        </p>
        <p className="fade-in-up mt-3 max-w-lg text-[14px] leading-relaxed text-fg-subtle md:text-[15px]">
          {siteConfig.summary}
        </p>
        <div className="fade-in-up mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono-ui text-sm">
          <Link
            href="/projects"
            className="text-accent-fg transition-colors duration-200 hover:underline"
          >
            View work
          </Link>
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-subtle transition-colors duration-200 hover:text-fg"
          >
            GitHub
          </a>
          <Link
            href="/contact"
            className="text-fg-subtle transition-colors duration-200 hover:text-fg"
          >
            Contact
          </Link>
        </div>
        <p className="fade-in-up mt-5 font-mono-ui text-[11px] text-fg-subtle">
          {siteConfig.availability}
        </p>
      </section>

      <section className="mt-12 md:mt-14" aria-labelledby="systems-heading">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h2
            id="systems-heading"
            className="font-mono-ui text-[11px] tracking-[0.12em] text-fg-subtle"
          >
            SELECTED SYSTEMS
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-5">
          {featured.map((project, i) => {
            const index = String(i + 1).padStart(2, "0");
            if (project.slug === "vaanidesk") {
              return (
                <SystemCard
                  key={project.slug}
                  index={index}
                  project={project}
                  image={{
                    src: "/projects/vaanidesk/home.png",
                    alt: "VaaniDesk product homepage",
                  }}
                />
              );
            }
            return (
              <SystemCard
                key={project.slug}
                index={index}
                project={project}
                placeholderLabel="atlascore / workspace ui v2"
                panelItems={[
                  "FORCE RLS + restricted DB role",
                  "Hybrid FTS + pgvector retrieval",
                  "Evidence-first Ask AI",
                  "Workspace selector + admin surfaces",
                ]}
              />
            );
          })}
        </div>
      </section>

      <section
        className="mt-12 border-t border-border pt-8 md:mt-14"
        aria-labelledby="currently-heading"
      >
        <h2
          id="currently-heading"
          className="font-mono-ui text-[11px] tracking-[0.12em] text-fg-subtle"
        >
          currently
        </h2>
        <p className="mt-3 font-mono-ui text-sm text-fg-muted">
          {siteConfig.currently}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <a
            href={siteConfig.email.href}
            className="font-mono-ui text-sm text-accent-fg transition-colors duration-200 hover:underline"
          >
            {siteConfig.email.address}
          </a>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={siteConfig.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-ui text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
            >
              GitHub ↗
            </a>
            {siteConfig.linkedin.href ? (
              <a
                href={siteConfig.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-ui text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
              >
                LinkedIn ↗
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
