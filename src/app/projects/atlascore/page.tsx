import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AtlasCoreArchitecture } from "@/components/ArchitectureDiagram";
import {
  CaseStudyMeta,
  CaseStudySection,
  TagList,
} from "@/components/CaseStudy";
import {
  atlascoreCurrentAreas,
  atlascoreRoadmap,
  getProjectBySlug,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "AtlasCore",
  description:
    "AtlasCore case study — secure enterprise AI operations platform with multi-tenancy, PostgreSQL RLS, RBAC, and auditable workflows. In active development.",
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
          <span className="text-accent-fg">02</span>
          <span className="mx-1.5 text-fg-subtle/60">/</span>
          <span className="uppercase">AtlasCore</span>
          <span className="mx-2 text-fg-subtle/50">·</span>
          <span>{project.statusShort}</span>
        </p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-fg md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-[15px] text-fg-muted">{project.subtitle}</p>
        <CaseStudyMeta
          rows={[
            { label: "status", value: project.statusShort },
            { label: "role", value: "engineering" },
            { label: "focus", value: "RLS / identity / authorization / audit" },
          ]}
        />
        <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
          {project.description}
        </p>
        <div className="mt-6 rounded-sm border border-border bg-surface p-5">
          <p className="font-mono-ui text-[10px] tracking-wide text-fg-subtle">
            ~/projects/atlascore
          </p>
          <div className="mt-4 space-y-2 font-mono-ui text-xs text-fg-muted">
            {project.focus.map((term) => (
              <p key={term}>
                <span className="text-accent-fg">→</span> {term}
              </p>
            ))}
          </div>
          <p className="mt-5 font-mono-ui text-[10px] text-fg-subtle">
            product visual pending · {project.statusShort}
          </p>
        </div>
        <p className="mt-4 font-mono-ui text-xs text-fg-subtle">
          AtlasCore — In active development
        </p>
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
            <span>repository coming soon</span>
          )}
        </div>
      </header>

      <div className="mt-14 max-w-2xl space-y-12 md:mt-16 md:space-y-14">
        <CaseStudySection title="Overview">
          <p>
            AtlasCore is a multi-tenant enterprise AI platform designed for
            secure knowledge access, controlled automation, organizational
            isolation, and auditable AI workflows. The current focus is
            foundational security and tenancy primitives rather than a finished
            end-to-end AI product surface.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Enterprise problem">
          <p>
            Enterprise AI systems fail when tenant boundaries are soft, audit
            trails are incomplete, or agents can act without human-controlled
            authorization. AtlasCore starts from isolation, authentication,
            RBAC, and auditability so later intelligence features inherit a
            trustworthy control plane.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Architecture">
          <p>
            Phase 1 centers on application services, tenant isolation via
            PostgreSQL RLS, authentication hardening, and audit event
            pipelines. Later intelligence capabilities are intentionally
            deferred until this foundation is solid.
          </p>
          <AtlasCoreArchitecture />
        </CaseStudySection>

        <CaseStudySection title="Multi-tenant design">
          <p>
            Tenancy is modeled around organisation and workspace isolation.
            Requests are scoped so data access and administrative actions cannot
            silently cross organisational boundaries.
          </p>
        </CaseStudySection>

        <CaseStudySection title="PostgreSQL RLS">
          <p>
            PostgreSQL Row-Level Security, including FORCE RLS, is a core
            isolation mechanism. Database policy enforcement complements
            application-level checks rather than replacing careful query and
            authorization design.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Authentication architecture">
          <p>
            Authentication design includes secure session handling with
            refresh-token families and replay detection. CSRF protection is
            part of the request security model for browser-facing flows.
          </p>
        </CaseStudySection>

        <CaseStudySection title="RBAC">
          <p>
            Role-based access control governs what operators and services can
            do within an organisation or workspace. Privileges are intended to
            be explicit and auditable rather than ambient.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Audit system">
          <p>
            Audit events capture security-relevant actions so operational and
            administrative activity can be reviewed. This is foundational for
            enterprise trust and incident investigation.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Administrative identity roadmap">
          <p>
            Administrative identity work continues as part of active
            development. The portfolio presents this as a roadmap area rather
            than a completed Phase 2+ capability.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Security model">
          <p>
            The security model emphasizes defence in depth: RLS and FORCE RLS,
            RBAC, refresh-token families, replay detection, CSRF protection,
            and audit logging. Human-controlled architecture remains a design
            constraint for automation that can affect organisational state.
          </p>
          <TagList items={atlascoreCurrentAreas} />
        </CaseStudySection>

        <CaseStudySection title="Roadmap (not completed)">
          <p>
            The following capabilities are planned after Phase 1 foundations.
            They are not claimed as finished functionality:
          </p>
          <TagList items={atlascoreRoadmap} />
        </CaseStudySection>

        <CaseStudySection title="Development status">
          <p>
            <strong className="font-medium text-fg">
              Status: In active development.
            </strong>{" "}
            Phase 1A and Phase 1B engineering cover tenancy and security
            foundations. Some Phase 1A runtime verification remains
            environment-dependent and is validated in the project&apos;s own
            development and CI contexts rather than claimed as a universal
            production deployment state.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Technology">
          <TagList items={project.technologies} />
        </CaseStudySection>
      </div>
    </article>
  );
}
