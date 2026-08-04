import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured engineering projects including VaaniDesk and AtlasCore — production-oriented AI systems with security, retrieval, and evaluation depth.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="container-page py-16 md:py-20">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-medium tracking-tight text-fg md:text-4xl">
          Projects
        </h1>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          Systems work across agentic AI, retrieval, backend engineering, and
          security — with verifiable testing and clear development status.
        </p>
      </header>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
