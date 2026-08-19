"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Blue Pulse ambient background — two large glow orbs (blue + purple)
 * layered behind a fixed canvas for particles.
 * Respects prefers-reduced-motion. Pauses when tab hidden.
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

    // Particle colors — blue accent family
    const ACCENT = "#63b3ed";
    const ACCENT_DIM = "#3b82f6";
    const SUBTLE = "#2a2a2a";

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    };

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 30;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.clientWidth * dpr;
      canvas!.height = canvas!.clientHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function initParticles() {
      particles.length = 0;
      const width = canvas!.clientWidth;
      const height = canvas!.clientHeight;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const r = Math.random();
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.2 + 0.4,
          alpha: Math.random() * 0.25 + 0.04,
          color: r < 0.6 ? ACCENT : r < 0.85 ? ACCENT_DIM : SUBTLE,
        });
      }
    }

    function updateParticles() {
      const width = canvas!.clientWidth;
      const height = canvas!.clientHeight;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (Math.random() < 0.002) {
          p.vx = (Math.random() - 0.5) * 0.25;
          p.vy = (Math.random() - 0.5) * 0.25;
        }
      }
    }

    function drawParticles() {
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    let rafId: number;
    function loop() {
      if (!visible) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      ctx!.clearRect(0, 0, canvas!.clientWidth, canvas!.clientHeight);
      updateParticles();
      drawParticles();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    initParticles();
    loop();

    const handleResize = () => {
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      resize();
      initParticles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion, visible]);

  if (reducedMotion) return null;

  return (
    <>
      {/* Glow orbs */}
      <div
        className="glow-orb glow-orb-blue"
        aria-hidden="true"
      />
      <div
        className="glow-orb glow-orb-purple"
        aria-hidden="true"
      />
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}
