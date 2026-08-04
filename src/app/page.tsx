import Link from "next/link";
import { ProjectRow } from "@/components/ProjectRow";
import { getFeaturedProjects, vaanideskMetrics } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const vaanideskLine = `${vaanideskMetrics.backendTests.passed} tests · ${vaanideskMetrics.evaluations.passed} evaluations · ${vaanideskMetrics.e2e.playwrightPassed} browser E2E tests`;

  return (
    <div className="container-page py-14 md:py-20">
      <section className="fade-in max-w-xl">
        <p className="font-mono-ui text-sm text-fg-subtle">
          {siteConfig.brandPath}
        </p>
        <h1 className="sr-only">{siteConfig.name}</h1>
        <p className="fade-in-up mt-6 text-2xl font-medium tracking-tight text-fg text-balance md:text-[1.75rem] md:leading-snug">
          {siteConfig.tagline}
        </p>
        <p className="fade-in-up mt-4 text-[15px] leading-relaxed text-fg-muted">
          {siteConfig.summary}
        </p>
        <p className="fade-in-up mt-5 font-mono-ui text-xs text-fg-subtle">
          {siteConfig.statusLine}
        </p>
        <div className="fade-in-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors duration-200 hover:text-accent-fg"
          >
            View work
            <span className="font-mono-ui text-fg-subtle" aria-hidden="true">
              →
            </span>
          </Link>
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-ui text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="work-heading">
        <h2 id="work-heading" className="section-label">
          01 / selected work
        </h2>
        <div className="mt-4">
          {featured.map((project) => (
            <ProjectRow
              key={project.slug}
              project={project}
              quietMetrics={
                project.slug === "vaanidesk" ? vaanideskLine : undefined
              }
            />
          ))}
        </div>
      </section>

      <section className="mt-14 md:mt-16" aria-labelledby="currently-heading">
        <h2 id="currently-heading" className="section-label">
          02 / currently
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
          {siteConfig.currently}
        </p>
      </section>

      <section className="mt-14 md:mt-16" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-label">
          about
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
          {siteConfig.aboutBlurb}
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex font-mono-ui text-xs text-fg-subtle transition-colors duration-200 hover:text-fg"
        >
          more →
        </Link>
      </section>

      <section className="mt-14 md:mt-16" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="section-label">
          03 / contact
        </h2>
        <p className="mt-4 text-[15px] text-fg-muted">
          Have something interesting to build or discuss?
        </p>
        <a
          href={siteConfig.email.href}
          className="mt-3 inline-block font-mono-ui text-sm text-accent-fg transition-colors duration-200 hover:underline"
        >
          {siteConfig.email.address}
        </a>
        <div className="mt-4 flex flex-wrap gap-4 font-mono-ui text-xs text-fg-subtle">
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg"
          >
            GitHub
          </a>
          {siteConfig.linkedin.href ? (
            <a
              href={siteConfig.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              LinkedIn
            </a>
          ) : (
            <span>LinkedIn — soon</span>
          )}
        </div>
      </section>
    </div>
  );
}
