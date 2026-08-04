import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectRowProps = {
  project: Project;
  quietMetrics?: string;
};

export function ProjectRow({ project, quietMetrics }: ProjectRowProps) {
  const href = project.links.caseStudy.href ?? `/projects/${project.slug}`;

  return (
    <Link
      href={href}
      className="group block border-b border-border py-6 transition-colors duration-200 first:border-t hover:border-border-strong"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight text-fg transition-colors duration-200 group-hover:text-accent-fg">
          {project.title}
        </h3>
        <span className="font-mono-ui shrink-0 text-xs text-fg-subtle">
          {project.statusShort}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-fg-muted">{project.subtitle}</p>
      <p className="mt-3 font-mono-ui text-xs text-fg-subtle">
        {project.focus.join(" · ")}
      </p>
      {quietMetrics ? (
        <p className="mt-2 font-mono-ui text-[11px] text-fg-subtle/90">
          {quietMetrics}
        </p>
      ) : null}
      <p className="mt-4 flex justify-end font-mono-ui text-xs text-fg-subtle">
        <span className="link-arrow" aria-hidden="true">
          →
        </span>
        <span className="sr-only">Open case study</span>
      </p>
    </Link>
  );
}
