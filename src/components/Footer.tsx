import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-page flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono-ui text-sm text-fg-muted">
          {siteConfig.brandPath}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-ui text-xs text-fg-subtle">
          <a
            href={siteConfig.email.href}
            className="transition-colors duration-200 hover:text-fg"
          >
            {siteConfig.email.address}
          </a>
          <span aria-hidden="true">·</span>
          <span>2026</span>
        </div>
      </div>
    </footer>
  );
}
