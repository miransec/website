export function VaaniDeskArchitecture() {
  const layers = [
    {
      title: "Client interfaces",
      items: ["Web console", "Support channels", "Operator tools"],
    },
    {
      title: "API & orchestration",
      items: ["FastAPI", "Controlled agent runtime", "Tool gateway", "MCP adapters"],
    },
    {
      title: "Intelligence layer",
      items: [
        "Multilingual LLM routing",
        "Hybrid RAG + citations",
        "Multimodal STT/TTS pipelines",
        "Evaluation harness",
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
            <div className="rounded-md border border-border bg-canvas px-4 py-3">
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
      <p className="mt-4 text-xs text-fg-subtle">
        External LLM, STT/TTS, SMTP, and WhatsApp providers are optional and
        credential-dependent. Local and CI paths use deterministic
        providers/simulators.
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
            <div className="rounded-md border border-border bg-canvas px-4 py-3">
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
      <p className="mt-4 text-xs text-fg-subtle">
        Future RAG, workflow, and MCP capabilities are planned. They are not
        presented as completed Phase 2+ deliverables.
      </p>
    </div>
  );
}
