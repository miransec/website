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
      <h2 className="text-xl font-medium tracking-tight text-fg md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-fg-muted">
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
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-border bg-surface px-4 py-3"
        >
          <dt className="text-xs uppercase tracking-wide text-fg-subtle">
            {item.label}
          </dt>
          <dd className="mt-1 font-mono text-sm text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded border border-border bg-canvas px-2.5 py-1 text-xs text-fg-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
