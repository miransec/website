import type { Metadata } from "next";
import { ProjectRow } from "@/components/ProjectRow";
import { getFeaturedProjects, projects, vaanideskMetrics } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work including VaaniDesk and AtlasCore.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const list = featured.length ? featured : projects;
  const vaanideskLine = `${vaanideskMetrics.backendTests.passed} tests · ${vaanideskMetrics.evaluations.passed} evaluations · ${vaanideskMetrics.e2e.playwrightPassed} browser E2E tests`;

  return (
    <div className="container-page py-14 md:py-20">
      <p className="section-label">01 / work</p>
      <h1 className="mt-6 text-2xl font-medium tracking-tight text-fg md:text-3xl">
        Work
      </h1>
      <p className="mt-3 max-w-md text-[15px] text-fg-muted">
        Systems work across agentic AI, retrieval, backend engineering, and
        security.
      </p>
      <div className="mt-8">
        {list.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            quietMetrics={
              project.slug === "vaanidesk" ? vaanideskLine : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
