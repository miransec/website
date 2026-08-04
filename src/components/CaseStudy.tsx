import Image from "next/image";

type SectionProps = {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function CaseStudySection({
  id,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <h2 className="font-mono-ui text-xs tracking-wide text-fg-subtle">
        {title.toLowerCase()}
      </h2>
      <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-fg-muted">
        {children}
      </div>
    </section>
  );
}

export function MetricGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"
        >
          <dt className="font-mono-ui text-xs text-fg-subtle">{item.label}</dt>
          <dd className="font-mono-ui text-sm text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TagList({ items }: { items: readonly string[] }) {
  return (
    <p className="font-mono-ui text-xs leading-relaxed text-fg-subtle">
      {items.join(" · ")}
    </p>
  );
}

export function CaseStudyMeta({
  rows,
}: {
  rows: { label: string; value: string }[];
}) {
  return (
    <dl className="mt-6 space-y-2 border-y border-border py-4">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[5.5rem_1fr] gap-3 font-mono-ui text-xs sm:grid-cols-[7rem_1fr]"
        >
          <dt className="text-fg-subtle">{row.label}</dt>
          <dd className="text-fg-muted">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
};

export function CaseStudyFigure({
  src,
  alt,
  caption,
  priority = false,
}: FigureProps) {
  return (
    <figure className="mt-5">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-sm border border-border bg-canvas-elevated transition-colors duration-200 hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={1000}
          sizes="(max-width: 768px) 100vw, 42rem"
          quality={90}
          priority={priority}
          className="h-auto w-full"
        />
      </a>
      <figcaption className="mt-2 font-mono-ui text-[11px] leading-relaxed text-fg-subtle">
        {caption}
      </figcaption>
    </figure>
  );
}
