"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navLinks, siteConfig } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/88 backdrop-blur-md">
      <div className="container-wide flex h-12 items-center justify-between gap-4">
        {/* Brand with blinking cursor */}
        <Link
          href="/"
          className="brand-cursor font-mono-ui text-sm text-fg transition-colors duration-200 hover:text-accent-fg"
          aria-label="Home"
        >
          ~/miran
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative font-mono-ui text-[12px] tracking-[0.04em] transition-colors duration-200 pb-[2px]",
                    active ? "text-fg" : "text-fg-subtle hover:text-fg",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && <span className="nav-active-line" />}
                </Link>
              );
            })}
          </nav>

          {/* Social links — separated by border */}
          <div className="hidden items-center gap-1 border-l border-border pl-4 ml-2 sm:flex">
            <a
              href={siteConfig.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-ui px-2 py-1 text-[11px] text-fg-subtle rounded transition-colors duration-200 hover:text-fg hover:bg-surface"
              aria-label="GitHub"
            >
              github
            </a>
            {siteConfig.linkedin.href ? (
              <a
                href={siteConfig.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-ui px-2 py-1 text-[11px] text-fg-subtle rounded transition-colors duration-200 hover:text-fg hover:bg-surface"
                aria-label="LinkedIn"
              >
                linkedin
              </a>
            ) : null}
          </div>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded p-2 text-fg-muted hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div
          id={menuId}
          className="border-t border-border bg-canvas md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav
            className="container-wide flex flex-col gap-1 py-3"
            aria-label="Mobile"
          >
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "font-mono-ui rounded px-2 py-2.5 text-sm tracking-[0.04em] transition-colors",
                    active ? "text-fg" : "text-fg-muted hover:text-fg",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={siteConfig.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-ui rounded px-2 py-2.5 text-sm text-fg-muted hover:text-fg"
            >
              github
            </a>
            {siteConfig.linkedin.href ? (
              <a
                href={siteConfig.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-ui rounded px-2 py-2.5 text-sm text-fg-muted hover:text-fg"
              >
                linkedin
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
