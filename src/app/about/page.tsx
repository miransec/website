import type { Metadata } from "next";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ResumeCta } from "@/components/ResumeCta";
import { skillCategories } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Miran — AI engineer focused on systems where models work inside reliable engineering boundaries.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="section-label">about</p>
      <div className="mt-8 flex items-start gap-5">
        <ProfileAvatar size={64} className="shrink-0" />
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-1 font-mono-ui text-xs text-fg-subtle">
            AI / systems / security
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-xl space-y-4 text-[15px] leading-relaxed text-fg-muted">
        <p>
          I am an AI/software engineer focused on building systems where AI
          models work inside reliable engineering boundaries.
        </p>
        <p>{siteConfig.aboutBlurb}</p>
        <p>
          Interests include agentic systems, retrieval-augmented generation,
          backend engineering, AI security, evaluation, multi-tenant systems,
          and observability.
        </p>
      </div>

      <div className="mt-8">
        <ResumeCta />
      </div>

      <section className="mt-14">
        <h2 className="section-label">skills</h2>
        <dl className="mt-6 space-y-5">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <dt className="font-mono-ui text-xs text-fg-subtle">
                {category.title}
              </dt>
              <dd className="mt-1 text-sm text-fg-muted">
                {category.skills.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-12 font-mono-ui text-xs text-fg-subtle">
        <a
          href={siteConfig.email.href}
          className="text-accent-fg hover:underline"
        >
          {siteConfig.email.address}
        </a>
      </p>
    </div>
  );
}
