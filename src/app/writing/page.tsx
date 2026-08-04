import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical writing by Miran — notes coming soon.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="section-label">writing</p>
      <h1 className="mt-6 text-2xl font-medium tracking-tight text-fg md:text-3xl">
        Writing
      </h1>
      <p className="mt-4 text-[15px] text-fg-muted">
        Technical notes coming soon.
      </p>
    </div>
  );
}
