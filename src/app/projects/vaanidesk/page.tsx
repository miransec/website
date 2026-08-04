import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VaaniDeskArchitecture } from "@/components/ArchitectureDiagram";
import {
  CaseStudyMeta,
  CaseStudySection,
  MetricGrid,
  TagList,
} from "@/components/CaseStudy";
import {
  getProjectBySlug,
  vaanideskAreas,
  vaanideskLimitations,
  vaanideskMetrics,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "VaaniDesk",
  description:
    "VaaniDesk case study — multilingual AI customer support with controlled agent workflows, hybrid RAG, citations, evaluations, and security controls.",
  alternates: { canonical: "/projects/vaanidesk" },
};

export default function VaaniDeskPage() {
  const project = getProjectBySlug("vaanidesk");
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
        <span className="text-fg-muted">vaanidesk</span>
      </nav>

      <header className="mt-8 max-w-2xl">
        <p className="font-mono-ui text-xs text-fg-subtle">
          ~/projects/vaanidesk
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-fg md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-[15px] text-fg-muted">{project.subtitle}</p>
        <CaseStudyMeta
          rows={[
            { label: "status", value: project.statusShort },
            { label: "role", value: "engineering" },
            { label: "focus", value: "agents / RAG / security" },
          ]}
        />
        <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
          {project.description}
        </p>
        <p className="mt-4 font-mono-ui text-xs text-fg-subtle">
          {vaanideskMetrics.label}
        </p>
        <div className="mt-6 flex flex-wrap gap-4 font-mono-ui text-xs text-fg-subtle">
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
            <span>repository coming soon</span>
          )}
          {project.links.demo?.href ? (
            <a
              href={project.links.demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              demo →
            </a>
          ) : (
            <span>demo coming soon</span>
          )}
        </div>
      </header>

      <div className="mt-14 max-w-2xl space-y-12 md:mt-16 md:space-y-14">
        <CaseStudySection title="Overview">
          <p>
            VaaniDesk is a production-oriented multilingual AI customer support
            platform. It combines model intelligence with controlled tool
            execution, hybrid retrieval with source citations, evaluation
            coverage, and security controls suitable for real operational
            workflows.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Problem">
          <p>
            Customer support systems that bolt a chatbot onto an API often fail
            in production: uncontrolled tool calls, weak language coverage,
            missing citations, no evaluation harness, and thin security around
            sensitive actions. VaaniDesk addresses those failure modes as
            first-class engineering constraints rather than afterthoughts.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Architecture">
          <p>
            The system is organized as layered services: client interfaces,
            API and agent orchestration, an intelligence layer for multilingual
            routing and retrieval, and a data/infrastructure foundation on
            PostgreSQL, Redis, and Docker.
          </p>
          <VaaniDeskArchitecture />
        </CaseStudySection>

        <CaseStudySection title="Multilingual system">
          <p>
            Language support covers English, Hindi, Hinglish, and Marathi, with
            routing and evaluation awareness for mixed-language customer
            interactions common in real support environments.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Controlled agent workflow">
          <p>
            Agent behavior is constrained through structured workflows and
            controlled tool calling. Sensitive or destructive actions require
            confirmation rather than unconstrained autonomous execution.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Business tools">
          <p>
            The platform integrates business tools behind a gated execution
            model so the agent can act on real operational tasks while remaining
            within authorization and confirmation boundaries.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Hybrid RAG">
          <p>
            Retrieval combines hybrid search over PostgreSQL with pgvector,
            returning source citations so answers remain inspectable. This
            keeps model outputs grounded in indexed business knowledge rather
            than unconstrained generation alone.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Security model">
          <p>
            Security controls include authorization checks, idempotency for
            side-effecting operations, and prompt-injection defenses.
            Security-critical evaluation cases are part of the verified release
            metrics.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Speech pipelines (optional)">
          <p>
            Optional STT/TTS paths exist for speech-related support flows. Real
            external STT/TTS providers are credential-dependent; deterministic
            providers/simulators are used for local and CI verification. This
            is not a dedicated vision or image-analysis pipeline.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Evaluations">
          <p>
            Evaluation is treated as a release gate. Verified v1.0.0 metrics
            include 113 deterministic evaluation cases passed, with 40
            security-critical evaluations and 0 security failures.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Observability">
          <p>
            Operational visibility is built into the architecture so agent
            runs, tool calls, and retrieval behavior can be inspected during
            development and verification.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Testing">
          <p>
            The verification suite spans backend unit/integration tests,
            deterministic evaluation cases, Playwright end-to-end coverage,
            static typing with mypy, Docker health checks, migration cycles,
            seed idempotency, and secret scanning.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Engineering verification">
          <MetricGrid
            items={[
              {
                label: "Backend tests",
                value: `${vaanideskMetrics.backendTests.passed} passed · ${vaanideskMetrics.backendTests.failed} failed · ${vaanideskMetrics.backendTests.skipped} skipped`,
              },
              {
                label: "Deterministic evaluations",
                value: `${vaanideskMetrics.evaluations.passed} passed`,
              },
              {
                label: "Security-critical evals",
                value: `${vaanideskMetrics.evaluations.securityCritical} · ${vaanideskMetrics.evaluations.securityFailures} failures`,
              },
              {
                label: "Playwright E2E",
                value: `${vaanideskMetrics.e2e.playwrightPassed} passed`,
              },
              {
                label: "mypy",
                value: `Clean across ${vaanideskMetrics.quality.mypyCleanSourceFiles} source files`,
              },
              {
                label: "Release checks",
                value: "Docker · migrations · seed idempotency · secret scan",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection title="Technology">
          <TagList items={project.technologies} />
          <div className="pt-2">
            <p className="mb-2 text-sm text-fg-subtle">Major areas</p>
            <TagList items={vaanideskAreas} />
          </div>
        </CaseStudySection>

        <CaseStudySection title="Limitations">
          <ul className="list-disc space-y-2 pl-5">
            {vaanideskLimitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="What I learned">
          <p>
            Shipping an AI support system as engineering work means treating
            evaluation, authorization, idempotency, and language edge cases as
            part of the product surface — not as demos bolted onto a model
            call. Controlled tool execution and hybrid retrieval with citations
            were essential to making agent behavior inspectable and safe enough
            for operational use cases.
          </p>
        </CaseStudySection>
      </div>
    </article>
  );
}
