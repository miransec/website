export function VaaniDeskArchitecture() {
  const layers = [
    {
      title: "Client interfaces",
      items: ["Web console", "Support channels", "Operator tools"],
    },
    {
      title: "API & orchestration",
      items: ["FastAPI", "Controlled agent runtime", "Tool gateway"],
    },
    {
      title: "Intelligence layer",
      items: [
        "Multilingual LLM routing",
        "Hybrid RAG + citations",
        "Evaluation harness",
        "Optional STT/TTS (credential-dependent)",
      ],
    },
    {
      title: "Data & infrastructure",
      items: ["PostgreSQL + pgvector", "Redis", "Observability", "Docker"],
    },
  ];

  return (
    <div
      className="rounded-lg border border-border bg-surface p-4 md:p-6"
      role="img"
      aria-label="VaaniDesk architecture: client interfaces, API orchestration, intelligence layer, and data infrastructure"
    >
      <p className="mb-4 text-xs uppercase tracking-wide text-fg-subtle">
        Architecture overview
      </p>
      <div className="grid gap-3">
        {layers.map((layer, index) => (
          <div key={layer.title}>
            <div className="rounded-md border border-border bg-canvas/50 px-4 py-3">
              <p className="text-sm font-medium text-fg">{layer.title}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-border bg-surface px-2 py-1 text-xs text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {index < layers.length - 1 ? (
              <div
                className="flex justify-center py-1 text-fg-subtle"
                aria-hidden="true"
              >
                ↓
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
        External LLM, STT/TTS, SMTP, and WhatsApp providers are optional and
        credential-dependent. Local and CI paths use deterministic
        providers/simulators. MCP and dedicated vision pipelines are not part of
        the shipped v1.0.1 surface.
      </p>
    </div>
  );
}

export function AtlasCoreArchitecture() {
  const layers = [
    {
      title: "Workspace UI v2",
      items: [
        "Grouped sidebar",
        "Workspace selector",
        "Ask AI + citations",
        "Org / workspace admin",
      ],
    },
    {
      title: "Application services",
      items: [
        "FastAPI",
        "Auth + RBAC",
        "Ingestion + retrieval",
        "Grounded answering",
        "Audit + observability",
      ],
    },
    {
      title: "Tenant isolation",
      items: [
        "Organisations / workspaces",
        "Live membership revalidation",
        "PostgreSQL RLS + FORCE RLS",
        "Restricted runtime DB role",
      ],
    },
    {
      title: "Knowledge & retrieval",
      items: [
        "Sources + documents",
        "Chunking + embeddings",
        "FTS + pgvector hybrid",
        "Reciprocal Rank Fusion",
      ],
    },
  ];

  return (
    <div
      className="rounded-lg border border-border bg-surface p-4 md:p-6"
      role="img"
      aria-label="AtlasCore architecture: workspace UI, application services, tenant isolation, and knowledge retrieval"
    >
      <p className="mb-4 text-xs uppercase tracking-wide text-fg-subtle">
        Architecture overview — UI v2
      </p>
      <div className="grid gap-3">
        {layers.map((layer, index) => (
          <div key={layer.title}>
            <div className="rounded-md border border-border bg-canvas/50 px-4 py-3">
              <p className="text-sm font-medium text-fg">{layer.title}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-border bg-surface px-2 py-1 text-xs text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {index < layers.length - 1 ? (
              <div
                className="flex justify-center py-1 text-fg-subtle"
                aria-hidden="true"
              >
                ↓
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
        Not shipped: MCP, safe analytics SQL, workflow engine, tool registry,
        human approval gates, Gemini integration, or large-scale production
        deployment claims.
      </p>
    </div>
  );
}

export function AverqenArchitecture() {
  const layers = [
    {
      title: "Security telemetry",
      items: [
        "Ingestion",
        "Normalization",
        "Deterministic detection",
        "Alerts",
      ],
    },
    {
      title: "Investigation foundation",
      items: [
        "Incident correlation",
        "Entity graph",
        "Timeline",
        "Threat intelligence",
      ],
    },
    {
      title: "Grounded AI",
      items: [
        "Bounded evidence packet",
        "Structured investigation",
        "Citation validation",
        "Evidence sufficiency",
      ],
    },
    {
      title: "Controlled response",
      items: [
        "Response proposal",
        "Deterministic policy",
        "Human approval",
        "SimulationExecutor",
      ],
    },
    {
      title: "Security boundary",
      items: [
        "FORCE RLS",
        "Restricted runtime DB role",
        "MFA + scoped API keys",
        "Audit hash chain",
      ],
    },
  ];

  return (
    <div
      className="rounded-lg border border-border bg-surface p-4 md:p-6"
      role="img"
      aria-label="Averqen architecture: security telemetry, investigation foundation, grounded AI, controlled response, and security boundary"
    >
      <p className="mb-4 text-xs uppercase tracking-wide text-fg-subtle">
        Architecture overview — v1.0.0
      </p>
      <div className="grid gap-3">
        {layers.map((layer, index) => (
          <div key={layer.title}>
            <div className="rounded-md border border-border bg-canvas/50 px-4 py-3">
              <p className="text-sm font-medium text-fg">{layer.title}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-border bg-surface px-2 py-1 text-xs text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {index < layers.length - 1 ? (
              <div
                className="flex justify-center py-1 text-fg-subtle"
                aria-hidden="true"
              >
                ↓
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
        AI investigates. Deterministic controls authorize. Humans approve.
        The model is downstream of detection and correlation — it never queries
        the database directly or executes response actions.
      </p>
    </div>
  );
}
