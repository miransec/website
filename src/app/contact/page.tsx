import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Miran at ${siteConfig.email.address} for AI engineering opportunities.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page py-16 md:py-20">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-medium tracking-tight text-fg md:text-4xl">
          Contact
        </h1>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">
          For internship and engineering conversations related to AI systems,
          backend work, and security-minded product development.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={siteConfig.email.href}>Email me</Button>
          <Button href={siteConfig.github.href} variant="secondary" external>
            GitHub
          </Button>
        </div>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <ContactChannel
            label="Email"
            value={siteConfig.email.address}
            href={siteConfig.email.href}
            external={false}
          />
          <ContactChannel
            label="GitHub"
            value="Mod-With-Miran"
            href={siteConfig.github.href}
            external
          />
          {siteConfig.linkedin.href ? (
            <ContactChannel
              label="LinkedIn"
              value="LinkedIn"
              href={siteConfig.linkedin.href}
              external
            />
          ) : (
            <div className="rounded-lg border border-border bg-surface px-5 py-4">
              <p className="text-xs uppercase tracking-wide text-fg-subtle">
                LinkedIn
              </p>
              <p className="mt-1 text-sm text-fg-subtle">Coming soon</p>
            </div>
          )}
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

function ContactChannel({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface px-5 py-4">
      <p className="text-xs uppercase tracking-wide text-fg-subtle">{label}</p>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="mt-1 inline-block text-sm text-accent-fg hover:underline"
      >
        {value}
      </a>
    </div>
  );
}
