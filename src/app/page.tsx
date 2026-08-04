import { Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.45]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-muted), transparent), linear-gradient(to bottom, transparent, var(--canvas))",
          }}
        />
        <div className="container-page relative py-16 md:py-24 lg:py-28">
          <p className="fade-in text-sm font-medium tracking-wide text-accent-fg">
            {siteConfig.positioning}
          </p>
          <h1 className="fade-in-up mt-4 text-4xl font-medium tracking-tight text-fg sm:text-5xl md:mt-5 md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="fade-in-up mt-4 max-w-2xl text-lg text-fg text-balance sm:text-xl md:mt-5 md:text-2xl">
            {siteConfig.tagline}
          </p>
          <p className="fade-in-up mt-4 max-w-xl text-base leading-relaxed text-fg-muted md:mt-5 md:text-lg">
            {siteConfig.summary}
          </p>
          <div className="fade-in-up mt-7 flex flex-wrap gap-3 md:mt-8">
            <Button href="/projects">View Projects</Button>
            <Button href={siteConfig.github.href} variant="secondary" external>
              GitHub
            </Button>
            <Button href="/contact" variant="ghost">
              Contact
            </Button>
          </div>
          <p className="fade-in-up mt-7 text-sm text-fg-subtle md:mt-8">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            {siteConfig.statusLine}
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-fg">
              Featured projects
            </h2>
            <p className="mt-2 max-w-xl text-sm text-fg-muted">
              Production-oriented systems with measurable engineering depth —
              not demo chatbots.
            </p>
          </div>
          <Button href="/projects" variant="ghost" className="hidden sm:inline-flex">
            All projects
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
