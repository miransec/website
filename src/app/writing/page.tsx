import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical notes on secure AI systems, retrieval, evaluation, and backend engineering.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="section-label">writing</p>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-4xl">
        Writing
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
        Technical notes on secure AI systems, retrieval, evaluation, and backend
        engineering will live here.
      </p>
    </div>
  );
}
