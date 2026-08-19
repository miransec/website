import Link from "next/link";
import { SystemCard } from "@/components/SystemCard";
import { HeroTagline } from "@/components/HeroTagline";
import { getFeaturedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { atlascoreScreenshotSrc } from "@/lib/atlascore-screenshots";
import { averqenScreenshotSrc } from "@/lib/averqen-screenshots";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const atlasDashboard = atlascoreScreenshotSrc("dashboard.png");
  const averqenHeroImage = averqenScreenshotSrc("dashboard.png");

  return (
    <div className="container-wide py-12 md:py-16">
      {/* ── HERO ── */}
      <section className="fade-in max-w-2xl">
        {/* Eyebrow */}
        <p className="eyebrow-line font-mono-ui text-[11px] tracking-[0.12em] uppercase text-accent-fg mb-5 flex items-center">
          AI engineer · secure systems
        </p>

        {/* Name — gradient */}
        <h1
          className="font-display font-bold leading-[0.92] tracking-[-0.03em]"
          style={{
            fontSize: "clamp(52px, 8vw, 88px)",
            background: "linear-gradient(135deg, #ffffff 0%, #e8e8e8 40%, #a8c8e8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {siteConfig.name}
        </h1>

        {/* Tagline */}
        <p className="fade-in-up mt-6 max-w-lg text-[15px] leading-relaxed text-fg-muted md:text-base">
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

        {/* Summary */}
        <p className="fade-in-up mt-3 max-w-lg text-[13px] leading-relaxed text-fg-subtle md:text-[14px]">
          {siteConfig.summary}
        </p>

        {/* CTAs */}
        <div className="fade-in-up mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="font-mono-ui text-[12px] rounded-md px-4 py-2 text-canvas bg-accent-fg transition-all duration-200 hover:shadow-[0_0_20px_var(--accent-glow)] hover:-translate-y-px"
          >
            View work →
          </Link>
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-ui text-[12px] rounded-md px-4 py-2 border border-border-strong text-fg-subtle transition-colors duration-200 hover:text-fg hover:border-fg-subtle"
          >
            GitHub
          </a>
          <Link
            href="/contact"
            className="font-mono-ui text-[12px] rounded-md px-4 py-2 border border-border-strong text-fg-subtle transition-colors duration-200 hover:text-fg hover:border-fg-subtle"
          >
            Contact
          </Link>
        </div>

        {/* Availability */}
        <p className="fade-in-up mt-5 font-mono-ui text-[11px] text-fg-subtle flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "var(--green)",
              boxShadow: "0 0 8px var(--green)",
              animation: "accent-pulse 2s ease-in-out infinite",
            }}
            aria-hidden="true"
          />
          {siteConfig.availability}
        </p>
      </section>

      {/* ── SELECTED SYSTEMS ── */}
      <section className="mt-14 md:mt-16" aria-labelledby="systems-heading">
        <div className="flex items-center gap-3 border-b border-border pb-3 mb-6">
          <span className="section-accent-bar" aria-hidden="true" />
          <h2
            id="systems-heading"
            className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-fg-subtle"
          >
            selected systems
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {featured.map((project, i) => {
            const index = String(i + 1).padStart(2, "0");

            if (project.slug === "averqen") {
              return (
                <SystemCard
                  key={project.slug}
                  index={index}
                  project={project}
                  image={
                    averqenHeroImage
                      ? {
                          src: averqenHeroImage,
                          alt: "Averqen security dashboard",
                        }
                      : undefined
                  }
                  placeholderLabel="averqen / security investigation platform"
                  panelItems={[
                    "Deterministic detection + correlation",
                    "Grounded AI investigation with citations",
                    "Threat intelligence + MITRE ATT&CK",
                    "Policy-controlled simulated response",
                  ]}
                  className="md:col-span-2"
                />
              );
            }

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
                image={
                  atlasDashboard
                    ? {
                        src: atlasDashboard,
                        alt: "AtlasCore workspace dashboard with sidebar navigation",
                      }
                    : undefined
                }
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

      {/* ── CURRENTLY ── */}
      <section
        className="mt-12 border-t border-border pt-8 md:mt-14"
        aria-labelledby="currently-heading"
      >
        <h2
          id="currently-heading"
          className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-fg-subtle"
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
