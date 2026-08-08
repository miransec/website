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
      <p className="section-label">03 / contact</p>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-4xl">
        Contact
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
        For internship and engineering conversations related to AI systems,
        backend work, and secure AI systems.
      </p>

      <a
        href={siteConfig.email.href}
        className="mt-8 inline-block font-mono-ui text-base text-accent-fg transition-colors duration-200 hover:underline"
      >
        {siteConfig.email.address}
      </a>

      <ul className="mt-10 space-y-3 font-mono-ui text-sm text-fg-muted">
        <li>
          <span className="text-fg-subtle">GitHub</span>
          <span className="mx-2 text-fg-subtle" aria-hidden="true">
            /
          </span>
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg"
          >
            miransec
          </a>
        </li>
        <li>
          <span className="text-fg-subtle">LinkedIn</span>
          <span className="mx-2 text-fg-subtle" aria-hidden="true">
            /
          </span>
          {siteConfig.linkedin.href ? (
            <a
              href={siteConfig.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              LinkedIn
            </a>
          ) : (
            <span className="text-fg-subtle">coming soon</span>
          )}
        </li>
      </ul>

      <p className="mt-12 max-w-md text-xs leading-relaxed text-fg-subtle">
        Direct email is the preferred contact method. A web form will be wired
        later when SMTP delivery is configured.
      </p>
    </div>
  );
}
