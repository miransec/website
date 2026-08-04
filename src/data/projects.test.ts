import { describe, expect, it } from "vitest";
import { existsSync } from "fs";
import path from "path";
import {
  getFeaturedProjects,
  getProjectBySlug,
  projects,
  skillCategories,
  vaanideskMetrics,
} from "@/data/projects";
import { navLinks, siteConfig } from "@/data/site";

describe("project data integrity", () => {
  it("includes VaaniDesk and AtlasCore as featured projects", () => {
    const featured = getFeaturedProjects();
    expect(featured.map((p) => p.slug).sort()).toEqual([
      "atlascore",
      "vaanidesk",
    ]);
  });

  it("has unique slugs and required case-study links", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.links.caseStudy.href).toBe(`/projects/${project.slug}`);
      expect(project.highlights.length).toBeGreaterThanOrEqual(2);
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.technologies.length).toBeLessThanOrEqual(12);
    }
  });

  it("resolves projects by slug", () => {
    expect(getProjectBySlug("vaanidesk")?.title).toBe("VaaniDesk");
    expect(getProjectBySlug("atlascore")?.status).toBe("in-development");
    expect(getProjectBySlug("missing")).toBeUndefined();
  });

  it("keeps verified VaaniDesk metrics coherent", () => {
    expect(vaanideskMetrics.backendTests.failed).toBe(0);
    expect(vaanideskMetrics.evaluations.securityFailures).toBe(0);
    expect(vaanideskMetrics.backendTests.passed).toBe(197);
    expect(vaanideskMetrics.evaluations.passed).toBe(113);
  });

  it("does not invent public GitHub or demo URLs", () => {
    for (const project of projects) {
      expect(project.links.github.href).toBeNull();
      if (project.links.demo) {
        expect(project.links.demo.href).toBeNull();
      }
    }
  });
});

describe("navigation and critical links", () => {
  it("exposes the required primary nav destinations", () => {
    expect(navLinks.map((l) => l.href)).toEqual([
      "/projects",
      "/about",
      "/writing",
      "/contact",
    ]);
  });

  it("points GitHub at the known profile", () => {
    expect(siteConfig.github.href).toBe("https://github.com/Mod-With-Miran");
  });

  it("keeps LinkedIn and email as explicit placeholders", () => {
    expect(siteConfig.linkedin.href).toBeNull();
    expect(siteConfig.email.href).toBeNull();
  });
});

describe("optional assets", () => {
  it("does not require profile or résumé files to exist", () => {
    const profile = path.join(process.cwd(), "public", "profile.jpg");
    const resume = path.join(process.cwd(), "public", "resume.pdf");
    // Presence is optional; siteConfig.resume.available must stay false until published.
    expect(siteConfig.resume.available).toBe(false);
    if (!existsSync(profile)) {
      expect(existsSync(profile)).toBe(false);
    }
    if (!existsSync(resume)) {
      expect(existsSync(resume)).toBe(false);
    }
  });
});

describe("skills presentation", () => {
  it("uses categories instead of percentage meters", () => {
    expect(skillCategories.length).toBeGreaterThanOrEqual(5);
    for (const category of skillCategories) {
      expect(category.skills.length).toBeGreaterThan(0);
    }
  });
});
