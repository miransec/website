import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type SystemCardProps = {
  index: string;
  project: Project;
  image?: { src: string; alt: string };
  /** Override proof lines; defaults to project.proofLine */
  metrics?: string[];
  /** Typography-only visual when no product screenshot exists */
  placeholderLabel?: string;
  panelItems?: string[];
};

export function SystemCard({
  index,
  project,
  image,
  metrics,
  placeholderLabel,
  panelItems,
}: SystemCardProps) {
  const href = project.links.caseStudy.href ?? `/projects/${project.slug}`;
  const proof = metrics ?? [project.proofLine];
  const panel = panelItems ?? project.focus;

  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2px] border border-border bg-surface transition-[border-color,background-color,box-shadow] duration-300 hover:border-border-strong hover:bg-surface-hover hover:shadow-[0_0_0_1px_var(--color-accent-muted),0_8px_32px_rgba(0,0,0,0.15)] md:hover:shadow-[0_0_0_1px_var(--color-accent-muted),0_12px_40px_rgba(0,0,0,0.2)]"
    >
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono-ui text-[11px] tracking-wide text-fg-subtle">
            <span className="text-accent-fg">{index}</span>
            <span className="mx-1.5 text-fg-subtle/60">/</span>
            <span className="uppercase tracking-[0.04em] text-fg">
              {project.title}
            </span>
          </p>
          <span className="font-mono-ui shrink-0 text-[11px] text-fg-subtle">
            {project.statusShort}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent-fg md:text-[1.35rem]">
          {project.subtitle}
        </h3>

        <p className="mt-4 font-mono-ui text-[11px] leading-relaxed text-fg-subtle">
          {project.focus.join(" · ")}
        </p>

        {proof.length > 0 ? (
          <ul className="mt-5 space-y-1 font-mono-ui text-[11px] text-fg-muted">
            {proof.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 min-h-[3.25rem]" aria-hidden="true" />
        )}

        <div className="mt-6 overflow-hidden rounded-sm border border-border bg-canvas">
          {image ? (
            <div className="relative aspect-[16/11] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 34rem"
                quality={90}
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div className="flex aspect-[16/11] flex-col justify-between p-4 md:p-5">
              <p className="font-mono-ui text-[10px] tracking-wide text-fg-subtle">
                {placeholderLabel ?? "engineering surface"}
              </p>
              <div className="space-y-2 font-mono-ui text-[11px] leading-relaxed text-fg-muted">
                {panel.map((term) => (
                  <p key={term}>
                    <span className="text-accent-fg">→</span> {term}
                  </p>
                ))}
              </div>
              <p className="font-mono-ui text-[10px] text-fg-subtle">
                product panel · {project.statusShort}
              </p>
            </div>
          )}
        </div>

        <p className="mt-5 flex items-center gap-1.5 font-mono-ui text-xs text-fg-subtle transition-colors duration-200 group-hover:text-fg">
          View engineering case study
          <span className="link-arrow" aria-hidden="true">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
