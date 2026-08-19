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
  const averqenHeroImage = averqenScreenshotSrc("dashboard.png");

  return (
    <div className="container-wide py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="eyebrow-line font-mono-ui text-[11px] tracking-[0.12em] uppercase text-accent-fg mb-4 flex items-center">
          portfolio
        </p>
        <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-4xl">
          Work
        </h1>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-fg-subtle">
          Three full-stack AI systems — detection, retrieval, and multilingual support — each with deterministic security boundaries and comprehensive test coverage.
        </p>
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 border-b border-border pb-3 mb-6">
        <span className="section-accent-bar" aria-hidden="true" />
        <span className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-fg-subtle">
          selected systems
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
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
    </div>
  );
}
