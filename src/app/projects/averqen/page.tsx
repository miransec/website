import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AverqenArchitecture } from "@/components/ArchitectureDiagram";
import {
  CaseStudyFigure,
  CaseStudyMeta,
  CaseStudySection,
  MetricGrid,
  TagList,
} from "@/components/CaseStudy";
import {
  averqenAreas,
  averqenLimitations,
  averqenMetrics,
  getProjectBySlug,
} from "@/data/projects";
import { averqenScreenshotSrc } from "@/lib/averqen-screenshots";

export const metadata: Metadata = {
  title: "Averqen",
  description:
    "AI-assisted security investigation with deterministic detection, grounded evidence, FORCE RLS tenant isolation, threat intelligence, and policy-controlled response.",
  alternates: {
    canonical: "/projects/averqen",
  },
};

export default function AverqenPage() {
  const project = getProjectBySlug("averqen");
  if (!project) notFound();

  const incidentDetail = averqenScreenshotSrc("incident-detail.png");
  const dashboard = averqenScreenshotSrc("dashboard.png");
  const incidents = averqenScreenshotSrc("incidents.png");
  const entities = averqenScreenshotSrc("entities.png");
  const threatIntel = averqenScreenshotSrc("threat-intel.png");
  const response = averqenScreenshotSrc("response.png");

  return (
    <article className="container-page py-14 md:py-20">
      <nav className="font-mono-ui text-xs text-fg-subtle" aria-label="Breadcrumb">
        <Link href="/projects" className="hover:text-fg">
          work
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="text-fg-muted">averqen</span>
      </nav>

      <header className="mt-8 max-w-2xl">
        <p className="font-mono-ui text-xs tracking-wide text-fg-subtle">
          <span className="text-accent-fg">01</span>
          <span className="mx-1.5 text-fg-subtle/60">/</span>
          <span className="uppercase">Averqen</span>
          <span className="mx-2 text-fg-subtle/50">·</span>
          <span>{project.statusShort}</span>
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-fg md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-2 text-[15px] text-fg-muted">{project.subtitle}</p>
        <CaseStudyMeta
          rows={[
            { label: "status", value: `${project.statusShort} · engineering complete` },
            { label: "role", value: "solo engineer" },
            { label: "focus", value: "AI security · detection · investigation · response" },
            {
              label: "proof",
              value: `1,493 tests · ${averqenMetrics.forceRlsTables} FORCE-RLS tables · ${averqenMetrics.openApiPaths} OpenAPI paths`,
            },
          ]}
        />
        <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
          {project.description}
        </p>
        {incidentDetail ? (
          <CaseStudyFigure
            src={incidentDetail}
            alt="Averqen incident investigation view showing correlated alerts, entity timeline, and AI analysis"
            caption="Incident investigation — correlated alerts, entity context, grounded AI analysis, and response proposal."
            priority
          />
        ) : dashboard ? (
          <CaseStudyFigure
            src={dashboard}
            alt="Averqen security operations dashboard showing recent incidents and detection activity"
            caption="Security operations overview — incidents, detections, and telemetry pipeline."
            priority
          />
        ) : (
          <div className="mt-6 rounded-sm border border-border bg-surface p-5">
            <p className="font-mono-ui text-[10px] tracking-wide text-fg-subtle">
              averqen / security investigation platform
            </p>
            <div className="mt-4 space-y-2 font-mono-ui text-xs text-fg-muted">
              <p>
                <span className="text-accent-fg">→</span> Deterministic detection
                + incident correlation
              </p>
              <p>
                <span className="text-accent-fg">→</span> Grounded AI investigator
                on bounded evidence
              </p>
              <p>
                <span className="text-accent-fg">→</span> Threat intelligence +
                MITRE ATT&CK mapping
              </p>
              <p>
                <span className="text-accent-fg">→</span> Human approval ·
                simulation-only response
              </p>
            </div>
            <p className="mt-5 font-mono-ui text-[10px] text-fg-subtle">
              product panel · {project.statusShort}
            </p>
          </div>
        )}
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

        <CaseStudySection title="Problem">
          <p>
            Security tooling has two competing pressures: analysts need help
            making sense of large volumes of telemetry, but handing an AI model
            direct authority over detection or response creates a new security
            boundary.
          </p>
          <p>
            I wanted to build a system where AI could contribute useful
            investigation context without being trusted to decide what happened,
            who may access the data, or what security action should execute.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Architecture">
          <p>
            The architecture keeps the model downstream of deterministic security
            controls. Events are normalized and detected first, alerts are
            correlated into incidents, and only then is a bounded evidence packet
            assembled for AI analysis. AI output goes through deterministic
            validation before it becomes visible as investigation context.
          </p>
          <AverqenArchitecture />
        </CaseStudySection>

        <CaseStudySection title="Security telemetry">
          <p>
            Averqen ingests normalized authentication, endpoint, network, DNS,
            and generic security events. Tenant-sensitive telemetry is protected
            by PostgreSQL FORCE Row-Level Security and a restricted runtime
            database role.
          </p>
          {(dashboard ?? incidents) ? (
            <CaseStudyFigure
              src={(dashboard ?? incidents)!}
              alt="Averqen security dashboard showing normalized event streams and detection activity"
              caption="Security telemetry — normalized events feeding deterministic detection rules."
            />
          ) : null}
        </CaseStudySection>

        <CaseStudySection title="Deterministic detection">
          <p>
            Detection is deliberately outside the AI layer. Rules include
            single-event, threshold, sequence, and IOC matching. Alert evidence
            remains traceable back to source events.
          </p>
          <p>
            Keeping detection deterministic means the system&apos;s conclusions
            about what happened are reproducible and auditable — not subject to
            model variance.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Incident correlation">
          <p>
            Alerts are grouped using deterministic correlation signals such as
            shared hosts, users, IPs, temporal proximity, and other entity
            relationships. The resulting incident becomes the stable investigation
            boundary.
          </p>
          {incidentDetail ? (
            <CaseStudyFigure
              src={incidentDetail}
              alt="Averqen incident detail view with correlated alerts, timeline, and investigation context"
              caption="Incident view — deterministically correlated alerts with entity and timeline context."
            />
          ) : null}
        </CaseStudySection>

        <CaseStudySection title="Entity graph">
          <p>
            Entities such as users, hosts, IPs, domains, processes, files, and
            hashes are extracted into a workspace-scoped relationship graph with
            provenance linking relationships back to alerts and events.
          </p>
          {entities ? (
            <CaseStudyFigure
              src={entities}
              alt="Averqen entity graph showing relationships between users, hosts, IPs, and processes"
              caption="Entity graph — workspace-scoped relationships derived from security telemetry."
            />
          ) : null}
        </CaseStudySection>

        <CaseStudySection title="Grounded AI investigator">
          <p>
            The AI investigator never queries the database directly. A
            deterministic{" "}
            <span className="font-mono-ui text-xs text-fg">
              EvidencePacketBuilder
            </span>{" "}
            assembles bounded incident evidence and assigns stable references
            such as{" "}
            <span className="font-mono-ui text-xs text-fg">
              ALT-NNN, EVT-NNN, ENT-NNN, TI-NNN
            </span>
            .
          </p>
          <p>
            The model returns structured claims rather than unrestricted prose.
            Citations, MITRE mappings, contradiction references, and claim
            support are checked before the investigation receives its final
            status.
          </p>
        </CaseStudySection>

        <CaseStudySection title="AI trust boundary">
          <p className="font-mono-ui text-sm text-fg">
            AI investigates.
            <br />
            Deterministic controls authorize.
            <br />
            Humans approve.
          </p>
          <p>
            Attacker-controlled telemetry is treated as untrusted evidence, never
            as model instructions. Model confidence is stored separately from the
            deterministic evidence score, so the model cannot promote its own
            output from insufficient evidence to a verified conclusion.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Threat intelligence">
          <p>
            Threat intelligence adds context rather than truth. Indicators retain
            source provenance, confidence, freshness, and exact matches to
            internal evidence. Expired and revoked intelligence is handled
            differently from active observations.
          </p>
          {threatIntel ? (
            <CaseStudyFigure
              src={threatIntel}
              alt="Averqen threat intelligence view with indicator provenance and confidence scores"
              caption="Threat intelligence — indicators with provenance, confidence, and evidence match tracking."
            />
          ) : null}
        </CaseStudySection>

        <CaseStudySection title="Controlled response">
          <p>
            AI may propose a typed response action, but it cannot execute one.
            The backend independently validates the target, computes risk,
            evaluates deterministic policy, and requires human approval for
            high-impact actions before execution can proceed.
          </p>
          <p>
            The v1.0.0 executor is simulation-only. No firewall, EDR, IAM, or
            operating-system control is performed.
          </p>
          {response ? (
            <CaseStudyFigure
              src={response}
              alt="Averqen response interface showing AI proposal, policy evaluation, and human approval gate"
              caption="Controlled response — proposal, deterministic policy check, and human approval before simulation."
            />
          ) : null}
        </CaseStudySection>

        <CaseStudySection title="Tenant isolation">
          <p>
            27 tenant-sensitive tables use PostgreSQL FORCE Row-Level Security.
            The runtime application role is neither a superuser nor{" "}
            <span className="font-mono-ui text-xs text-fg">BYPASSRLS</span>, and
            workspace identifiers from paths or local storage act only as
            selectors — authorization still depends on authenticated live
            membership and database policy.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Enterprise hardening">
          <p>
            The security surface includes Redis-backed rate limiting, scoped API
            keys, TOTP MFA, hash-chained audit records, webhook SSRF defenses,
            SSE infrastructure, and security and compliance evidence exports.
            These controls sit at the infrastructure level, separate from the AI
            investigation path.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Adversarial verification">
          <p>
            The final hardening pass added adversarial coverage across
            authentication, cross-tenant access, prompt injection, SSRF,
            response authority, dangerous execution primitives, idempotency, and
            query safety.
          </p>
          <MetricGrid
            items={[
              {
                label: "Tests",
                value: "1,493 / 1,493 passing",
              },
              {
                label: "FORCE-RLS tables",
                value: `${averqenMetrics.forceRlsTables} tenant-sensitive`,
              },
              {
                label: "OpenAPI paths",
                value: `${averqenMetrics.openApiPaths}`,
              },
              {
                label: "Phase 9 adversarial",
                value: "0 failures",
              },
            ]}
          />
        </CaseStudySection>

        <CaseStudySection title="Engineering challenges">
          <p>
            <span className="font-mono-ui text-xs text-fg">
              RLS context propagation.
            </span>{" "}
            Release verification found services querying RLS-protected tables
            before setting the tenant/user GUC. The fix was to enforce tenant
            context setup before those operations, ensuring RLS policy had the
            correct context from the first query.
          </p>
          <p>
            <span className="font-mono-ui text-xs text-fg">
              Refresh-token transaction failure.
            </span>{" "}
            An audit RLS failure could invalidate the surrounding PostgreSQL
            transaction and roll back refresh-session state. Fixing context setup
            before audit writes resolved the cascade and kept the refresh path
            transactionally sound.
          </p>
          <p>
            <span className="font-mono-ui text-xs text-fg">
              AI evidence vs authority.
            </span>{" "}
            The architectural challenge was getting useful AI analysis — MITRE
            mappings, claim citations, contradiction detection — while ensuring
            the model never became the authorization or execution authority. The
            bounded evidence packet and structured output schema enforce that
            boundary at the protocol level.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Demo">
          <p>
            The release demo seeds 32 security events that flow through 8
            detection rules, producing 11 alerts correlated into 3 incidents,
            with entity and threat-intelligence context assembled for each. The
            flagship incident in the dataset drives a complete investigation
            path: grounded AI analysis, a response proposal, human approval, and
            simulation.
          </p>
          <div className="mt-4 space-y-1 font-mono-ui text-xs text-fg-muted">
            <p>
              <span className="text-accent-fg">→</span> 32 seeded events
            </p>
            <p>
              <span className="text-accent-fg">→</span> 8 detection rules
            </p>
            <p>
              <span className="text-accent-fg">→</span> 11 alerts
            </p>
            <p>
              <span className="text-accent-fg">→</span> 3 incidents
            </p>
            <p>
              <span className="text-accent-fg">→</span> entity / threat-intelligence context
            </p>
            <p>
              <span className="text-accent-fg">→</span> grounded AI investigation
            </p>
            <p>
              <span className="text-accent-fg">→</span> response proposal
            </p>
            <p>
              <span className="text-accent-fg">→</span> human approval
            </p>
            <p>
              <span className="text-accent-fg">→</span> simulation
            </p>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Known limitations">
          <ul className="list-disc space-y-2 pl-5">
            {averqenLimitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Stack">
          <TagList items={project.technologies} />
          <div className="pt-2">
            <p className="mb-2 text-sm text-fg-subtle">Areas</p>
            <TagList items={averqenAreas} />
          </div>
        </CaseStudySection>

        <CaseStudySection title="Repository">
          <p>
            {project.links.github.href ? (
              <>
                Public repository:{" "}
                <a
                  href={project.links.github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-fg transition-colors duration-200 hover:underline"
                >
                  github.com/miransec/averqen
                </a>
              </>
            ) : (
              "Repository link not published yet."
            )}
          </p>
        </CaseStudySection>

      </div>
    </article>
  );
}
