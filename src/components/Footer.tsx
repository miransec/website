"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

/** Live clock in Asia/Karachi timezone with pulsing green dot and blue accent top line */
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
    <footer className="footer-accent-line relative mt-auto border-t border-border">
      <div className="container-wide flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono-ui text-sm text-fg-muted">
          ~/{siteConfig.name.toLowerCase()}
        </p>
        <div className="flex items-center gap-4 font-mono-ui text-xs text-fg-subtle">
          <span className="flex items-center gap-1.5">
            <span
              className={`pulse-dot h-1.5 w-1.5 rounded-full transition-opacity`}
              style={{
                background: "var(--green)",
                boxShadow: `0 0 ${pulse ? "10px" : "4px"} var(--green)`,
                opacity: pulse ? 1 : 0.5,
              }}
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
