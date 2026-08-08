"use client";

import { useEffect, useRef, useState } from "react";

type HeroTaglineProps = {
  /** Base text that stays static */
  base?: string;
  /** Rotating taglines */
  lines: string[];
  /** Typing speed (ms per char) */
  typeSpeed?: number;
  /** Deleting speed (ms per char) */
  deleteSpeed?: number;
  /** Pause between lines (ms) */
  pauseMs?: number;
  /** ClassName for the rotating span */
  className?: string;
};

/**
 * Typewriter effect that cycles through taglines.
 * Accessible: announces changes via aria-live region.
 * Respects prefers-reduced-motion (shows first line static).
 */
export function HeroTagline({
  base = "",
  lines,
  typeSpeed = 45,
  deleteSpeed = 25,
  pauseMs = 1800,
  className = "",
}: HeroTaglineProps) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(lines[0]);
      return;
    }

    const currentLine = lines[index];
    const target = deleting ? "" : currentLine;

    if (displayed === target) {
      if (!deleting) {
        // Finished typing — pause then delete
        timeoutRef.current = window.setTimeout(() => {
          setDeleting(true);
        }, pauseMs);
      } else {
        // Finished deleting — move to next line
        setDeleting(false);
        setIndex((i) => (i + 1) % lines.length);
      }
      return;
    }

    // Type or delete next character
    const nextChar = deleting
      ? currentLine.slice(0, displayed.length - 1)
      : currentLine.slice(0, displayed.length + 1);
    setDisplayed(nextChar);

    const speed = deleting ? deleteSpeed : typeSpeed;
    timeoutRef.current = window.setTimeout(() => {
      // trigger re-render via state
    }, speed);
  }, [displayed, deleting, index, lines, typeSpeed, deleteSpeed, pauseMs, reducedMotion]);

  // Force re-render loop by using a dummy state update
  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setDisplayed((d) => d); // no-op to trigger effect
    }, 50);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {base}{displayed}
    </span>
  );
}