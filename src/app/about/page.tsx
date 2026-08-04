import type { Metadata } from "next";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ResumeCta } from "@/components/ResumeCta";
import { skillCategories } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Miran — AI/software engineer focused on agentic systems, RAG, backend engineering, AI security, evaluation, and multi-tenant architecture.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-page py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <ProfileAvatar size={112} />
          <ResumeCta />
          <a
            href={siteConfig.email.href}
            className="text-sm text-accent-fg hover:underline"
          >
            {siteConfig.email.address}
          </a>
        </div>

        <div className="max-w-2xl">
          <h1 className="text-3xl font-medium tracking-tight text-fg md:text-4xl">
            About
          </h1>
          <p className="mt-6 text-base leading-relaxed text-fg-muted md:text-lg">
            I am an AI/software engineer focused on building systems where AI
            models work inside reliable engineering boundaries.
          </p>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            My work sits at the intersection of model intelligence and the
            production concerns that make AI usable in real environments:
            retrieval quality, authorization, evaluation, observability, and
            service architecture. I care about systems that remain inspectable
            and controllable after the demo ends.
          </p>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Areas of focus include agentic systems, retrieval-augmented
            generation, backend engineering, AI security, evaluation,
            multi-tenant systems, distributed/service architecture, and
            observability.
          </p>
          <p className="mt-4 text-sm text-fg-subtle">
            {siteConfig.positioning}
          </p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-medium tracking-tight text-fg">Skills</h2>
        <p className="mt-2 max-w-2xl text-sm text-fg-muted">
          Grouped by practice area. These reflect tools and techniques already
          exercised in the projects presented on this site.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <h3 className="text-sm font-medium text-fg">{category.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded border border-border bg-canvas px-2 py-1 text-xs text-fg-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
