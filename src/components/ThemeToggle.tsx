"use client";

import { useTheme } from "./ThemeProvider";

const THEMES = [
  { key: "dark" as const, label: "Dark", icon: "sun" },
  { key: "midnight" as const, label: "Midnight", icon: "moon-star" },
  { key: "light" as const, label: "Light", icon: "moon" },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const current = THEMES.find((t) => t.key === resolvedTheme) ?? THEMES[0];
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-8 w-8 items-center justify-center text-fg-subtle transition-colors duration-200 hover:text-fg"
      aria-label={`Switch to ${next.label} mode`}
      title={`Current: ${current.label}. Click for ${next.label}.`}
    >
      {current.key === "dark" && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
      {current.key === "midnight" && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          <circle cx="17" cy="17" r="2" fill="currentColor" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          <circle cx="15" cy="6" r="1" fill="currentColor" />
        </svg>
      )}
      {current.key === "light" && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
        </svg>
      )}
    </button>
  );
}
