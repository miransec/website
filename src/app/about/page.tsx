import type { Metadata } from "next";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ResumeCta } from "@/components/ResumeCta";
import { skillCategories } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Miran — AI engineer focused on systems where models work inside reliable backend and security boundaries.",
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
            AI engineering · secure systems
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-xl space-y-4 text-[15px] leading-relaxed text-fg-muted">
        <p>
          I&apos;m an AI engineer focused on building systems that combine model
          capability with strong backend and security boundaries.
        </p>
        <p>{siteConfig.aboutBlurb}</p>
        <p>
          I&apos;m especially interested in the intersection of AI engineering
          and cybersecurity. My recent work on Averqen focuses on AI-assisted
          security investigation: deterministic detection and authorization
          boundaries around grounded model analysis, so AI can help explain
          evidence without becoming the security boundary itself.
        </p>
        <p>
          I&apos;m currently looking for internship opportunities where I can
          contribute to real AI systems and keep developing as an engineer.
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

      <p className="mt-12 space-y-2 font-mono-ui text-xs text-fg-subtle">
        <a
          href={siteConfig.email.href}
          className="block text-accent-fg hover:underline"
        >
          {siteConfig.email.address}
        </a>
        <a
          href={siteConfig.github.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-fg"
        >
          GitHub →
        </a>
        {siteConfig.linkedin.href ? (
          <a
            href={siteConfig.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-fg"
          >
            LinkedIn →
          </a>
        ) : null}
      </p>
    </div>
  );
}
