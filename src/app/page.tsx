import { SystemCard } from "@/components/SystemCard";
import { getFeaturedProjects, vaanideskMetrics } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const vaanidesk = featured.find((p) => p.slug === "vaanidesk");
  const atlascore = featured.find((p) => p.slug === "atlascore");

  return (
    <div className="container-wide py-10 md:py-14">
      <section className="fade-in max-w-xl">
        <h1 className="text-3xl font-medium tracking-tight text-fg md:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="fade-in-up mt-3 max-w-md text-base leading-snug text-fg-muted md:text-lg md:leading-snug">
          {siteConfig.tagline}
        </p>
      </section>

      <section className="mt-10 md:mt-12" aria-labelledby="systems-heading">
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
          <h2
            id="systems-heading"
            className="font-mono-ui text-xs tracking-[0.08em] text-fg-subtle"
          >
            SELECTED SYSTEMS
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-5">
          {vaanidesk ? (
            <SystemCard
              index="01"
              project={vaanidesk}
              metrics={[
                `${vaanideskMetrics.backendTests.passed} tests`,
                `${vaanideskMetrics.evaluations.passed} evaluations`,
                `${vaanideskMetrics.e2e.playwrightPassed} browser E2E`,
              ]}
              image={{
                src: "/projects/vaanidesk/home.png",
                alt: "VaaniDesk product homepage",
              }}
            />
          ) : null}
          {atlascore ? (
            <SystemCard
              index="02"
              project={atlascore}
              placeholderLabel="~/projects/atlascore"
            />
          ) : null}
        </div>
      </section>

      <section
        className="mt-12 border-t border-border pt-8 md:mt-14"
        aria-labelledby="currently-heading"
      >
        <h2
          id="currently-heading"
          className="font-mono-ui text-xs tracking-[0.08em] text-fg-subtle"
        >
          currently
        </h2>
        <p className="mt-3 font-mono-ui text-sm text-fg-muted">
          AI systems → AI security
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <a
            href={siteConfig.email.href}
            className="font-mono-ui text-sm text-accent-fg transition-colors duration-200 hover:underline"
          >
            {siteConfig.email.address}
          </a>
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-ui text-sm text-fg-subtle transition-colors duration-200 hover:text-fg"
          >
            GitHub ↗
          </a>
        </div>
      </section>
    </div>
  );
}
