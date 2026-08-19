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
  /** Optional class for grid placement (e.g. md:col-span-2 for flagship) */
  className?: string;
};

export function SystemCard({
  index,
  project,
  image,
  metrics,
  placeholderLabel,
  panelItems,
  className = "",
}: SystemCardProps) {
  const href = project.links.caseStudy.href ?? `/projects/${project.slug}`;
  const proof = metrics ?? [project.proofLine];
  const panel = panelItems ?? project.focus;

  return (
    <Link
      href={href}
      className={`card-top-edge group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-border bg-surface transition-all duration-300 hover:border-[var(--border-glow)] hover:bg-surface-hover hover:shadow-[0_0_0_1px_rgba(99,179,237,0.08),0_8px_32px_rgba(0,0,0,0.4),0_0_60px_rgba(99,179,237,0.04)] hover:-translate-y-0.5 md:hover:shadow-[0_0_0_1px_rgba(99,179,237,0.08),0_12px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(99,179,237,0.06)] ${className}`}
    >
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Meta row */}
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono-ui text-[11px] tracking-wide">
            <span className="text-accent-fg">{index}</span>
            <span className="mx-1.5 text-fg-subtle/60">/</span>
            <span className="uppercase tracking-[0.06em] text-fg">
              {project.title}
            </span>
          </p>
          <span className="font-mono-ui shrink-0 text-[11px] text-fg-subtle">
            {project.statusShort}
          </span>
        </div>

        {/* Heading */}
        <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent-fg md:text-[1.35rem]">
          {project.subtitle}
        </h3>

        {/* Focus tags */}
        <p className="mt-3 font-mono-ui text-[10px] leading-relaxed text-fg-subtle tracking-[0.03em]">
          {project.focus.join(" · ")}
        </p>

        {/* Proof lines */}
        {proof.length > 0 ? (
          <ul className="mt-4 space-y-1 font-mono-ui text-[10px] text-fg-muted">
            {proof.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 min-h-[3rem]" aria-hidden="true" />
        )}

        {/* Image / placeholder panel */}
        <div className="mt-5 overflow-hidden rounded-sm border border-border bg-canvas-elevated">
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
              <p className="font-mono-ui text-[9px] tracking-[0.06em] text-fg-subtle">
                {placeholderLabel ?? "engineering surface"}
              </p>
              <div className="space-y-2 font-mono-ui text-[10px] leading-relaxed text-fg-muted">
                {panel.map((term) => (
                  <p key={term}>
                    <span className="text-accent-fg">→</span> {term}
                  </p>
                ))}
              </div>
              <p className="font-mono-ui text-[9px] text-fg-subtle">
                product panel · {project.statusShort}
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <p className="mt-4 flex items-center gap-1.5 font-mono-ui text-xs text-fg-subtle transition-colors duration-200 group-hover:text-accent-fg">
          View engineering case study
          <span className="link-arrow" aria-hidden="true">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
