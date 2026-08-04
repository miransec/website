import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium text-fg">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-fg-muted">AI Engineer</p>
        </div>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted"
          aria-label="Footer"
        >
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg"
          >
            GitHub
          </a>
          <a href={siteConfig.email.href} className="hover:text-fg">
            Email
          </a>
          {siteConfig.linkedin.href ? (
            <a
              href={siteConfig.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              LinkedIn
            </a>
          ) : null}
          <Link href="/contact" className="hover:text-fg">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
