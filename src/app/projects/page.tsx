import type { Metadata } from "next";
import { SystemCard } from "@/components/SystemCard";
import {
  getFeaturedProjects,
  projects,
  vaanideskMetrics,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work including VaaniDesk and AtlasCore.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const list = featured.length ? featured : projects;

  return (
    <div className="container-wide py-12 md:py-16">
      <p className="font-mono-ui text-xs tracking-[0.08em] text-fg-subtle">
        SELECTED SYSTEMS
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-4xl">
        Work
      </h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
        {list.map((project, i) => {
          const index = String(i + 1).padStart(2, "0");
          if (project.slug === "vaanidesk") {
            return (
              <SystemCard
                key={project.slug}
                index={index}
                project={project}
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
            );
          }
          return (
            <SystemCard
              key={project.slug}
              index={index}
              project={project}
              placeholderLabel="~/projects/atlascore"
            />
          );
        })}
      </div>
    </div>
  );
}
