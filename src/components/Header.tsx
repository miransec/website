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
    <header className="sticky top-0 z-50 border-b border-border/80 bg-canvas/85 backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between gap-4 md:h-16">
        <Link
          href="/"
          className="font-medium tracking-tight text-fg transition-colors hover:text-accent-fg"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-fg"
                    : "text-fg-muted hover:bg-surface-hover hover:text-fg",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={siteConfig.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg sm:inline-flex"
          >
            GitHub
          </a>
          {siteConfig.linkedin.href ? (
            <a
              href={siteConfig.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg sm:inline-flex"
            >
              LinkedIn
            </a>
          ) : null}
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-fg-muted hover:bg-surface-hover hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <svg
              width="20"
              height="20"
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

      {open ? (
        <div
          id={menuId}
          className="border-t border-border bg-canvas md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "rounded-md px-3 py-3 text-base transition-colors",
                    active
                      ? "bg-surface text-fg"
                      : "text-fg-muted hover:bg-surface-hover hover:text-fg",
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
              className="rounded-md px-3 py-3 text-base text-fg-muted hover:bg-surface-hover hover:text-fg"
            >
              GitHub
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
