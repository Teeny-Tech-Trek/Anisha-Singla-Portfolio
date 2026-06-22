// 5 AI case studies. Content (descriptions, tags) is pulled from the source PDFs in
// public/case-studies/. `year` is intentionally blank — none of the source documents
// carry a date. Categories drive both the filter tabs and the right-side card pill.
export const caseStudies = [
  {
    id: 1,
    number: '01',
    category: 'Agentic Systems',
    title: 'Agentic Workflow',
    subtitle: 'Automation System',
    description:
      "Turning a slow, manual business process into a production-grade agentic AI system: scoped agents, retrieval-grounded knowledge, fallback logic, human review, and full logging. Built to run every day and be trusted, not just demoed.",
    tags: ['Agentic AI', 'Workflow Automation', 'RAG', 'Guardrails'],
    year: '',
    pdfUrl: '/case-studies/agentic-workflow-automation-system.pdf',
    gradient: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)',
  },
  {
    id: 2,
    number: '02',
    category: 'RAG & Knowledge',
    title: 'RAG-Based',
    subtitle: 'Business Knowledge Assistant',
    description:
      "An AI assistant that answers from a business's own documents (services, FAQs, workflows) rather than generic replies. It cites each source, captures leads inside the conversation, and escalates to a human when it should.",
    tags: ['RAG', 'Knowledge Base', 'Lead Capture', 'Citations'],
    year: '',
    pdfUrl: '/case-studies/rag-business-knowledge-assistant.pdf',
    gradient: 'linear-gradient(135deg, rgba(100,150,255,0.06) 0%, transparent 60%)',
  },
  {
    id: 3,
    number: '03',
    category: 'AI Analytics',
    title: 'Real Estate',
    subtitle: 'Intelligence Dashboard',
    description:
      "A decision-support product that turns raw property data into market intelligence. A structured data layer stays the source of truth while an AI layer adds natural-language search, RAG over listings and reports, on-demand summaries, and comparable analysis.",
    tags: ['Market Intelligence', 'NL Search', 'RAG', 'Comparables'],
    year: '',
    pdfUrl: '/case-studies/real-estate-intelligence-dashboard.pdf',
    gradient: 'linear-gradient(135deg, rgba(150,100,255,0.05) 0%, transparent 60%)',
  },
  {
    id: 4,
    number: '04',
    category: 'Agentic Systems',
    title: 'Multi-Agent',
    subtitle: 'Content Intelligence System',
    description:
      "A multi-agent system that turns a single brief into research-backed, citation-grounded blog and social content. Specialized agents research, plan, write, optimize, and finalize in a controlled sequence, with every claim traced to a real source.",
    tags: ['Multi-Agent', 'Content Pipeline', 'RAG', 'Citations'],
    year: '',
    pdfUrl: '/case-studies/multi-agent-content-intelligence-system.pdf',
    gradient: 'linear-gradient(135deg, rgba(120,220,255,0.06) 0%, transparent 60%)',
  },
  {
    id: 5,
    number: '05',
    category: 'Responsible AI',
    title: 'Responsible AI',
    subtitle: 'Governance & Evaluation Framework',
    description:
      "A practical framework for deploying AI agents safely: risk classification, data-sensitivity mapping, hallucination controls, human-in-the-loop checkpoints, audit logs and fallbacks, plus an evaluation layer that proves behavior before shipping.",
    tags: ['Responsible AI', 'Risk & Guardrails', 'Evaluation', 'Human Oversight'],
    year: '',
    pdfUrl: '/case-studies/responsible-ai-governance-framework.pdf',
    gradient: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)',
  },
];
