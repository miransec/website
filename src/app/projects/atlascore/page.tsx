import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AtlasCoreArchitecture } from "@/components/ArchitectureDiagram";
import {
  CaseStudyMeta,
  CaseStudySection,
  MetricGrid,
  TagList,
} from "@/components/CaseStudy";
import {
  atlascoreCurrentAreas,
  atlascoreMetrics,
  atlascoreNotShipped,
  atlascoreUiSurfaces,
  getProjectBySlug,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "AtlasCore",
  description:
    "Secure enterprise AI infrastructure for multi-tenant knowledge, hybrid retrieval, grounded answering, and database-enforced isolation.",
  alternates: { canonical: "/projects/atlascore" },
};

export default function AtlasCorePage() {
  const project = getProjectBySlug("atlascore");
  if (!project) notFound();

  return (
    <article className="container-page py-14 md:py-20">
      <nav className="font-mono-ui text-xs text-fg-subtle" aria-label="Breadcrumb">
        <Link href="/projects" className="hover:text-fg">
          work
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="text-fg-muted">atlascore</span>
      </nav>

      <header className="mt-8 max-w-2xl">
        <p className="font-mono-ui text-xs tracking-wide text-fg-subtle">
          <span className="text-accent-fg">01</span>
          <span className="mx-1.5 text-fg-subtle/60">/</span>
          <span className="uppercase">AtlasCore</span>
          <span className="mx-2 text-fg-subtle/50">·</span>
          <span>{project.statusShort}</span>
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-2 text-[15px] text-fg-muted">{project.subtitle}</p>
        <CaseStudyMeta
          rows={[
            { label: "status", value: project.statusShort },
            { label: "role", value: "engineering" },
            {
              label: "focus",
              value: "FORCE RLS / hybrid retrieval / grounded AI / UI v2",
            },
            {
              label: "tests",
              value: `${atlascoreMetrics.backendTests.passed} backend · ${atlascoreMetrics.evaluations.passed}/${atlascoreMetrics.evaluations.total} evals`,
            },
            {
              label: "commit",
              value: `${atlascoreMetrics.latestCommit} — ship AtlasCore UI v2`,
            },
          ]}
        />
        <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
          {project.description}
        </p>
        <div className="mt-6 rounded-sm border border-border bg-surface p-5">
          <p className="font-mono-ui text-[10px] tracking-wide text-fg-subtle">
            atlascore / workspace ui v2
          </p>
          <div className="mt-4 space-y-2 font-mono-ui text-xs text-fg-muted">
            <p>
              <span className="text-accent-fg">→</span> FORCE RLS + restricted
              runtime DB role
            </p>
            <p>
              <span className="text-accent-fg">→</span> Hybrid FTS + pgvector +
              RRF retrieval
            </p>
            <p>
              <span className="text-accent-fg">→</span> Evidence-first Ask AI
              with abstention
            </p>
            <p>
              <span className="text-accent-fg">→</span> Workspace selector and
              admin surfaces
            </p>
          </div>
          <p className="mt-5 font-mono-ui text-[10px] text-fg-subtle">
            product panel · no fabricated screenshots
          </p>
        </div>
        <div className="mt-6 font-mono-ui text-xs text-fg-subtle">
          {project.links.github.href ? (
            <a
              href={project.links.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              repository →
            </a>
          ) : (
            <span>repository link not published yet</span>
          )}
        </div>
      </header>

      <div className="mt-14 max-w-2xl space-y-12 md:mt-16 md:space-y-14">
        <CaseStudySection title="Summary">
          <p>
            AtlasCore is a multi-tenant AI platform for organisation knowledge,
            database-enforced retrieval, and grounded answering. Models operate
            inside backend, authorization, and evidence boundaries — not as the
            security boundary themselves.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Problem">
          <p>
            Enterprise AI workflows fail when tenant isolation is soft, when
            retrieval can leak across workspaces, or when models answer without
            inspectable evidence. Soft prompt instructions are not enough.
            Isolation, membership, and evidence sufficiency need to be enforced
            in code and in the database.
          </p>
        </CaseStudySection>

        <CaseStudySection title="What I built">
          <p>
            The current verified surface includes organisations and workspaces,
            invitations and teams, service accounts and API keys, knowledge
            ingestion, hybrid retrieval, grounded answering with citations and
            abstention, audit logging, provider configuration, and a Next.js
            workspace UI (v2).
          </p>
          <TagList items={atlascoreCurrentAreas.slice(0, 18)} />
        </CaseStudySection>

        <CaseStudySection title="Architecture">
          <p>
            Requests flow through authenticated application services into
            workspace-scoped operations. Knowledge is ingested, chunked, and
            embedded; retrieval combines PostgreSQL full-text search with
            pgvector; answering is gated on evidence sufficiency. Isolation is
            enforced with FORCE RLS and a restricted runtime database role.
          </p>
          <AtlasCoreArchitecture />
        </CaseStudySection>

        <CaseStudySection title="Tenant isolation and security">
          <p>
            Multi-tenant boundaries are modeled as organisations and workspaces.
            PostgreSQL Row-Level Security with FORCE RLS is a core isolation
            mechanism. The runtime database role is restricted. Workspace
            context fails closed. Organisation and workspace membership are
            revalidated live — no hardcoded workspace IDs. RBAC, invitations,
            teams, service accounts, and API keys sit on top of that foundation.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Knowledge ingestion and hybrid retrieval">
          <p>
            Knowledge sources and documents move through an ingestion pipeline
            with chunking and embeddings. Retrieval combines PostgreSQL
            full-text search and pgvector similarity, fused with Reciprocal Rank
            Fusion, so answers can draw from lexical and semantic matches under
            the same access controls that protect the underlying rows.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Grounded answering">
          <p>
            Ask AI is evidence-first: the system builds evidence packets,
            gates on sufficiency, abstains when evidence is weak or missing,
            validates citations, and applies prompt-injection heuristics.
            Trusted instructions are separated from untrusted retrieved
            evidence. Providers include a deterministic test provider plus
            OpenAI, Anthropic, and configurable OpenAI-compatible base URLs.
            Provider secrets are not logged.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Workspace UI v2">
          <p>
            UI v2 is a major product/UX iteration: dark engineer-tooling
            aesthetic, persistent grouped sidebar, workspace selector, command
            palette, provider status, and polished surfaces for day-to-day
            workspace work. Users can list and create workspaces, receive
            administrator membership on create, switch workspace context, and
            continue into workspace-scoped features without manually entering
            UUIDs. Ask AI shows citations/evidence and represents abstention or
            weak-evidence states clearly, including sanitized provider failure
            states.
          </p>
          <p className="font-mono-ui text-xs text-fg-subtle">
            Surfaces: {atlascoreUiSurfaces.join(" · ")}
          </p>
          <p className="text-sm text-fg-subtle">
            Latest verified UI commit:{" "}
            <span className="font-mono-ui text-fg-muted">
              {atlascoreMetrics.latestCommit}
            </span>{" "}
            — feat: ship AtlasCore UI v2 and workspace experience. An earlier
            phase-2d baseline tag still exists separately and does not contain
            UI v2.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Verification">
          <p>
            Verification covers backend tests, targeted database/security
            checks, deterministic evaluations, static analysis, and frontend
            quality gates. FORCE RLS, the restricted runtime role, and live
            membership validation remained intact through the UI v2 verification
            pass.
          </p>
          <MetricGrid
            items={[
              {
                label: "Backend tests",
                value: `${atlascoreMetrics.backendTests.passed} passed · ${atlascoreMetrics.backendTests.failed} failed`,
              },
              {
                label: "Targeted DB/security",
                value: `${atlascoreMetrics.targetedDbSecurityTests.passed} passed`,
              },
              {
                label: "Deterministic evals",
                value: `${atlascoreMetrics.evaluations.passed}/${atlascoreMetrics.evaluations.total} · ${atlascoreMetrics.evaluations.passRate}`,
              },
              {
                label: "Ruff",
                value: "clean",
              },
              {
                label: "mypy strict",
                value: `clean · ${atlascoreMetrics.quality.mypySourceFiles} source files`,
              },
              {
                label: "Frontend",
                value: "lint + type-check + Vitest + build passed",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection title="Tradeoffs / limitations">
          <p>
            The verified surface is an engineering-complete UI v2 platform for
            knowledge, retrieval, and grounded workflows — not a claim of
            large-scale production deployment. The following are explicitly not
            shipped:
          </p>
          <TagList items={atlascoreNotShipped} />
        </CaseStudySection>

        <CaseStudySection title="Stack">
          <TagList items={project.technologies} />
        </CaseStudySection>

        <CaseStudySection title="Repository">
          <p>
            Public repository:{" "}
            <a
              href="https://github.com/miransec/atlascore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-fg transition-colors duration-200 hover:underline"
            >
              github.com/miransec/atlascore
            </a>
          </p>
        </CaseStudySection>
      </div>
    </article>
  );
}
