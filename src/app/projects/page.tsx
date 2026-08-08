import type { Metadata } from "next";
import { SystemCard } from "@/components/SystemCard";
import { getFeaturedProjects, projects } from "@/data/projects";
import { atlascoreScreenshotSrc } from "@/lib/atlascore-screenshots";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work including AtlasCore and VaaniDesk.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const list = featured.length ? featured : projects;
  const atlasAskAi = atlascoreScreenshotSrc("ask-ai.png");

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
                atlasAskAi
                  ? {
                      src: atlasAskAi,
                      alt: "AtlasCore Ask AI interface with grounded answer and evidence",
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
    </div>
  );
}
