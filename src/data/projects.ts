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

export const projects: Project[] = [
  {
    slug: "vaanidesk",
    title: "VaaniDesk",
    subtitle: "Multilingual AI Customer Support Platform",
    shortDescription:
      "Production-oriented multilingual AI support with controlled agent workflows, hybrid retrieval, evaluations, and security controls.",
    description:
      "A production-oriented multilingual AI support system combining controlled agent workflows, real business tools, hybrid retrieval, source citations, multimodal pipelines, evaluation and security controls.",
    status: "engineering-complete",
    statusLabel: "v1.0.0 — Engineering complete",
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
      "113 evaluation cases · 40 security-critical · 0 failures",
      "Strict mypy clean across 100 source files",
      "Docker health, migrations, and secret scan verified",
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
      "Multi-tenant enterprise AI platform for secure knowledge access, controlled automation, isolation, and auditable workflows.",
    description:
      "A multi-tenant enterprise AI platform designed for secure knowledge access, controlled automation, organizational isolation and auditable AI workflows.",
    status: "in-development",
    statusLabel: "In development",
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
  return projects.filter((p) => p.featured);
}

export const vaanideskMetrics = {
  version: "v1.0.0",
  label: "VaaniDesk v1.0.0 — Engineering complete / portfolio release preparation",
  backendTests: { passed: 197, failed: 0, skipped: 0 },
  evaluations: { passed: 113, securityCritical: 40, securityFailures: 0 },
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
  "multimodal support",
  "MCP",
  "observability",
  "evaluations",
  "authorization",
  "idempotency",
  "prompt-injection defenses",
] as const;

export const vaanideskLimitations = [
  "Real external LLM, STT/TTS, SMTP and WhatsApp integrations are optional and credential-dependent; deterministic providers/simulators are used for local and CI verification.",
  "Do not assume credential-dependent integrations are live in every deployment environment.",
] as const;

export const atlascoreAreas = [
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
  "future RAG/workflow/MCP capabilities",
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
