// Homepage "Selected client work" summaries — public-safe engagements only.
export const selectedWork = [
  {
    slug: 'multi-agent-content-intelligence-system',
    title: 'Multi-Agent Content Intelligence System (NeoScript)',
    problem:
      'Content operations spent substantial hours per brief with inconsistent tone and lack of source verification before publication.',
    approach:
      'Designed an orchestrated multi-agent pipeline (Researcher, Planner, Writer, Optimizer, Editor) with RAG retrieval, strict factual citation, and human-in-the-loop QA sign-off.',
    outcome: 'Streamlined end-to-end content production workflow with full source traceability.',
  },
  {
    slug: 'rag-business-knowledge-assistant',
    title: 'RAG-Based Business Knowledge Assistant',
    problem:
      'Routine inquiry triage consumed hours of manual staff time, while generic LLMs suffered from ungrounded responses regarding internal policies and service offerings.',
    approach:
      'Specified a 4-layer decision waterfall with caching and RAG document grounding, ensuring responses cite verified internal documentation before escalating to human staff.',
    outcome: 'Automated routine triage and lead qualification with deterministic guardrails.',
  },
  {
    slug: 'conversational-digital-twin-platform',
    title: 'Conversational Digital Twin Platform (NetTwin)',
    problem:
      'Static professional portfolios fail to answer nuanced stakeholder questions across time zones, resulting in delayed discovery and lost engagement.',
    approach:
      'Defined product requirements and conversational guardrails for a digital twin platform that answers questions grounded strictly in verified background documentation.',
    outcome: 'Always-on persona assistant with structured lead capture and zero hallucinated commitments.',
  },
];
