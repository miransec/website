import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Miran at ${siteConfig.email.address}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow-line font-mono-ui text-[11px] tracking-[0.12em] uppercase text-accent-fg mb-6 flex items-center">
        contact
      </p>
      <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-4xl">
        Get in touch
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
        For internship and engineering conversations related to AI systems,
        backend work, and secure infrastructure.
      </p>

      <a
        href={siteConfig.email.href}
        className="mt-8 inline-block font-mono-ui text-base text-accent-fg transition-colors duration-200 hover:underline"
      >
        {siteConfig.email.address}
      </a>

      <div className="mt-12 flex items-center gap-3 border-b border-border pb-3 mb-6">
        <span className="section-accent-bar" aria-hidden="true" />
        <span className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-fg-subtle">
          elsewhere
        </span>
      </div>

      <ul className="space-y-4 font-mono-ui text-sm text-fg-muted">
        <li className="flex items-center gap-3">
          <span className="text-fg-subtle w-16">GitHub</span>
          <span className="text-fg-subtle/40">/</span>
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors duration-200"
          >
            miransec ↗
          </a>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-fg-subtle w-16">LinkedIn</span>
          <span className="text-fg-subtle/40">/</span>
          {siteConfig.linkedin.href ? (
            <a
              href={siteConfig.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg transition-colors duration-200"
            >
              miransec ↗
            </a>
          ) : (
            <span className="text-fg-subtle">coming soon</span>
          )}
        </li>
      </ul>

      <p className="mt-12 max-w-md text-xs leading-relaxed text-fg-subtle">
        Direct email is the preferred contact method. Response within 24–48 hours.
      </p>
    </div>
  );
}
