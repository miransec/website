import { describe, expect, it } from "vitest";
import { existsSync } from "fs";
import path from "path";
import {
  atlascoreMetrics,
  atlascoreNotShipped,
  getFeaturedProjects,
  getProjectBySlug,
  projects,
  skillCategories,
  vaanideskAreas,
  vaanideskMetrics,
} from "@/data/projects";
import { navLinks, siteConfig } from "@/data/site";
import {
  getWritingArticle,
  getWritingSlugs,
  readingMinutes,
  wordCount,
  writingArticles,
} from "@/data/writing";
import {
  atlascoreScreenshotFiles,
  atlascoreScreenshotSrc,
} from "@/lib/atlascore-screenshots";

describe("project data integrity", () => {
  it("features AtlasCore before VaaniDesk", () => {
    expect(getFeaturedProjects().map((p) => p.slug)).toEqual([
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
      expect(project.techLine.length).toBeGreaterThan(0);
      expect(project.techLine.length).toBeLessThanOrEqual(5);
      expect(project.statusShort.length).toBeGreaterThan(0);
      expect(project.proofLine.length).toBeGreaterThan(0);
    }
  });

  it("resolves projects by slug", () => {
    expect(getProjectBySlug("vaanidesk")?.title).toBe("VaaniDesk");
    expect(getProjectBySlug("atlascore")?.statusShort).toBe("UI v2");
    expect(getProjectBySlug("atlascore")?.status).toBe("engineering-complete");
    expect(getProjectBySlug("missing")).toBeUndefined();
  });

  it("keeps verified VaaniDesk metrics coherent", () => {
    expect(vaanideskMetrics.version).toBe("v1.0.1");
    expect(vaanideskMetrics.backendTests.failed).toBe(0);
    expect(vaanideskMetrics.evaluations.securityFailures).toBe(0);
    expect(vaanideskMetrics.backendTests.passed).toBe(206);
    expect(vaanideskMetrics.evaluations.passed).toBe(113);
    expect(vaanideskMetrics.evaluations.securityCritical).toBe(40);
    expect(vaanideskMetrics.e2e.playwrightPassed).toBe(14);
  });

  it("keeps verified AtlasCore UI v2 metrics coherent", () => {
    expect(atlascoreMetrics.backendTests.passed).toBe(717);
    expect(atlascoreMetrics.backendTests.failed).toBe(0);
    expect(atlascoreMetrics.evaluations.passed).toBe(46);
    expect(atlascoreMetrics.evaluations.total).toBe(46);
    expect(atlascoreMetrics.targetedDbSecurityTests.passed).toBe(216);
    expect(atlascoreMetrics.quality.mypySourceFiles).toBe(90);
    expect(atlascoreMetrics.latestCommit).toBe("9d62e33");
  });

  it("does not claim MCP or vision as VaaniDesk areas", () => {
    const areas = vaanideskAreas.map((a) => a.toLowerCase());
    expect(areas.some((a) => a.includes("mcp"))).toBe(false);
    expect(areas.some((a) => a.includes("vision"))).toBe(false);
    expect(areas.some((a) => a === "multimodal support")).toBe(false);
  });

  it("does not claim MCP or Gemini as AtlasCore shipped work", () => {
    const notShipped = atlascoreNotShipped.map((a) => a.toLowerCase());
    expect(notShipped.some((a) => a.includes("mcp"))).toBe(true);
    expect(notShipped.some((a) => a.includes("gemini"))).toBe(true);
    const atlascore = getProjectBySlug("atlascore");
    expect(atlascore?.highlights.join(" ").toLowerCase()).not.toMatch(/\bmcp\b/);
    expect(atlascore?.highlights.join(" ").toLowerCase()).not.toMatch(/gemini/);
  });

  it("links VaaniDesk and AtlasCore to public miransec repositories", () => {
    const vaanidesk = getProjectBySlug("vaanidesk");
    const atlascore = getProjectBySlug("atlascore");
    expect(vaanidesk?.links.github.href).toBe(
      "https://github.com/miransec/vaanidesk",
    );
    expect(atlascore?.links.github.href).toBe(
      "https://github.com/miransec/atlascore",
    );
    expect(vaanidesk?.links.demo?.href ?? null).toBeNull();
  });

  it("ships real VaaniDesk portfolio screenshots", () => {
    const dir = path.join(process.cwd(), "public", "projects", "vaanidesk");
    for (const name of [
      "home.png",
      "hinglish-order.png",
      "rag-citations.png",
      "confirmation.png",
      "observability.png",
      "evaluations.png",
    ]) {
      expect(existsSync(path.join(dir, name))).toBe(true);
    }
  });

  it("resolves AtlasCore screenshot paths only when files exist", () => {
    for (const file of atlascoreScreenshotFiles) {
      const src = atlascoreScreenshotSrc(file);
      const full = path.join(
        process.cwd(),
        "public",
        "projects",
        "atlascore",
        file,
      );
      if (existsSync(full)) {
        expect(src).toBe(`/projects/atlascore/${file}`);
      } else {
        expect(src).toBeNull();
      }
    }
  });
});

describe("writing notes", () => {
  it("publishes four engineering notes with metadata", () => {
    expect(writingArticles).toHaveLength(4);
    expect(getWritingSlugs()).toEqual([
      "grounded-ai-abstention",
      "ai-tenant-isolation",
      "ai-evaluation-release-gate",
      "controlled-ai-actions",
    ]);
    for (const article of writingArticles) {
      expect(article.title.length).toBeGreaterThan(10);
      expect(article.description.length).toBeGreaterThan(20);
      expect(article.tags.length).toBeGreaterThanOrEqual(2);
      expect(article.sections.length).toBeGreaterThanOrEqual(4);
      expect(readingMinutes(article)).toBeGreaterThanOrEqual(3);
      expect(wordCount(article)).toBeGreaterThanOrEqual(550);
      expect(getWritingArticle(article.slug)?.slug).toBe(article.slug);
    }
  });

  it("does not keep the old writing placeholder copy in article bodies", () => {
    const blob = writingArticles
      .map((a) => `${a.title} ${a.description}`)
      .join(" ")
      .toLowerCase();
    expect(blob).not.toContain("will live here");
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
    expect(navLinks.map((l) => l.label)).toEqual([
      "work",
      "about",
      "writing",
      "contact",
    ]);
  });

  it("points GitHub at the known profile", () => {
    expect(siteConfig.github.href).toBe("https://github.com/miransec");
  });

  it("uses the verified professional email", () => {
    expect(siteConfig.email.address).toBe("contact@muhammadmiran.com");
    expect(siteConfig.email.href).toBe("mailto:contact@muhammadmiran.com");
  });

  it("points LinkedIn at the public profile", () => {
    expect(siteConfig.linkedin.href).toBe(
      "https://www.linkedin.com/in/miransec/",
    );
    expect(siteConfig.linkedin.placeholder).toBe(false);
  });

  it("uses current positioning copy", () => {
    expect(siteConfig.tagline).toBe(
      "AI engineer building secure, intelligent systems.",
    );
    expect(siteConfig.summary).toContain("authorization");
    expect(siteConfig.availability).toContain("internships");
  });
});

describe("optional assets", () => {
  it("does not require profile or résumé files to exist", () => {
    const profile = path.join(process.cwd(), "public", "profile.jpg");
    const resume = path.join(process.cwd(), "public", "resume.pdf");
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
  it("uses compact categories instead of percentage meters", () => {
    expect(skillCategories.length).toBeGreaterThanOrEqual(4);
    for (const category of skillCategories) {
      expect(category.skills.length).toBeGreaterThan(0);
      expect(category.skills.length).toBeLessThanOrEqual(6);
    }
  });
});
