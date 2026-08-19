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
  /** Compact monospace status for list views */
  statusShort: string;
  /** 3–5 focus terms for homepage rows */
  focus: string[];
  /** Compact tech line for list views */
  techLine: string[];
  /** Understated proof line for cards */
  proofLine: string;
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

const FEATURED_ORDER = ["averqen", "atlascore", "vaanidesk"] as const;

export const projects: Project[] = [
  {
    slug: "averqen",
    title: "Averqen",
    subtitle:
      "AI-assisted security investigation with deterministic security boundaries.",
    shortDescription:
      "Deterministic detection, incident correlation, grounded AI analysis, threat intelligence, and policy-controlled simulated response.",
    description:
      "I built Averqen to explore how AI can help investigate security incidents without becoming the authorization or execution boundary. Telemetry, detection, correlation, tenant isolation, policy decisions, and high-impact response controls remain deterministic; AI operates only on bounded evidence.",
    status: "engineering-complete",
    statusLabel: "v1.0.0 — Engineering complete",
    statusShort: "v1.0.0",
    focus: [
      "Deterministic detection",
      "Grounded AI",
      "FORCE RLS",
      "Controlled response",
    ],
    techLine: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Next.js",
    ],
    proofLine:
      "1,493 tests · 27 FORCE-RLS tables · 58 OpenAPI paths · AI trust boundary",
    featured: true,
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Next.js",
      "TypeScript",
      "SQLAlchemy",
      "Alembic",
      "OpenTelemetry",
      "pytest",
    ],
    highlights: [
      "1,493 automated tests passing with adversarial security coverage",
      "27 tenant-sensitive tables protected with PostgreSQL FORCE RLS",
      "Deterministic telemetry, detection, incident correlation, and entity graph",
      "Grounded AI investigator with evidence citations, validation, abstention, and MITRE ATT&CK mapping",
      "Threat-intelligence enrichment with explicit source provenance",
      "Deterministic response policy with human approval for high-impact actions",
      "Simulation-only response execution with TOCTOU-safe approval snapshots",
      "MFA, scoped API keys, Redis rate limiting, SSRF defenses, and hash-chained audit records",
    ],
    links: {
      caseStudy: {
        label: "View Case Study",
        href: "/projects/averqen",
      },
      github: {
        label: "GitHub",
        href: "https://github.com/miransec/averqen",
        external: true,
      },
    },
    screenshotDir: "/projects/averqen",
  },
  {
    slug: "atlascore",
    title: "AtlasCore",
    subtitle:
      "Secure enterprise AI infrastructure for knowledge, retrieval, and grounded AI workflows.",
    shortDescription:
      "A multi-tenant AI platform for ingesting organisation knowledge, retrieving it under database-enforced access control, and answering questions only from retrieved evidence.",
    description:
      "A multi-tenant AI platform for ingesting organisation knowledge, retrieving it under database-enforced access control, and answering questions only from retrieved evidence. Security is enforced in code and database boundaries rather than delegated to model prompts.",
    status: "engineering-complete",
    statusLabel: "UI v2 — verified engineering surface",
    statusShort: "UI v2",
    focus: ["FORCE RLS", "Hybrid retrieval", "Grounded AI", "Workspace UI"],
    techLine: ["PostgreSQL RLS", "pgvector", "FastAPI", "Next.js"],
    proofLine:
      "717 backend tests · 46/46 evals · FORCE RLS · pgvector · UI v2",
    featured: true,
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "FORCE RLS",
      "pgvector",
      "Redis",
      "Next.js",
      "TypeScript",
      "OpenTelemetry",
      "pytest",
      "Vitest",
    ],
    highlights: [
      "717 backend tests passed · 0 failed",
      "46/46 deterministic evaluation cases · 100% pass rate",
      "FORCE RLS · restricted runtime DB role · live membership revalidation",
      "Hybrid FTS + pgvector retrieval with Reciprocal Rank Fusion",
      "Evidence-first answering with citation validation and abstention",
      "Workspace UI v2 with org/workspace management surfaces",
    ],
    links: {
      caseStudy: {
        label: "View Case Study",
        href: "/projects/atlascore",
      },
      github: {
        label: "GitHub",
        href: "https://github.com/miransec/atlascore",
        external: true,
      },
    },
    screenshotDir: "/projects/atlascore",
  },
  {
    slug: "vaanidesk",
    title: "VaaniDesk",
    subtitle: "Multilingual AI Customer Support Platform",
    shortDescription:
      "Multilingual AI customer support with controlled actions and hybrid RAG.",
    description:
      "A production-oriented customer support system for multilingual conversations, controlled business actions, access-controlled knowledge retrieval, and secure customer workflows.",
    status: "engineering-complete",
    statusLabel: "v1.0.1 — Engineering complete / portfolio release preparation",
    statusShort: "v1.0.1",
    focus: ["Agents", "RAG", "Security", "Evaluation"],
    techLine: ["FastAPI", "PostgreSQL", "RAG", "Next.js"],
    proofLine:
      "206 backend tests · 113 evals · 40 security tests · 14 E2E",
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
      "206 backend tests passed · 0 failed",
      "113 deterministic evaluations · 40 security-critical",
      "14 Playwright E2E tests passed",
      "Hybrid RAG with source citations and confirmations",
    ],
    links: {
      caseStudy: {
        label: "View Case Study",
        href: "/projects/vaanidesk",
      },
      github: {
        label: "GitHub",
        href: "https://github.com/miransec/vaanidesk",
        external: true,
      },
      demo: {
        label: "Demo",
        href: null,
        comingSoon: true,
      },
    },
    screenshotDir: "/projects/vaanidesk",
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

