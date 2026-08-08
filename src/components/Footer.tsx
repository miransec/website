"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

/** Live clock in Asia/Karachi timezone with a subtle pulse indicator */
export function Footer() {
  const [time, setTime] = useState("");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(now));
      setPulse((p) => !p);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-wide flex flex-col gap-2 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono-ui text-sm text-fg-muted">
          {siteConfig.brandPath}
        </p>
        <div className="flex items-center gap-3 font-mono-ui text-xs text-fg-subtle">
          <span className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-accent-fg transition-opacity ${
                pulse ? "opacity-100" : "opacity-30"
              }`}
              aria-hidden="true"
            />
            <span>building</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>KHI {time}</span>
          <span aria-hidden="true">·</span>
          <span>2026</span>
        </div>
      </div>
    </footer>
  );
}