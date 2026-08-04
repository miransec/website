import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Miran — GitHub, LinkedIn, and professional email for AI engineering opportunities.",
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
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <ContactChannel
            label="GitHub"
            value="Mod-With-Miran"
            href={siteConfig.github.href}
          />
          <ContactChannel
            label="LinkedIn"
            value="URL coming soon"
            href={siteConfig.linkedin.href}
          />
          <ContactChannel
            label="Email"
            value="Professional address coming soon"
            href={siteConfig.email.href}
          />
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
}: {
  label: string;
  value: string;
  href: string | null;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface px-5 py-4">
      <p className="text-xs uppercase tracking-wide text-fg-subtle">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-sm text-accent-fg hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm text-fg-muted">{value}</p>
      )}
    </div>
  );
}
