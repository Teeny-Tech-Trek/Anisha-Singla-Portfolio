// Homepage "Selected client work" summaries — condensed problem/approach/outcome
// versions of 3 of the full case studies already in caseStudiesData.js. Content is
// paraphrased down from that file's existing detail sections and metrics tables;
// nothing here is invented. `slug` links back to the full /case-studies/:slug page.
//
// ── CLIENT-MATCH FLAG ──────────────────────────────────────────────────────
// The work order's Section 2 "Named client work" lists exactly three engagements:
// AI Champions (enterprise upskilling bot), Real Estate Intelligence Dashboard,
// and an immigration advisory chatbot. Only "Real Estate Intelligence Dashboard"
// below is a confirmed match — it's named directly. The other two entries here
// (RAG-Based Business Knowledge Assistant, Agentic Workflow Automation System)
// are real, sourced case studies already in this repo, but there is NO content
// anywhere in this codebase for "AI Champions" or an "immigration advisory
// chatbot" specifically — searched caseStudiesData.js in full, zero matches.
// `needsClientConfirmation: true` marks the two entries that may not be what
// Section 2 intends. See "Final Remaining-Work Report" §5 for the two options
// this decision comes down to. Do not silently rename/reskin these to pretend
// they are the AI Champions/immigration engagements.
export const selectedWork = [
  {
    slug: 'real-estate-intelligence-dashboard',
    title: 'Real Estate Intelligence Dashboard',
    problem:
      "Property teams spent hours manually pulling, filtering, and cross-referencing listings before any insight appeared, and comparables meant manually filtering across location, size, price, and type.",
    approach:
      'Built a decision-support product combining structured listings, filters, and reports with an AI layer that answers plain-language questions, pulls comparables, and generates summaries on demand.',
    outcome: 'Market research time cut from 2–4 hours to under 5 minutes.',
  },
  {
    slug: 'rag-business-knowledge-assistant',
    title: 'RAG-Based Business Knowledge Assistant',
    problem:
      "A generic AI model guessed at pricing, services, and process and got them subtly wrong, with no way to verify an answer was grounded in real company information — and interested visitors hit a dead end instead of being captured as leads.",
    approach:
      "Built an assistant that answers only from the business's own ingested documents, cites its source for every answer, captures leads inside the conversation, and escalates to a human when it doesn't know.",
    outcome: 'First response time cut from 2–6 hours to under 1 minute, with ~60–70% of repetitive queries AI-deflected.',
    needsClientConfirmation: true,
  },
  {
    slug: 'agentic-workflow-automation-system',
    title: 'Agentic Workflow Automation System',
    problem:
      'A content operation run entirely by hand — slow, inconsistent, error-prone, and opaque, with no record of why a piece said what it said or where a fact came from.',
    approach:
      'Designed a multi-agent pipeline (Researcher, Planner, Writer, Optimizer, Editor) grounded in RAG retrieval, with a QA gate, human review, and full audit logging before publish.',
    outcome: 'Response time cut from 2–6 hours to under 1 minute; 60–70% of the workload automated.',
    needsClientConfirmation: true,
  },
];
