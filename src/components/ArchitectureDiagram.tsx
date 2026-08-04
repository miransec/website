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
      title: "Administrative & operator surfaces",
      items: ["Org administration", "Workspace controls", "Human approval paths"],
    },
    {
      title: "Application services",
      items: ["FastAPI", "Auth service", "RBAC", "Audit event pipeline"],
    },
    {
      title: "Tenant isolation",
      items: [
        "Organisation boundaries",
        "Workspace isolation",
        "PostgreSQL RLS + FORCE RLS",
      ],
    },
    {
      title: "Security primitives",
      items: [
        "Refresh-token families",
        "Replay detection",
        "CSRF protection",
        "Secret management",
      ],
    },
  ];

  return (
    <div
      className="rounded-lg border border-border bg-surface p-4 md:p-6"
      role="img"
      aria-label="AtlasCore architecture: admin surfaces, application services, tenant isolation, and security primitives"
    >
      <p className="mb-4 text-xs uppercase tracking-wide text-fg-subtle">
        Architecture overview — Phase 1 focus
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
        Roadmap (not completed): RAG, agent workflows, MCP, and enterprise
        analytics may follow once the security and tenancy foundations are
        stable.
      </p>
    </div>
  );
}
