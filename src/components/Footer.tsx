import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-wide flex flex-col gap-2 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono-ui text-sm text-fg-muted">
          {siteConfig.brandPath}
        </p>
        <p className="font-mono-ui text-xs text-fg-subtle">2026</p>
      </div>
    </footer>
  );
}
