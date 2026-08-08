"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle animated background — particles drifting on a grid.
 * Respects prefers-reduced-motion. Pauses when tab hidden.
 * Designed to be layered behind content via fixed positioning.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const surface = canvas;
    const graphics = ctx;

    // Theme-aware colors (read from CSS custom properties)
    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      const fgSubtle = style.getPropertyValue("--color-fg-subtle").trim() || "#857a68";
      const accent = style.getPropertyValue("--color-accent").trim() || "#c4b59a";
      const border = style.getPropertyValue("--color-border").trim() || "#2a2620";
      return { fgSubtle, accent, border };
    };

    let colors = getColors();

    // Re-read colors on theme change
    const themeObserver = new MutationObserver(() => {
      colors = getColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Particle system
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: "fgSubtle" | "accent";
    };

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 35;
    const GRID_SIZE = 52; // matches CSS background grid

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      surface.width = surface.clientWidth * dpr;
      surface.height = surface.clientHeight * dpr;
      graphics.scale(dpr, dpr);
    }

    function initParticles() {
      particles.length = 0;
      const width = surface.clientWidth;
      const height = surface.clientHeight;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.3 + 0.05,
          color: Math.random() < 0.85 ? "fgSubtle" : "accent",
        });
      }
    }

    function drawGrid() {
      const width = surface.clientWidth;
      const height = surface.clientHeight;
      graphics.strokeStyle = colors.border;
      graphics.lineWidth = 0.5;
      graphics.globalAlpha = 0.15;

      // Vertical lines
      for (let x = 0; x <= width; x += GRID_SIZE) {
        graphics.beginPath();
        graphics.moveTo(x, 0);
        graphics.lineTo(x, height);
        graphics.stroke();
      }
      // Horizontal lines
      for (let y = 0; y <= height; y += GRID_SIZE) {
        graphics.beginPath();
        graphics.moveTo(0, y);
        graphics.lineTo(width, y);
        graphics.stroke();
      }
      graphics.globalAlpha = 1;
    }

    function updateParticles() {
      const width = surface.clientWidth;
      const height = surface.clientHeight;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Occasional random direction nudge
        if (Math.random() < 0.002) {
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = (Math.random() - 0.5) * 0.3;
        }
      }
    }

    function drawParticles() {
      for (const p of particles) {
        const color = colors[p.color];
        graphics.beginPath();
        graphics.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        graphics.fillStyle = color;
        graphics.globalAlpha = p.alpha;
        graphics.fill();
      }
      graphics.globalAlpha = 1;
    }

    let rafId: number;
    function loop() {
      if (!visible) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      graphics.clearRect(0, 0, surface.clientWidth, surface.clientHeight);
      drawGrid();
      updateParticles();
      drawParticles();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    initParticles();
    loop();

    const handleResize = () => {
      graphics.setTransform(1, 0, 0, 1, 0, 0);
      resize();
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();
    };
  }, [reducedMotion, visible]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    />
  );
}