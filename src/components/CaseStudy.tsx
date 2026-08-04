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
