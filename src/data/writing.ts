export type WritingSection = {
  heading: string;
  paragraphs: string[];
};

export type WritingArticle = {
  slug: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  relatedProject?: {
    href: string;
    label: string;
  };
  sections: WritingSection[];
};

function countWords(article: Pick<WritingArticle, "sections" | "description">): number {
  const body = article.sections
    .flatMap((s) => [s.heading, ...s.paragraphs])
    .join(" ");
  return `${article.description} ${body}`
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingMinutes(article: WritingArticle): number {
  return Math.max(1, Math.ceil(countWords(article) / 220));
}

export function wordCount(article: WritingArticle): number {
  return countWords(article);
}

export const writingArticles: WritingArticle[] = [
  {
    slug: "grounded-ai-abstention",
    index: "01",
    title: "Why Grounded AI Should Be Allowed to Say “I Don’t Know”",
    description:
      "Retrieval alone does not make generation trustworthy. Evidence sufficiency and abstention belong in the product contract.",
    tags: ["RAG", "Grounding", "Evaluation"],
    relatedProject: {
      href: "/projects/atlascore",
      label: "AtlasCore case study",
    },
    sections: [
      {
        heading: "Grounding is not a synonym for retrieval",
        paragraphs: [
          "A common failure mode in RAG systems is treating “we retrieved something” as equivalent to “the answer is grounded.” Retrieval returns candidates. Generation still decides what to say. If those candidates are thin, off-topic, conflicting, or only loosely related, a fluent model can still produce a confident paragraph that looks supported without being supported.",
          "That gap matters in systems where answers are expected to cite organisational knowledge. The product promise is not eloquence. The promise is that claims track evidence the system can show, inspect, and refuse when missing.",
          "In AtlasCore, Ask AI is built around that distinction. The path is not retrieve-then-improvise. It is retrieve, assemble evidence, decide whether the evidence is enough, and only then answer — or abstain.",
        ],
      },
      {
        heading: "Evidence packets and sufficiency",
        paragraphs: [
          "Useful grounding starts by making evidence an explicit object rather than an invisible side effect of a prompt. An evidence packet is a structured bundle of retrieved material: chunks, scores, source metadata, and the relationships needed to cite them later. Once evidence is a first-class artifact, the system can reason about sufficiency instead of hoping the model will “be careful.”",
          "Sufficiency is the gate between retrieval and generation. Weak retrieval might return a few vaguely related passages, a single incomplete fragment, or material that answers a neighbouring question. Those cases should not automatically unlock unconstrained answering. A sufficiency check asks whether the packet can support a claim set for this question under the workspace’s access boundary.",
          "When the packet fails that check, abstention is the correct outcome. Abstaining is not a crash. It is the system saying the current evidence does not justify a grounded answer.",
        ],
      },
      {
        heading: "Citations need validation, not decoration",
        paragraphs: [
          "Citations are often treated as UI garnish: numbered chips that make an answer feel scientific. Without validation, they can point at documents the model never relied on, or worse, invent references that never existed in the retrieved set.",
          "Citation validation ties answer claims back to the evidence packet. If a sentence cannot be linked to retrieved material, it should not be presented as grounded. If the model tries to cite something outside the packet, that is a generation failure relative to the contract — not a minor formatting issue.",
          "Separating trusted instructions from untrusted retrieved evidence is part of the same discipline. System policy and operator instructions are privileged. Retrieved documents are untrusted content that may contain prompt-injection text, marketing claims, or contradictory drafts. Mixing those layers casually is how “grounded” systems get steered by the documents they were meant only to quote.",
        ],
      },
      {
        heading: "Abstention as a product feature",
        paragraphs: [
          "Teams sometimes treat “I don’t know” as an embarrassing fallback. In grounded systems it is a feature with product semantics: show why evidence was insufficient, avoid hallucinated certainty, and keep the human in control of what happens next — refine the query, ingest better sources, or escalate.",
          "Forcing an answer under weak evidence trains users to trust fluency. It also trains the evaluation suite to reward confident wrongness if the only metric is “did we produce text.” Abstention flips the incentive: the system is allowed to protect the trust boundary.",
          "AtlasCore’s Ask AI surface is designed to represent abstention and weak-evidence states clearly, including sanitized provider failures. The goal is inspectability. An empty confident answer is harder to debug than a structured refusal with the retrieval context that led there.",
        ],
      },
      {
        heading: "Evaluate grounded behaviour deterministically",
        paragraphs: [
          "If abstention and citation rules matter, they need release gates. Deterministic evaluation cases can check whether weak or empty retrieval produces abstention, whether citations stay inside the packet, and whether trusted instructions remain isolated from untrusted evidence.",
          "Those checks are not a replacement for human review of product quality. They are a regression net for the guarantees that make grounding meaningful. Without them, a prompt tweak or retrieval change can silently reintroduce forced answering.",
        ],
      },
      {
        heading: "Design for inspectable refusal",
        paragraphs: [
          "Grounded AI earns trust when it answers from evidence — and when it refuses to invent certainty the evidence cannot support.",
          "In practice that means designing the answer path as a state machine: retrieve, pack evidence, score sufficiency, generate or abstain, validate citations, render an inspectable result. Each step can fail closed without pretending the model almost knew. Teams that skip those steps often rediscover the same bug later as a polished hallucination with a footnote.",
          "Operationally, abstention also changes support workflows. Instead of arguing with a confident wrong answer, an operator can see that retrieval returned weak material, improve the corpus, or rephrase the question. That feedback loop is unavailable when the system always produces fluent text.",
          "If your RAG product cannot say “I don’t know” under weak evidence, it is not grounded. It is a search index attached to a storyteller.",
        ],
      },
    ],
  },
  {
    slug: "ai-tenant-isolation",
    index: "02",
    title: "Tenant Isolation for AI Systems Belongs Below the Prompt Layer",
    description:
      "Prompts are not a security boundary. Multi-tenant AI needs organisation and workspace isolation enforced in application code and the database.",
    tags: ["Security", "PostgreSQL", "RLS"],
    relatedProject: {
      href: "/projects/atlascore",
      label: "AtlasCore case study",
    },
    sections: [
      {
        heading: "The prompt is not a wall",
        paragraphs: [
          "Multi-tenant AI products tempt a dangerous shortcut: put tenant rules in the system prompt and hope the model complies. That approach collapses under adversarial input, retrieval poisoning, confused deputies, and ordinary bugs. A model that “usually” respects a written rule is not an authorization system.",
          "Isolation belongs below the prompt layer — in authentication, membership, request context, query planning, and database policy. The model should operate inside a workspace that has already been constrained by deterministic controls.",
          "AtlasCore’s design centre is that knowledge, retrieval, and answering inherit the same tenancy boundary. The LLM is a component inside that boundary, not the mechanism that creates it.",
          "This distinction also changes how incidents are investigated. If a leak happens, you want to ask which policy, role, or context failed — not whether the model “forgot” a paragraph of instructions. Security reviews get sharper when the boundary is code and SQL policy rather than prose.",
        ],
      },
      {
        heading: "Organisations, workspaces, and fail-closed context",
        paragraphs: [
          "A practical tenancy model separates organisations from workspaces. Organisations own membership and administrative surfaces. Workspaces scope knowledge, retrieval, and day-to-day AI workflows. Switching workspace context should be an explicit product action, not something inferred from free-text instructions.",
          "Fail-closed workspace context means operations do not proceed with a guessed or ambient tenant. If membership or workspace selection cannot be validated, the request stops. That is stricter than “best effort filtering” in application code after a broad query already ran.",
          "Live membership revalidation matters because sessions outlive role changes. An invitation revocation, team change, or workspace removal should not leave stale authorization assumptions hanging around until a token expires on its own schedule.",
        ],
      },
      {
        heading: "PostgreSQL RLS and FORCE RLS",
        paragraphs: [
          "Application checks are necessary and still insufficient alone. A missed filter in one endpoint can leak rows. PostgreSQL Row-Level Security pushes isolation into the database so queries execute under policies bound to the tenant context of the connection.",
          "FORCE RLS matters because it prevents privileged table owners and bypass paths from casually skipping policies. Isolation becomes a property of the data plane rather than a convention in the happiest code path.",
          "A restricted runtime database role complements that model. The application should not connect with a superuser-equivalent role that can disable controls. Least privilege at the DB role level reduces the blast radius of bugs and compromised credentials.",
        ],
      },
      {
        heading: "Retrieval must inherit the same boundary",
        paragraphs: [
          "RAG introduces a second leak surface. Embeddings and full-text indexes are still rows. Hybrid retrieval that ignores tenant filters can surface another organisation’s documents into an evidence packet, after which a “grounded” answer becomes a grounded leak.",
          "The correct invariant is simple to state and expensive to get wrong: every retrieval path — lexical, vector, fused ranking — must execute under the same workspace authorization boundary as ordinary CRUD. Ranking quality never excuses cross-tenant visibility.",
          "Defence in depth stacks these controls: authenticate the principal, authorize membership, set fail-closed workspace context, enforce RLS with FORCE RLS, restrict the runtime role, and only then let retrieval and generation run. Prompts can describe policy. They cannot enforce it.",
        ],
      },
      {
        heading: "What this looks like in product terms",
        paragraphs: [
          "For operators, the visible result is boring in a good way. Workspace selectors change context. Sources and documents stay inside that context. Ask AI answers only from evidence that survived the same controls. Audit logs record security-relevant actions without needing the model to confess.",
          "None of that requires claiming large-scale production deployment. It requires treating isolation as engineering work that survives prompt edits, provider swaps, and UI iterations.",
          "If a multi-tenant AI system’s primary tenant boundary is a paragraph in a system prompt, it does not have a tenant boundary. It has a wish.",
          "Engineering teams feel this most clearly when they add a second workspace. Suddenly every list endpoint, embedding query, and answer request has to prove which context it belongs to. If that proof is only a sentence in a prompt template, the second workspace is already a security incident waiting for traffic.",
        ],
      },
    ],
  },
  {
    slug: "ai-evaluation-release-gate",
    index: "03",
    title: "Evaluation as a Release Gate for AI Systems",
    description:
      "“It seemed to work” is not a release decision. Repeatable evaluations turn AI behaviour into something you can regress-test.",
    tags: ["Evaluation", "Testing", "AI Engineering"],
    relatedProject: {
      href: "/projects/atlascore",
      label: "AtlasCore case study",
    },
    sections: [
      {
        heading: "Two different kinds of confidence",
        paragraphs: [
          "Demo confidence is easy to manufacture. You ask a favourable question, the model answers fluently, and everyone nods. Release confidence is harder. It asks whether the system still upholds specific behaviours after a change — retrieval quality, citation discipline, abstention, authorization, and security-sensitive paths.",
          "Those are different questions. Conflating them is how teams ship regressions wrapped in a good anecdote.",
          "Evaluation as a release gate means important guarantees can fail the build. Not every subjective quality issue needs a hard gate. The guarantees that define the product contract do.",
        ],
      },
      {
        heading: "Deterministic paths and expected behaviour",
        paragraphs: [
          "Deterministic evaluation paths use fixed inputs and expected outcomes so CI does not depend on a live provider’s mood. A deterministic test provider lets you assert that weak evidence abstains, that citations stay inside the packet, that unauthorized contexts fail closed, and that expected answers match for known fixtures.",
          "Backend tests and AI evaluations play different roles. Backend tests protect APIs, database policy, auth flows, and service invariants. AI evaluations protect grounded behaviour and security-sensitive conversational paths that sit above those services. You need both.",
          "Real-provider testing still matters, but it should be separate from the gate that blocks every merge. Live providers are useful for spot checks and release candidates. They are a poor sole dependency for “did authorization still work.”",
        ],
      },
      {
        heading: "What belongs in the gate",
        paragraphs: [
          "A useful gate covers retrieval quality signals for fixture corpora, evidence and citation checks, abstention cases, and security regressions such as injection-style prompts or attempts to cross a permission boundary through natural language.",
          "It should also stay honest about scope. Passing deterministic evaluations does not prove production scale, customer satisfaction, or that every provider configuration is perfect. It proves the checked behaviours did not regress under the harness you trust.",
          "When those behaviours regress, the release should stop. Fixing the gate by deleting the case is just deleting the guarantee.",
        ],
      },
      {
        heading: "Verified project numbers as examples",
        paragraphs: [
          "These figures are project verification numbers from my own systems — not industry benchmarks and not claims of large-scale production deployment.",
          "For AtlasCore UI v2, verification included 717 backend tests passed, 46/46 deterministic evaluations passed, and 216 targeted workspace / RLS / provider / knowledge database tests passed, with Ruff clean, strict mypy clean across 90 source files, and frontend lint, type-check, Vitest, and production build passed.",
          "For VaaniDesk, verification included 206 backend tests, 113 deterministic evaluations, 40 security-critical tests with 0 security failures, and 14 Playwright end-to-end tests.",
          "The point of listing them is methodological: release decisions were tied to suites that can be re-run, not to a single happy-path chat transcript.",
          "Those suites also encode product language. “46/46 deterministic evaluations” is only meaningful if you know the cases cover abstention, citation discipline, and related grounded behaviours. Otherwise the number becomes a vanity metric. Pair the count with the contract it protects.",
        ],
      },
      {
        heading: "Make the gate visible in the product narrative",
        paragraphs: [
          "Recruiters and collaborators can understand “tests passed” as theatre unless you explain what the suites protect. Connecting evaluations to product contracts — abstention, isolation, controlled actions — makes the numbers meaningful.",
          "Evaluation will not remove judgment from shipping. It gives judgment better evidence. That is the difference between hoping an AI system still works and knowing which guarantees still hold.",
          "A practical habit is to keep a short list of “must never regress” behaviours next to the suite: abstain on empty evidence, refuse cross-tenant retrieval, require confirmation for destructive actions, keep citations inside the packet. When a change touches those paths, the gate is not bureaucracy — it is how you avoid learning about the regression from a user.",
        ],
      },
    ],
  },
  {
    slug: "controlled-ai-actions",
    index: "04",
    title: "Giving AI Tools Without Giving It Uncontrolled Power",
    description:
      "Tool-using AI should propose intent. Authorization, confirmation, and side effects belong to deterministic backend code.",
    tags: ["AI Security", "Authorization", "Backend"],
    relatedProject: {
      href: "/projects/vaanidesk",
      label: "VaaniDesk case study",
    },
    sections: [
      {
        heading: "Agentic should not mean unrestricted",
        paragraphs: [
          "“Give the model tools” is incomplete advice. Tools are side-effecting APIs. If the model can call them freely, you have built an untrusted planner with production privileges. That is not leverage. That is an incident waiting for a prompt.",
          "A safer shape separates proposal from execution. The model may interpret a customer request and propose an action. Deterministic backend code decides whether that action is allowed, whether confirmation is required, and how to execute it idempotently.",
          "VaaniDesk was built around that separation for multilingual customer support: conversations can drive business actions, but sensitive operations do not execute because the model sounded sure.",
        ],
      },
      {
        heading: "Ownership checks and confirmation gates",
        paragraphs: [
          "Authorization for tool actions should look like ordinary backend authorization. Ownership checks, role checks, and resource scope come from the authenticated principal and server-side state — not from whatever account number appeared in the latest user message.",
          "Confirmation before sensitive operations turns irreversible or costly actions into an explicit human decision. Cancellation, refunds, and similar flows need an approve/deny step that the UI can represent clearly. The model can request confirmation. It should not silently complete the side effect.",
          "Idempotency protects against retries, double submits, and repeated tool proposals for the same intent. Support workflows are noisy. Without idempotency keys and server-side deduplication, “controlled” actions become duplicated charges and duplicated state transitions.",
        ],
      },
      {
        heading: "Tool boundaries and prompt injection",
        paragraphs: [
          "Tool/action boundaries define the closed set of operations the system will consider. An open-ended “run whatever seems helpful” loop is difficult to reason about and harder to evaluate. A catalogued action set can be tested, logged, and denied by default.",
          "Prompt injection is the adversarial version of the same problem: untrusted text tries to elevate privileges or coerce tool use. Defences include treating retrieved and user content as untrusted, keeping privileged instructions separate, and ensuring the tool gateway never trusts the model’s word over server-side policy.",
          "None of this requires claiming a general autonomous agent framework. It requires boring backend discipline applied to AI-shaped entry points.",
        ],
      },
      {
        heading: "Auditability as part of the action path",
        paragraphs: [
          "If an action can change customer or business state, it should leave an inspectable trail: who requested it, what was proposed, what checks ran, whether confirmation occurred, and what executed. Observability is not only for model quality. It is for operational trust.",
          "When something goes wrong, you want to replay the decision path without reconstructing it from chat poetry. Structured logs and evaluation coverage over security-critical cases make that possible.",
          "VaaniDesk’s verification posture treated security-critical evaluations and end-to-end browser checks as part of release readiness for exactly this reason: controlled actions are product behaviour, not a demo flourish.",
        ],
      },
      {
        heading: "The contract worth keeping",
        paragraphs: [
          "Give the model a narrow channel to express intent. Keep authorization, confirmation, idempotency, and execution in code you can test without asking a provider to be lucky.",
          "That contract scales down to internships and small teams as well as it scales up in complexity: fewer magical loops, more explicit boundaries, and fewer ways for fluent text to become unauthorized power.",
          "If you only remember one design rule: the model can suggest. The backend must decide. Everything else — confirmation UX, idempotency keys, audit events, evaluation cases — is how you keep that rule true after the first demo stops being carefully supervised.",
          "This is also why evaluation cases for sensitive actions matter. A suite can assert that a cancellation proposal without confirmation does not mutate state, that ownership mismatches fail closed, and that repeated identical tool proposals do not double-apply. Those tests are not glamorous, but they are how “controlled” stays true after refactors.",
          "Fluent models will keep getting better at sounding authorized. Your job is to make sure sounding authorized never becomes being authorized.",
        ],
      },
    ],
  },
];

export function getWritingArticle(slug: string): WritingArticle | undefined {
  return writingArticles.find((article) => article.slug === slug);
}

export function getWritingSlugs(): string[] {
  return writingArticles.map((article) => article.slug);
}
