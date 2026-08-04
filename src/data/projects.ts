export type ProjectStatus =
  | "engineering-complete"
  | "in-development"
  | "coming-soon";

export type ProjectLink = {
  label: string;
  href: string | null;
  external?: boolean;
  comingSoon?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  featured: boolean;
  technologies: string[];
  highlights: string[];
  links: {
    caseStudy: ProjectLink;
    github: ProjectLink;
    demo?: ProjectLink;
  };
  screenshotDir: string;
};

const FEATURED_ORDER = ["vaanidesk", "atlascore"] as const;

export const projects: Project[] = [
  {
    slug: "vaanidesk",
    title: "VaaniDesk",
    subtitle: "Multilingual AI Customer Support Platform",
    shortDescription:
      "Production-oriented multilingual AI support with controlled agent workflows, hybrid retrieval, evaluations, and security controls.",
    description:
      "A production-oriented multilingual AI support system combining controlled agent workflows, real business tools, hybrid retrieval, source citations, evaluation, and security controls.",
    status: "engineering-complete",
    statusLabel: "v1.0.0 — Engineering complete / portfolio release preparation",
    featured: true,
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Next.js",
      "TypeScript",
      "Docker",
      "pytest",
      "Playwright",
    ],
    highlights: [
      "197 backend tests passed · 0 failed",
      "113 deterministic evaluations · 40 security-critical",
      "9 Playwright E2E tests passed",
      "Hybrid RAG with source citations and confirmations",
    ],
    links: {
      caseStudy: {
        label: "View Case Study",
        href: "/projects/vaanidesk",
      },
      github: {
        label: "GitHub",
        href: null,
        comingSoon: true,
      },
      demo: {
        label: "Demo",
        href: null,
        comingSoon: true,
      },
    },
    screenshotDir: "/projects/vaanidesk",
  },
  {
    slug: "atlascore",
    title: "AtlasCore",
    subtitle: "Secure Enterprise AI Operations Platform",
    shortDescription:
      "Multi-tenant enterprise AI platform focused on secure tenancy, authentication, RBAC, and auditable operations — in active development.",
    description:
      "A multi-tenant enterprise AI platform designed for secure knowledge access, controlled automation, organizational isolation and auditable AI workflows. Phase 1 engineering prioritizes tenancy and security foundations.",
    status: "in-development",
    statusLabel: "In active development",
    featured: true,
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "RLS",
      "Redis",
      "Docker",
    ],
    highlights: [
      "PostgreSQL Row-Level Security with FORCE RLS",
      "Organisation / workspace isolation",
      "Refresh-token families with replay detection",
      "RBAC, CSRF protection, and audit events",
    ],
    links: {
      caseStudy: {
        label: "View Case Study",
        href: "/projects/atlascore",
      },
      github: {
        label: "Repository",
        href: null,
        comingSoon: true,
      },
    },
    screenshotDir: "/projects/atlascore",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return FEATURED_ORDER.map((slug) => getProjectBySlug(slug)).filter(
    (p): p is Project => Boolean(p?.featured),
  );
}

export const vaanideskMetrics = {
  version: "v1.0.0",
  label:
    "VaaniDesk v1.0.0 — Engineering complete / portfolio release preparation",
  backendTests: { passed: 197, failed: 0, skipped: 0 },
  evaluations: {
    passed: 113,
    deterministic: true,
    securityCritical: 40,
    securityFailures: 0,
  },
  e2e: { playwrightPassed: 9 },
  quality: {
    mypyCleanSourceFiles: 100,
    dockerHealthVerified: true,
    migrationCycleVerified: true,
    seedIdempotencyVerified: true,
    secretScanPassed: true,
  },
} as const;

export const vaanideskAreas = [
  "multilingual AI",
  "English",
  "Hindi",
  "Hinglish",
  "Marathi",
  "controlled tool calling",
  "sensitive action confirmation",
  "hybrid RAG",
  "pgvector",
  "source citations",
  "authorization",
  "evaluations",
  "observability",
  "idempotency",
  "prompt-injection defenses",
] as const;

export const vaanideskLimitations = [
  "Real external LLM, STT/TTS, SMTP and WhatsApp integrations are optional and credential-dependent; deterministic providers/simulators are used for local and CI verification.",
  "Credential-dependent integrations are not presented as live in every deployment environment.",
  "An MCP server and a dedicated vision / image-analysis pipeline are not part of the shipped v1.0.0 surface.",
] as const;

export const atlascoreCurrentAreas = [
  "PostgreSQL Row-Level Security",
  "FORCE RLS",
  "multi-tenancy",
  "organisation/workspace isolation",
  "RBAC",
  "secure authentication",
  "refresh-token families",
  "replay detection",
  "CSRF protection",
  "audit events",
  "human-controlled architecture",
] as const;

/** Explicitly labelled future work — not completed functionality. */
export const atlascoreRoadmap = [
  "RAG",
  "agent workflows",
  "MCP",
  "enterprise analytics",
] as const;

export const skillCategories = [
  {
    title: "AI / ML",
    skills: [
      "Python",
      "LLM APIs",
      "RAG",
      "Embeddings",
      "AI Agents",
      "Structured Outputs",
      "Evaluation",
      "Multilingual AI",
    ],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "REST APIs"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "GitHub Actions", "OpenTelemetry", "Linux", "Nginx"],
  },
  {
    title: "Security",
    skills: [
      "RBAC",
      "PostgreSQL RLS",
      "Authorization",
      "Secret Management",
      "Prompt Injection Defenses",
      "Idempotency",
      "Audit Logging",
    ],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Testing",
    skills: ["pytest", "Playwright", "Ruff", "mypy"],
  },
] as const;

export const plannedWriting = [
  "Building tenant isolation with PostgreSQL RLS",
  "Designing safe tool execution for AI agents",
  "Hybrid retrieval in production RAG",
  "Human approval for destructive AI actions",
  "Evaluating multilingual AI systems",
] as const;