export const averqenMetrics = {
  version: "v1.0.0",
  tests: { passed: 1493, failed: 0 },
  forceRlsTables: 27,
  openApiPaths: 58,
} as const;

export const averqenAreas = [
  "security telemetry",
  "deterministic detection",
  "incident correlation",
  "entity graph",
  "threat intelligence",
  "MITRE ATT&CK",
  "grounded AI investigation",
  "evidence validation",
  "AI trust boundary",
  "deterministic response policy",
  "human approval",
  "simulation-only execution",
  "hash-chained audit records",
  "FORCE RLS",
  "MFA",
  "scoped API keys",
  "Redis rate limiting",
  "SSRF defenses",
  "adversarial verification",
] as const;

export const averqenLimitations = [
  "Response execution is simulation-only; no real firewall, EDR, or IAM integrations are exercised.",
  "The system is an engineering portfolio project and is not presented as production-proven at enterprise scale.",
  "High-impact response actions remain behind deterministic policy and human approval.",
  "Averqen does not claim SOC 2 or ISO 27001 certification.",
  "The portfolio demo uses deterministic AI output so the investigation flow remains reproducible.",
] as const;

export const vaanideskMetrics = {
  version: "v1.0.1",
  label:
    "VaaniDesk v1.0.1 — Engineering complete / portfolio release preparation",
  backendTests: { passed: 206, failed: 0, skipped: 0 },
  evaluations: {
    passed: 113,
    deterministic: true,
    securityCritical: 40,
    securityFailures: 0,
  },
  e2e: { playwrightPassed: 14 },
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
  "An MCP server and a dedicated vision / image-analysis pipeline are not part of the shipped v1.0.1 surface.",
] as const;

export const atlascoreMetrics = {
  uiVersion: "UI v2",
  latestCommit: "9d62e33",
  backendTests: { passed: 717, failed: 0 },
  targetedDbSecurityTests: { passed: 216 },
  evaluations: {
    passed: 46,
    total: 46,
    passRate: "100%",
  },
  quality: {
    ruffClean: true,
    mypyStrictClean: true,
    mypySourceFiles: 90,
    frontendLint: true,
    frontendTypecheck: true,
    frontendVitest: true,
    frontendBuild: true,
    migrationsApplied: true,
    forceRlsPreserved: true,
    restrictedDbRolePreserved: true,
    liveOrgMembershipValidation: true,
    liveWorkspaceMembershipValidation: true,
    noHardcodedWorkspaceIds: true,
    noProviderSecretsLogged: true,
    noProductionSecretsCommitted: true,
  },
} as const;

export const atlascoreCurrentAreas = [
  "organisations and workspaces",
  "multi-tenant architecture",
  "PostgreSQL Row-Level Security",
  "FORCE RLS",
  "restricted runtime database role",
  "RBAC",
  "secure authentication",
  "workspace membership validation",
  "invitations",
  "teams",
  "service accounts",
  "API keys",
  "knowledge sources and documents",
  "ingestion pipeline",
  "chunking",
  "embeddings",
  "PostgreSQL full-text search",
  "pgvector",
  "hybrid retrieval",
  "Reciprocal Rank Fusion",
  "grounded answering",
  "evidence packets",
  "evidence sufficiency gating",
  "abstention on weak/no evidence",
  "citation validation",
  "prompt-injection heuristics",
  "trusted instructions vs untrusted evidence",
  "deterministic test provider",
  "OpenAI provider",
  "Anthropic provider",
  "OpenAI-compatible base URL support",
  "audit logging",
  "structured logging",
  "OpenTelemetry-oriented configuration",
  "health/readiness endpoints",
  "Next.js workspace UI v2",
] as const;

/** Explicitly not claimed as shipped. */
export const atlascoreNotShipped = [
  "MCP",
  "safe analytics SQL",
  "workflow engine",
  "tool registry",
  "human approval gates",
  "Gemini integration",
  "large-scale production deployment",
] as const;

export const atlascoreUiSurfaces = [
  "dashboard",
  "workspaces",
  "knowledge sources",
  "documents",
  "search",
  "Ask AI",
  "members",
  "teams",
  "API keys",
  "service accounts",
  "audit",
  "organisation settings",
  "AI provider settings",
  "preferences",
] as const;

export const skillCategories = [
  {
    title: "AI",
    skills: ["Python", "RAG", "grounded generation", "evaluation"],
  },
  {
    title: "Systems",
    skills: ["FastAPI", "PostgreSQL", "pgvector", "Redis", "Docker"],
  },
  {
    title: "Security",
    skills: ["authorization", "RLS", "audit", "AI security"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "TypeScript"],
  },
] as const;

export const plannedWriting = [
  "Building tenant isolation with PostgreSQL RLS",
  "Designing safe tool execution for AI agents",
  "Hybrid retrieval in production RAG",
  "Evidence-first answering and abstention",
  "Evaluating multilingual AI systems",
] as const;
