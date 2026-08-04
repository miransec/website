import type { Metadata } from "next";
import { plannedWriting } from "@/data/projects";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical writing by Miran on AI systems engineering — articles coming soon.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <div className="container-page py-16 md:py-20">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-medium tracking-tight text-fg md:text-4xl">
          Writing
        </h1>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          Technical writing coming soon.
        </p>
      </header>

      <section className="mt-12 max-w-2xl">
        <h2 className="text-sm font-medium uppercase tracking-wide text-fg-subtle">
          Planned topics
        </h2>
        <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-surface">
          {plannedWriting.map((title) => (
            <li
              key={title}
              className="flex items-center justify-between gap-4 px-4 py-4"
            >
              <span className="text-sm text-fg-muted">{title}</span>
              <span className="shrink-0 text-xs text-fg-subtle">Planned</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
