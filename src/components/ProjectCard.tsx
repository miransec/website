import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-hover">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium tracking-tight text-fg">
            <Link
              href={project.links.caseStudy.href ?? `/projects/${project.slug}`}
              className="hover:text-accent-fg"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-fg-muted">{project.subtitle}</p>
        </div>
        <span className="shrink-0 rounded-md border border-border bg-canvas px-2 py-1 text-xs text-fg-subtle">
          {project.statusLabel}
        </span>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
        {project.shortDescription}
      </p>

      <ul className="mt-5 space-y-2">
        {project.highlights.slice(0, 4).map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm text-fg-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-accent before:content-['']"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border px-2 py-0.5 text-xs text-fg-subtle"
          >
            {tech}
          </span>
        ))}
      </div>

      <Link
        href={project.links.caseStudy.href ?? `/projects/${project.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-fg transition-colors group-hover:gap-2"
      >
        View case study
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
