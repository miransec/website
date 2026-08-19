import type { Metadata } from "next";
import { SystemCard } from "@/components/SystemCard";
import { getFeaturedProjects, projects } from "@/data/projects";
import { atlascoreScreenshotSrc } from "@/lib/atlascore-screenshots";
import { averqenScreenshotSrc } from "@/lib/averqen-screenshots";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work across AI systems, security infrastructure, and secure backend engineering.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const list = featured.length ? featured : projects;
  const atlasDashboard = atlascoreScreenshotSrc("dashboard.png");
  const averqenDetail = averqenScreenshotSrc("incident-detail.png");
  const averqenDashboard = averqenScreenshotSrc("dashboard.png");
  const averqenHeroImage = averqenDetail ?? averqenDashboard;

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
                        alt: "Averqen incident investigation interface",
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
    </div>
  );
}
