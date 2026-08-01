// 5 AI case studies. All content (descriptions, tags, detail sections) is extracted from
// the source PDFs in public/case-studies/. `year` is intentionally blank — none of the
// source documents carry a date. Categories drive both the filter tabs and the
// right-side card pill. Each study's `detail` object powers the /case-studies/:slug page.
export const caseStudies = [
  {
    id: 1,
    number: '01',
    slug: 'agentic-workflow-automation-system',
    category: 'Agentic Systems',
    title: 'Agentic Workflow',
    subtitle: 'Automation System',
    description:
      "Turning a slow, manual business process into a production-grade agentic AI system: scoped agents, retrieval-grounded knowledge, fallback logic, human review, and full logging. Built to run every day and be trusted, not just demoed.",
    tags: ['Agentic AI', 'Workflow Automation', 'RAG', 'Guardrails'],
    year: '',
    pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/case-studies/agentic-workflow-automation-system.pdf',
    gradient: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)',
    detail: {
      headline: 'From Manual Workflow to Agentic AI System',
      subheadline: 'Designing Production-Ready Business Automation',
      summary:
        "I take a messy, manual business process — the kind that's slow, repetitive, and error-prone — and turn it into a production-grade agentic AI system: scoped agents, retrieval-grounded knowledge, fallback logic, human review, and full logging. The deliverable isn't a flashy demo. It's a workflow a team can run every day and trust.",
      lead: 'This use case shows how I do that, using an agentic content-operations engine I designed and built as the worked example.',
      sections: [
        {
          heading: "The problem: a manual process that wouldn't scale",
          blocks: [
            { type: 'text', text: 'The target was a content operation run entirely by hand. Every article moved through the same long chain: research the topic, check what competitors had already covered, build an outline, write a draft, optimize it for search and AI answer engines, fact-check the claims, and format it for publication.' },
            { type: 'text', text: 'That chain had four failure modes baked in:' },
            {
              type: 'bullets',
              items: [
                { title: 'Slow', text: "Multiple people-hours and several handoffs per piece, so output couldn't keep pace with demand." },
                { title: 'Inconsistent', text: 'Voice and quality drifted depending on who picked the task up that day.' },
                { title: 'Error-prone', text: 'Under deadline pressure, unsupported stats and weak claims slipped through to publish.' },
                { title: 'Opaque', text: 'There was no record of why a piece said what it said, or where a given fact came from.' },
              ],
            },
            { type: 'text', text: "The process wasn't broken because the people were bad at it. It was broken because it was fully manual and unstructured — exactly the kind of work an agentic system handles well, as long as it's engineered for reliability instead of novelty." },
          ],
        },
        {
          heading: 'My role',
          blocks: [
            { type: 'text', text: 'I owned the work end to end, from the business conversation to the running system:' },
            {
              type: 'bullets',
              items: [
                { title: 'Discovery', text: 'Interviewed the people doing the work, watched the actual process, and separated "what looks automatable" from "what is genuinely worth automating."' },
                { title: 'Workflow mapping', text: 'Decomposed the process into discrete, testable tasks and identified the handoff points where quality was being lost.' },
                { title: 'AI architecture', text: 'Designed the agent roster, the knowledge-retrieval layer, the orchestration order, and the guardrails.' },
                { title: 'Execution', text: 'Built, wired, and tested the pipeline against real inputs, not toy prompts.' },
                { title: 'Communication', text: 'Translated the system back to non-technical stakeholders in terms of throughput, risk, and control, so they trusted what it did and knew where humans stayed in the loop.' },
              ],
            },
          ],
        },
        {
          heading: 'System design: how the pipeline actually works',
          blocks: [
            { type: 'text', text: 'The architecture follows one principle: a single model is not a system. Reliability comes from breaking the job into specialized agents, grounding each one in real knowledge, and forcing the output through review before anything ships.' },
            { type: 'text', text: 'The flow:' },
            {
              type: 'bullets',
              items: [
                { title: '1. User input', text: 'A topic, prompt, or business request enters the system.' },
                { title: '2. Intent detection', text: 'The orchestrator routes the request to the right workflow (e.g. long-form article vs. social post) and decides which optional stages to switch on.' },
                { title: '3. Knowledge retrieval (RAG)', text: "The system pulls from three grounded sources: the brand's own uploaded documents (for voice and first-party facts), scraped competitor content (to find gaps, never to copy), and an internal optimization rulebook." },
                { title: '4. Specialist agents, run in order', text: 'Each agent has one job and a strict prompt. Researcher: gathers verifiable facts and the real questions people ask. Planner: converts research into a structured, answer-first outline. Writer: drafts strictly from the outline, citing every grounded claim. Optimizer: refines for answer clarity and snippet potential without changing the voice. Editor: produces the clean, publish-ready output.' },
                { title: '5. Action', text: 'The finished artifact is assembled with inline citations resolved.' },
                { title: '6. Human handoff + logging', text: 'A QA gate checks compliance and accuracy, citations are recorded as an audit trail, and a human reviews before publish.' },
              ],
            },
            { type: 'text', text: 'Each stage is independent and observable, so a weak step can be caught, retried, or escalated — instead of quietly corrupting the final result.' },
          ],
        },
        {
          heading: 'Business impact',
          blocks: [
            {
              type: 'table',
              columns: ['KPI', 'Before Automation', 'After Agentic Workflow'],
              rows: [
                ['Response time', '2–6 hours', '<1 minute'],
                ['Manual processing time', '15–30 min/request', '3–5 min review/request'],
                ['Weekly throughput', '20–40 requests/week', '100–200 requests/week'],
                ['Repetitive workload', 'Fully manual', '60–70% automated'],
                ['Knowledge retrieval', '10–20 min/manual lookup', '<1 min RAG-based retrieval'],
                ['Process visibility', 'Scattered across chats/docs', 'Centralized logs + handoff trail'],
                ['Escalation', 'Informal/manual', 'Human handoff with context summary'],
                ['Risk control', 'No standard fallback', 'Fallback + human review + audit trail'],
              ],
            },
            { type: 'text', text: 'Beyond the numbers, the system changed how the work felt: the team stopped doing repetitive first-draft labor and moved to review and judgment — the part humans are actually good at. Process visibility went from "ask whoever wrote it" to a logged, inspectable trail for every output.' },
          ],
        },
        {
          heading: 'Responsible AI layer',
          blocks: [
            { type: 'text', text: 'This is the part that separates a production system from a demo. The pipeline is built so that AI proposes; humans and guardrails dispose.' },
            {
              type: 'bullets',
              items: [
                { title: 'No hallucinated decisions', text: 'Agents are prohibited from inventing stats, sources, quotes, or URLs. When information is missing, the system states the uncertainty instead of guessing.' },
                { title: 'Grounded citations', text: 'Every factual claim is traced back to a real retrieved source, producing an audit trail rather than an unaccountable blob of text.' },
                { title: 'Fallback logic', text: 'Transient failures (rate limits, service errors) trigger a single clean retry on a backup path. A weak research step is re-run, then degraded to a deterministic structured fallback — so the pipeline always has something concrete to work from and never ships an apology.' },
                { title: 'Failure isolation', text: 'Optional external stages (competitor scraping, document retrieval) are wrapped so that if one fails, it drops out gracefully and the run continues. One flaky service never crashes the whole job.' },
                { title: 'Human review + logging', text: 'A QA stage checks compliance and accuracy before anything reaches a person, and all activity is logged so failures degrade to warnings — observability never breaks generation.' },
              ],
            },
          ],
        },
        {
          heading: 'What this demonstrates',
          blocks: [
            { type: 'text', text: "This is the core forward-deployed skill set in one project: walk into an unstructured business environment, find the process that's actually worth automating, decompose it into reliable agentic steps, ground it in real knowledge, wrap it in guardrails and fallbacks, keep a human in the loop, and ship something the business can depend on." },
            { type: 'text', text: 'It\'s the difference between "AI can probably do this" and "here is the working system that does this, and here is exactly how it stays trustworthy."' },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    number: '02',
    slug: 'rag-business-knowledge-assistant',
    category: 'RAG & Knowledge',
    title: 'RAG-Based',
    subtitle: 'Business Knowledge Assistant',
    description:
      "An AI assistant that answers from a business's own documents (services, FAQs, workflows) rather than generic replies. It cites each source, captures leads inside the conversation, and escalates to a human when it should.",
    tags: ['RAG', 'Knowledge Base', 'Lead Capture', 'Citations'],
    year: '',
    pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/case-studies/rag-business-knowledge-assistant.pdf',
    gradient: 'linear-gradient(135deg, rgba(100,150,255,0.06) 0%, transparent 60%)',
    detail: {
      headline: 'Retrieval-Augmented AI Assistant',
      subheadline: 'For Business Knowledge, Lead Capture, and Client Support',
      summary:
        "I built an AI assistant that answers questions from a business's own documents — its services, FAQs, and workflows — instead of generating generic, unverifiable replies. It cites where each answer came from, captures leads in the conversation, and hands off to a human when it should. The result is a website assistant that reduces repetitive support, improves client experience, and quietly supports sales.",
      lead: 'This use case uses the Teeny Tech Trek website assistant I designed and built as the worked example.',
      sections: [
        {
          heading: "The problem: generic chatbots don't know your business",
          blocks: [
            { type: 'text', text: "Most off-the-shelf chatbots have a fundamental flaw for business use: they answer from general training data, not from your company's reality. That produces three problems:" },
            {
              type: 'bullets',
              items: [
                { title: 'Wrong or vague answers', text: 'A generic model guesses at your pricing, services, or process, and gets them subtly wrong.' },
                { title: 'No accountability', text: "There's no way to tell whether an answer is grounded in real company information or invented on the spot." },
                { title: 'Wasted intent', text: 'Visitors with real buying questions get a dead end instead of being captured as a lead or routed to a person.' },
              ],
            },
            { type: 'text', text: "A business doesn't need a chatbot that sounds helpful. It needs one that gives accurate answers from its own knowledge — and knows what to do when it can't." },
          ],
        },
        {
          heading: 'The solution: a RAG assistant grounded in company knowledge',
          blocks: [
            { type: 'text', text: "I built a Retrieval-Augmented Generation (RAG) assistant: instead of relying on the model's memory, every answer is grounded in the company's actual documents, retrieved at the moment of the question." },
            { type: 'text', text: 'The retrieval flow:' },
            {
              type: 'bullets',
              items: [
                { title: '1. Ingest', text: "The company's knowledge — services, FAQs, process docs, and policies — is ingested and split into clean, retrievable chunks." },
                { title: '2. Embed', text: 'Each chunk is embedded into a vector store so meaning, not just keywords, can be searched.' },
                { title: '3. Retrieve', text: 'On every question, the query is embedded, the most relevant chunks above a similarity threshold are retrieved, and only those are fed into the model as grounding context.' },
                { title: '4. Answer', text: "The model answers from that context, cites the source, and — critically — declines or escalates when the knowledge base doesn't cover the question instead of inventing an answer." },
              ],
            },
            { type: 'text', text: 'This turns "a chatbot that talks about your business" into "a chatbot that answers as your business, from its real documents."' },
          ],
        },
        {
          heading: 'Features',
          blocks: [
            {
              type: 'bullets',
              items: [
                { title: 'Document-based answers', text: "Responses are grounded in the company's own content, not the model's general knowledge." },
                { title: 'Citation-backed responses', text: "Answers point back to the source they came from, so they're verifiable rather than opaque." },
                { title: 'Lead capture', text: 'When a visitor shows buying intent, the assistant collects their details inside the conversation and logs the lead, turning traffic into pipeline.' },
                { title: 'Escalation / human handoff', text: 'Out-of-scope, high-stakes, or low-confidence questions are routed to a human instead of being guessed at.' },
                { title: 'Admin updates', text: "When the business changes its services or FAQs, the knowledge base is updated and the assistant's answers update with it — no retraining, no redeploy." },
              ],
            },
          ],
        },
        {
          heading: 'Strategic angle: why a business cares',
          blocks: [
            { type: 'text', text: "This isn't a tech demo — it's an operational asset that moves three business levers at once:" },
            {
              type: 'bullets',
              items: [
                { title: 'Better client experience', text: "Visitors get accurate, instant answers 24/7, in the company's own voice, with the source attached." },
                { title: 'Less repetitive support', text: 'The assistant absorbs the common, answerable questions that previously consumed staff time, freeing people for the cases that actually need them.' },
                { title: 'Sales support', text: 'Instead of letting interested visitors leave, the assistant captures intent as it happens and routes warm leads to the right place.' },
              ],
            },
          ],
        },
        {
          heading: 'Business impact',
          blocks: [
            {
              type: 'table',
              columns: ['Metric', 'Before Assistant', 'After RAG Assistant'],
              rows: [
                ['Repetitive query handling', '100% manual', '~60–70% AI-assisted deflection'],
                ['Response availability', 'Business hours only', '24/7 instant response'],
                ['First response time', '2–6 hours / next business day', 'Under 1 minute'],
                ['Knowledge retrieval', 'Manual lookup across website/docs', 'RAG-based retrieval from approved content'],
                ['Lead capture', 'None or scattered', 'Structured lead capture with conversation context'],
                ['Answer reliability', 'Depended on memory or manual response', 'Answers grounded in business content'],
                ['Accountability', 'No source trail', 'Source-cited responses and conversation logs'],
                ['Escalation', 'Informal/manual', 'Human handoff with summary and next step'],
              ],
            },
          ],
        },
        {
          heading: "Technical angle: how it's actually engineered",
          blocks: [
            { type: 'text', text: 'For a technical reviewer, the substance is in the retrieval design and the guardrails — not the model choice.' },
            {
              type: 'bullets',
              items: [
                { title: 'Embeddings + vector search', text: 'Knowledge is chunked and embedded so retrieval matches on meaning. Chunk size and overlap are tuned so retrieved context is complete but not noisy.' },
                { title: 'Retrieval flow', text: "Top-k retrieval with a similarity threshold means thin or irrelevant matches don't get forced into the prompt — the assistant would rather escalate than answer from weak context." },
                { title: 'Prompt design', text: "The system prompt constrains the model to answer only from retrieved context, cite its source, and explicitly say when it doesn't know — the single most important instruction for trust." },
                { title: 'Guardrails', text: 'No-hallucination grounding, citation requirements, a confidence/coverage check before answering, and a clear escalation path for anything out of scope.' },
                { title: 'Evaluation', text: 'Quality is measured on two axes: retrieval (did we fetch the right chunks?) and answer (is the response grounded, accurate, and properly escalated when it should be?) — tested against real questions, not just happy-path demos.' },
              ],
            },
          ],
        },
        {
          heading: 'What this demonstrates',
          blocks: [
            { type: 'text', text: "This use case sits at the intersection recruiters look for: AI implementation + a clear business case + product thinking. It shows I can take a company's scattered knowledge, turn it into a grounded retrieval system, wrap it in guardrails that keep it trustworthy, and ship it as something that demonstrably improves client experience, cuts support load, and feeds the sales pipeline." },
            { type: 'text', text: 'It\'s understandable to a non-technical hiring team in one sentence — "it answers customers accurately from your own documents and captures leads" — and holds up to a technical one on retrieval design, prompting, and evaluation.' },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    number: '03',
    slug: 'real-estate-intelligence-dashboard',
    category: 'AI Analytics',
    title: 'Real Estate',
    subtitle: 'Intelligence Dashboard',
    description:
      "A decision-support product that turns raw property data into market intelligence. A structured data layer stays the source of truth while an AI layer adds natural-language search, RAG over listings and reports, on-demand summaries, and comparable analysis.",
    tags: ['Market Intelligence', 'NL Search', 'RAG', 'Comparables'],
    year: '',
    pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/case-studies/real-estate-intelligence-dashboard.pdf',
    gradient: 'linear-gradient(135deg, rgba(150,100,255,0.05) 0%, transparent 60%)',
    detail: {
      headline: 'AI-Powered Real Estate Intelligence Dashboard',
      subheadline: 'Turning Property Data into Market Insights',
      summary:
        'I built a decision-support product that turns raw property data into market intelligence. It combines structured listings, filters, and reports with an AI layer that lets a user ask questions in plain language, pull comparable properties, and generate summaries on demand. It isn\'t "a dashboard with charts" — it\'s a tool that answers the questions property teams actually ask, faster than manual research can.',
      lead: 'This use case uses the real estate intelligence dashboard I scoped, designed, and delivered as the worked example.',
      sections: [
        {
          heading: 'The problem: property teams are data-rich but insight-poor',
          blocks: [
            { type: 'text', text: 'Property teams sit on plenty of data and still spend hours turning it into answers. The work that slows them down:' },
            {
              type: 'bullets',
              items: [
                { title: 'Slow market analysis', text: 'Pulling, filtering, and cross-referencing listings by hand before any insight appears.' },
                { title: 'Painful comparables', text: 'Finding genuinely comparable properties means manual filtering across location, size, price, and type.' },
                { title: 'Unsearchable intelligence', text: 'Past reports and listing notes live in files nobody can query, so knowledge is re-derived instead of reused.' },
                { title: 'Repetitive reporting', text: 'The same summaries get rebuilt from scratch for every stakeholder.' },
              ],
            },
            { type: 'text', text: "The core problem isn't a lack of data. It's that getting from data to a decision is manual, slow, and doesn't scale — exactly where an AI layer earns its place." },
          ],
        },
        {
          heading: 'The solution: a dashboard that doubles as an analyst',
          blocks: [
            { type: 'text', text: 'I built the product in two layers that work together:' },
            {
              type: 'bullets',
              items: [
                { title: 'A structured intelligence layer', text: 'Clean property data with filters, comparison views, and reports, so the numbers are reliable and explorable.' },
                { title: 'An AI decision-support layer on top', text: 'Natural-language search and on-demand insight generation, so a user can ask instead of manually assemble.' },
              ],
            },
            { type: 'text', text: "The design principle: the structured data is the source of truth; the AI is the interface to it. AI never makes up a number — it retrieves, filters, summarizes, and compares what's actually in the data." },
          ],
        },
        {
          heading: 'The AI layer',
          blocks: [
            { type: 'text', text: 'This is what moves it from "dashboard" to "intelligence product":' },
            {
              type: 'bullets',
              items: [
                { title: 'Natural-language query', text: 'A user asks "show me 3-bed properties under [price] in [area] that sold this quarter" in plain English, and the system translates that into the right filtered query.' },
                { title: 'RAG over listings and reports', text: 'Past reports, listing notes, and market documents are retrieved and used to ground answers, making previously unsearchable knowledge queryable.' },
                { title: 'Summary generation', text: 'Instead of building a market summary by hand, the user gets a generated, data-grounded summary on demand.' },
                { title: 'Comparable analysis', text: "The system surfaces genuinely comparable properties and explains why they're comparable, turning a manual filtering chore into an instant answer." },
              ],
            },
            { type: 'text', text: 'Every AI output is grounded in the structured data or retrieved documents — never invented — so the insight is trustworthy enough to act on.' },
          ],
        },
        {
          heading: 'The management angle: how it was delivered',
          blocks: [
            { type: 'text', text: 'This was a product to ship, not just a model to build — so the delivery discipline mattered as much as the AI:' },
            {
              type: 'bullets',
              items: [
                { title: 'Stakeholder requirements', text: 'Started by separating what property teams said they wanted from the decisions they actually needed to make faster.' },
                { title: 'MVP scoping', text: 'Shipped the high-value core first (structured data + filters + natural-language query) before layering on generated summaries and comparable analysis.' },
                { title: 'Product roadmap', text: 'Sequenced features by value and effort, so each release was independently useful rather than waiting on a "big bang."' },
                { title: 'Delivery tradeoffs', text: 'Made explicit calls on data coverage, AI scope, and accuracy guardrails, balancing speed to value against trust in the output.' },
              ],
            },
          ],
        },
        {
          heading: 'Business value',
          blocks: [
            {
              type: 'table',
              columns: ['Metric', 'Before Dashboard', 'After AI Intelligence Dashboard'],
              rows: [
                ['Market research time', '2–4 hours', 'Under 5 minutes'],
                ['Property query speed', 'Manual lookup', '<400ms indexed query response'],
                ['Property data coverage', 'Fragmented files', '800K+ centralized property records'],
                ['Comparable analysis', 'Manual filtering', 'Instantly surfaced and explained'],
                ['Data reliability', 'Inconsistent validation', '~99.8% data integrity'],
                ['Report creation', 'Built from scratch', 'Generated on demand'],
                ['Past intelligence', 'Locked in files', 'Searchable and reusable'],
              ],
            },
            { type: 'text', text: 'Beyond the time saved, the real shift is in decision quality: faster research and reusable intelligence mean property teams make better-informed calls with less manual overhead — and analysts spend their time interpreting insight rather than assembling it.' },
          ],
        },
        {
          heading: 'What this demonstrates',
          blocks: [
            { type: 'text', text: 'This use case shows the full AI-strategy skill set in one product: understanding the data, framing the market-intelligence problem, designing a usable product, and tying every feature back to a business decision. It demonstrates that I can scope an MVP under real constraints, sequence a roadmap, and make tradeoffs — while keeping the AI layer grounded and trustworthy.' },
            { type: 'text', text: 'It reads cleanly as what it is: an AI decision-support product, not a dashboard with a chatbot bolted on.' },
          ],
        },
      ],
    },
  },
  {
    id: 4,
    number: '04',
    slug: 'multi-agent-content-intelligence-system',
    category: 'Agentic Systems',
    title: 'Multi-Agent',
    subtitle: 'Content Intelligence System',
    description:
      "A multi-agent system that turns a single brief into research-backed, citation-grounded blog and social content. Specialized agents research, plan, write, optimize, and finalize in a controlled sequence, with every claim traced to a real source.",
    tags: ['Multi-Agent', 'Content Pipeline', 'RAG', 'Citations'],
    year: '',
    pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/case-studies/multi-agent-content-intelligence-system.pdf',
    gradient: 'linear-gradient(135deg, rgba(120,220,255,0.06) 0%, transparent 60%)',
    detail: {
      headline: 'Multi-Agent Content Pipeline',
      subheadline: 'From One Brief to Research-Backed Blog and Social Content',
      summary:
        "I built a multi-agent system that turns a single brief into research-backed, citation-grounded content — blog or social — without a human writing each stage by hand. Specialized agents research, plan, write, optimize, and finalize in a controlled sequence, and every factual claim traces back to a real source. It's not a chatbot that drafts text; it's an orchestrated production pipeline with traceability built in.",
      lead: 'This use case uses NeoScript, the agentic content engine I designed and built, as the worked example.',
      sections: [
        {
          heading: 'The problem: content production is a slow chain of manual steps',
          blocks: [
            { type: 'text', text: 'Producing one good piece of content is really five jobs stacked on top of each other — research it, plan it, write it, optimize it, then repurpose it for other channels. Done by hand, that chain is:' },
            {
              type: 'bullets',
              items: [
                { title: 'Slow', text: "Each stage waits on a person, and quality work can't keep pace with demand." },
                { title: 'Inconsistent', text: 'Voice, structure, and rigor drift depending on who picks up each step.' },
                { title: 'Unaccountable', text: "Finished content rarely shows where its facts came from, so claims can't be verified." },
                { title: 'Repetitive', text: 'The same brief gets re-worked from scratch for a blog, then again for social.' },
              ],
            },
            { type: 'text', text: "The bottleneck isn't writing talent. It's that the whole chain is manual and unstructured — the exact shape of the problem that multi-agent orchestration solves, if it's engineered for control and traceability instead of one giant prompt." },
          ],
        },
        {
          heading: 'The solution: specialized agents in a controlled workflow',
          blocks: [
            { type: 'text', text: 'NeoScript breaks the job into scoped agents, each with one responsibility and a strict role, run in a fixed order so the output is predictable rather than improvised:' },
            {
              type: 'bullets',
              items: [
                { title: 'Researcher', text: 'Gathers verifiable facts and the real questions people ask; never invents stats.' },
                { title: 'Planner', text: 'Converts research into a structured, answer-first outline.' },
                { title: 'Writer', text: 'Drafts strictly from the outline and appends a citation marker after every grounded sentence.' },
                { title: 'Optimizer', text: 'Refines for answer clarity and snippet potential without changing the voice.' },
                { title: 'Final Editor', text: 'Produces the clean, publish-ready output and preserves the citations.' },
              ],
            },
            { type: 'text', text: 'The same orchestration adapts to format: for social, the flow swaps in a platform-specific writer (LinkedIn, Twitter/X, or Reddit) and a compliance QA pass — so one brief produces channel-ready output across formats instead of a single blog stuck in one shape.' },
          ],
        },
        {
          heading: 'The differentiator: citation-backed, controlled, and traceable',
          blocks: [
            { type: 'text', text: 'Three things separate this from a basic "write me a blog" prompt:' },
            {
              type: 'bullets',
              items: [
                { title: 'Citation-backed outputs', text: 'The Writer tags each grounded sentence, and a post-processing pass resolves those markers into a clean audit trail — so every factual claim points to the real document it came from. Unsupported markers are dropped, not faked.' },
                { title: 'Controlled workflow', text: 'Agents run in a strict, inspectable order with defined inputs and outputs at each step. Nothing is a black box; a weak stage can be caught and re-run.' },
                { title: 'Grounded knowledge layer', text: "Optional retrieval grounds the content in the brand's own uploaded documents (for voice and first-party facts) and in scraped competitor content (to find gaps, never to copy) — so output sounds like the brand and differentiates from rivals." },
              ],
            },
          ],
        },
        {
          heading: 'Technical architecture',
          blocks: [
            {
              type: 'code',
              text:
                'Brief input\n' +
                '  → Intent / flow detection : blog vs social, which add-ons to enable\n' +
                '  → [Optional] Competitor research : discover → scrape → retrieve gaps\n' +
                '  → [Optional] Brand-document retrieval : RAG, scoped per brand\n' +
                '  → Researcher : verifiable facts + real user questions\n' +
                '  → Planner : answer-first outline, question-led sections\n' +
                '  → Writer : drafts from outline, emits inline citations\n' +
                '  → Optimizer : clarity + snippet optimization, voice preserved\n' +
                '  → Final Editor : publish-ready output, citations preserved\n' +
                '  → Post-process : resolve citations → clean output + source trail',
            },
            { type: 'text', text: 'Two engineering details make it production-grade rather than a happy-path demo:' },
            {
              type: 'bullets',
              items: [
                { title: 'Resilience', text: 'The heavy generation step retries once on a fallback path if it hits a rate limit or service error. A weak research result is re-run, then degraded to a deterministic structured fallback — so the pipeline always has something concrete to write from and never ships an apology.' },
                { title: 'Failure isolation', text: 'Optional external stages (competitor scraping, document retrieval) are wrapped so a failure drops that context and the run continues. One flaky service never crashes the whole job.' },
              ],
            },
          ],
        },
        {
          heading: 'Business angle',
          blocks: [
            {
              type: 'table',
              columns: ['Lever', 'Before', 'After'],
              rows: [
                ['Time per content package', '~4–6 people-hours across research, outline, writing, editing, and repurposing', '~30–45 minutes of human review after AI-generated draft package'],
                ['Research time', '~60–90 minutes of manual search and note-taking', '~5–10 minutes to enter brief, define angle, and review retrieved sources'],
                ['First draft creation', '~2–3 hours for a structured long-form draft', '~10–15 minutes for AI-generated first draft'],
                ['Content velocity', '~1–2 complete content packages/week', '~5–8 AI-assisted content packages/week'],
                ['Repurposing', 'Rebuilt separately for each channel', 'One brief → long-form blog + 3–5 short-form social posts'],
                ['Source control', 'Sources scattered across tabs, notes, or not tracked', 'Every major claim linked to a source or research note'],
                ['Quality consistency', 'Drifted by writer, mood, or deadline pressure', 'Held to one workflow: research → plan → write → optimize → QA'],
                ['Review process', 'Manual editing without a fixed checklist', 'Human QA gate for accuracy, tone, structure, and source alignment'],
                ['Reusability', 'Each output treated as a one-off asset', 'Briefs, sources, outlines, and outputs reusable for future campaigns'],
              ],
            },
            { type: 'text', text: 'The deeper shift is in where humans spend their time: the team stops doing repetitive first-draft labor across five stages and moves to review and judgment on grounded, structured output.' },
          ],
        },
        {
          heading: 'What this demonstrates',
          blocks: [
            { type: 'text', text: 'This is a step beyond a single-prompt chatbot. It shows agent orchestration (multiple scoped agents in a controlled sequence), workflow design (predictable inputs and outputs, with resilience and failure isolation), traceability (citation-backed, auditable claims), and real productivity impact (more output, consistent quality, less manual effort).' },
            { type: 'text', text: "For a forward-deployed or AI product role, it's the proof that I can design a multi-agent system that's not just clever — it's controlled, accountable, and something a team can actually run." },
          ],
        },
      ],
    },
  },
  {
    id: 5,
    number: '05',
    slug: 'responsible-ai-governance-framework',
    category: 'Responsible AI',
    title: 'Responsible AI',
    subtitle: 'Governance & Evaluation Framework',
    description:
      "A practical framework for deploying AI agents safely: risk classification, data-sensitivity mapping, hallucination controls, human-in-the-loop checkpoints, audit logs and fallbacks, plus an evaluation layer that proves behavior before shipping.",
    tags: ['Responsible AI', 'Risk & Guardrails', 'Evaluation', 'Human Oversight'],
    year: '',
    pdfUrl: 'https://arbgtqtruugewk5g.public.blob.vercel-storage.com/case-studies/responsible-ai-governance-framework.pdf',
    gradient: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)',
    detail: {
      headline: 'Responsible AI Framework for Agentic Workflows',
      subheadline: 'Risk, Evaluation, Guardrails, and Human Oversight',
      summary:
        "I built a practical framework for deploying AI agents safely — one that classifies risk, controls for hallucination and data sensitivity, defines where a human must stay in the loop, and proves the system behaves before it ships. It's not a policy document. It's the set of controls I apply to my own agentic builds so they're accountable, auditable, and enterprise-ready.",
      lead: "This use case shows the framework and how it's applied across real agentic systems I've built.",
      sections: [
        {
          heading: 'The problem: companies are deploying AI agents without controls',
          blocks: [
            { type: 'text', text: 'AI agents are being adopted fast — and often without the risk controls that other production software takes for granted. The result is predictable:' },
            {
              type: 'bullets',
              items: [
                { title: 'Unmanaged hallucination risk', text: 'Agents state invented facts with full confidence, and nobody can tell which outputs are grounded.' },
                { title: 'Unclear data exposure', text: "Sensitive information flows into prompts and tools with no classification of what's allowed where." },
                { title: 'No human checkpoints', text: 'Agents take or recommend actions with no defined point where a person reviews.' },
                { title: 'No audit trail', text: "When something goes wrong, there's no record of why the agent did what it did." },
              ],
            },
            { type: 'text', text: "The gap isn't capability. It's that adoption is racing ahead of accountability — and a single ungoverned agent decision can become a compliance, trust, or safety incident." },
          ],
        },
        {
          heading: 'The framework: controls before, during, and after',
          blocks: [
            { type: 'text', text: 'I structure governance around five controls that wrap any agentic workflow:' },
            {
              type: 'bullets',
              items: [
                { title: 'Risk classification', text: "Every agent action is rated by impact (informational vs. consequential) and reversibility. High-impact or irreversible actions get stricter oversight and can't run autonomously." },
                { title: 'Data sensitivity mapping', text: "Inputs and knowledge sources are classified (public / internal / sensitive), and retrieval and tool access are scoped so the wrong data never reaches the wrong context — and one tenant's data never leaks into another's." },
                { title: 'Hallucination risk controls', text: 'Agents are constrained to answer from retrieved, grounded context; required to cite sources; and required to state uncertainty or decline rather than guess. Unsupported claims are dropped, not shipped.' },
                { title: 'Human-in-the-loop points', text: 'Explicit checkpoints are defined where a person must review or approve — placed by risk class, so low-stakes outputs flow and high-stakes ones stop for a human.' },
                { title: 'Audit logs + fallback paths', text: 'Every run is logged for traceability, and every external dependency has a defined fallback so failures degrade gracefully instead of producing silent, wrong, or crashed outputs.' },
              ],
            },
          ],
        },
        {
          heading: 'The evaluation layer: prove it behaves before it ships',
          blocks: [
            { type: 'text', text: "Guardrails are claimed until they're tested. The framework includes an evaluation layer that treats agent behavior like any other production system:" },
            {
              type: 'bullets',
              items: [
                { title: 'Test cases', text: 'Representative real queries, not happy-path demos, covering the range of intended use.' },
                { title: 'Success criteria', text: "Explicit, measurable standards: grounded in source, accurate, correctly escalated when out of scope, within scope of the agent's role." },
                { title: 'Failure scenarios', text: 'Deliberate probes for the dangerous modes: hallucination under pressure, out-of-scope requests, missing-knowledge cases, and prompt-injection or off-task drift.' },
                { title: 'Model behavior checks', text: 'Verifying the agent declines when it should, stays in role, respects data boundaries, and triggers human handoff at the defined checkpoints.' },
              ],
            },
            { type: 'text', text: "The bar is simple: an agent doesn't ship until it passes the failure scenarios, not just the easy ones." },
          ],
        },
        {
          heading: 'Applied, not theoretical',
          blocks: [
            { type: 'text', text: "This framework isn't a slide deck — it's the discipline behind the agentic systems I've built. In practice that looks like: a multi-agent content pipeline where every factual claim resolves to a real source and the run is logged end to end; a retrieval assistant that answers only from grounded company documents, cites them, and escalates rather than guesses; and resilience patterns where a failed dependency drops its context and the system continues instead of crashing." },
            { type: 'text', text: "In other words, the controls described above are ones I've implemented and tested, not just specified." },
          ],
        },
        {
          heading: 'Business value',
          blocks: [
            {
              type: 'table',
              columns: ['Outcome', 'What it delivers'],
              rows: [
                ['Safer deployment', 'Risk-rated actions and tested failure modes reduce the chance of a harmful or wrong output reaching production'],
                ['Stakeholder trust', 'Citations, audit logs, and clear human checkpoints make agent behavior explainable and defensible'],
                ['Compliance readiness', 'Data classification, traceability, and oversight align agentic AI with the controls enterprises already require'],
                ['Better adoption', 'When a system is demonstrably safe and accountable, organizations actually deploy it instead of stalling in pilot'],
              ],
            },
            { type: 'text', text: "The throughline: governance isn't a brake on adoption — it's what makes adoption possible in environments that care about risk." },
          ],
        },
        {
          heading: 'What this demonstrates',
          blocks: [
            { type: 'text', text: "This use case is the differentiator from a pure developer profile. It shows I'm an applied AI builder who also understands governance — someone who can ship an agentic system and reason about its risk, evaluation, accountability, and enterprise readiness." },
            { type: 'text', text: 'For Responsible AI, AI Strategy, and consulting roles, that\'s the whole point: I think beyond "build the bot" and into risk, adoption, and accountability — and I\'ve built the systems that prove I can do both.' },
          ],
        },
      ],
    },
  },
  {
    id: 6,
    number: '06',
    slug: 'transfer-learning-image-classification',
    category: 'Deep Learning',
    title: 'Transfer Learning',
    subtitle: 'Image Classification with Xception',
    description:
      "An image classifier reaching 91%+ validation accuracy by reusing Xception's ImageNet features instead of training 132 layers from scratch. A disciplined two-phase schedule — freeze the base, then fine-tune gently — delivers a strong result on only 3,670 images.",
    tags: ['Transfer Learning', 'Computer Vision', 'Fine-Tuning', 'TensorFlow'],
    year: '',
    // TODO: source and attach the actual PDF for this case study
    pdfUrl: null,
    gradient: 'linear-gradient(135deg, rgba(100,220,180,0.06) 0%, transparent 60%)',
    detail: {
      headline: 'Transfer Learning for Image Classification',
      subheadline: 'Reaching 91% Accuracy Without Training From Scratch',
      summary:
        "I built an image classifier that reaches 91%+ validation accuracy by standing on top of a network someone else already trained. Instead of training 132 convolutional layers from zero — which is compute-hungry, data-hungry, and environmentally expensive — I reused Xception's ImageNet features and retrained only a small custom head, then fine-tuned the whole network with a disciplined two-phase strategy. The project is a practical demonstration of the single most cost-effective technique in applied deep learning: don't start from scratch when you don't have to.",
      lead: 'This use case uses the Transfer Learning image classifier I built for Deep Learning 2 as the worked example.',
      sections: [
        {
          heading: 'The problem: training from scratch rarely makes sense',
          blocks: [
            { type: 'text', text: 'Most real-world image problems share two constraints that make training a deep network from scratch a poor choice:' },
            {
              type: 'bullets',
              items: [
                { title: 'Data is scarce', text: 'Labeled images are expensive to collect. Training a 132-layer network from zero needs far more data than most teams actually have.' },
                { title: 'Compute is expensive — and so is the carbon', text: 'Training a large vision model from scratch is enough compute to emit CO₂ on the order of several car lifetimes. That cost is hard to justify when a solved version of the same feature extractor already exists.' },
              ],
            },
            { type: 'text', text: "The core insight: the early and middle layers of a vision model learn general visual features — edges, textures, shapes — that transfer across tasks. A model trained on ImageNet's 1,000 classes already knows how to see; it just needs to be taught what to call things in a new domain. Transfer learning exploits exactly that." },
          ],
        },
        {
          heading: 'The approach: Xception base + custom head, trained in two phases',
          blocks: [
            { type: 'text', text: 'I took Xception pretrained on ImageNet, stripped its original 1,000-class classification head (include_top=False), and attached a new head sized to the target task:' },
            {
              type: 'code',
              text:
                '┌──────────────────────────────────────────────┐\n' +
                '│  Xception base — 132 layers                  │\n' +
                '│  Pre-trained on ImageNet (1000 classes)      │\n' +
                '│  include_top = False                         │\n' +
                '└──────────────────────┬───────────────────────┘\n' +
                '                       │\n' +
                '                       ▼\n' +
                '  GlobalAveragePooling2D       reduces each feature map to a single value\n' +
                '                       ▼\n' +
                '  Dense(n_classes, softmax)    new task-specific classification head',
            },
            { type: 'text', text: 'The training itself is where the real discipline lives — a two-phase schedule designed to avoid catastrophic forgetting:' },
            {
              type: 'bullets',
              items: [
                { title: 'Phase 1 — freeze the base', text: 'Every Xception layer is frozen; only the new head trains. I use a deliberately high learning rate (SGD, lr = 0.2, momentum = 0.9) for 16 epochs, because only two new layers are learning and I want the head to converge fast. The pretrained features stay untouched.' },
                { title: 'Phase 2 — unfreeze and fine-tune gently', text: 'All layers are unfrozen and the full network trains at a much lower learning rate (SGD, lr = 0.01, momentum = 0.9) for 8 epochs. The low rate is the whole point: it lets the network adapt ImageNet features to the new domain without overwriting — catastrophically forgetting — what it already knows.' },
              ],
            },
            { type: 'text', text: 'Inputs were resized to 224×224 and passed through xception.preprocess_input (scaling pixels to the [-1, 1] range Xception expects), then batched, shuffled, and prefetched via tf.data.' },
          ],
        },
        {
          heading: 'Datasets',
          blocks: [
            {
              type: 'table',
              columns: ['', 'tf_flowers', 'cars196'],
              rows: [
                ['Source', 'TensorFlow Datasets', 'Stanford Cars (TFDS)'],
                ['Images', '3,670', '16,185'],
                ['Classes', '5 (daisy, dandelion, rose, sunflower, tulip)', '196 (make + model + year)'],
                ['Split', '75 / 15 / 10', '~50 / 50'],
              ],
            },
            { type: 'text', text: 'tf_flowers was the primary, fully validated task. cars196 was a stretch extension to a far harder 196-class problem.' },
          ],
        },
        {
          heading: 'Results',
          blocks: [
            {
              type: 'table',
              columns: ['Dataset', 'After Phase 1 (frozen)', 'After Phase 2 (fine-tuned)', 'Gain'],
              rows: [
                ['Flowers', '~86%', '~91%', '+5%'],
              ],
            },
            { type: 'text', text: "The flowers curves tell the story cleanly. In Phase 1, training accuracy shoots up almost immediately (Xception's features are that good) while validation plateaus near 86% — the base isn't adapting yet. In Phase 2, unfreezing the network and fine-tuning at a low learning rate lifts validation accuracy to ~91% and holds it there. Reaching 91% on only 3,670 images is the headline result: it is direct evidence of how much feature reuse buys you on small data." },
          ],
        },
        {
          heading: 'Key engineering decisions',
          blocks: [
            {
              type: 'table',
              columns: ['Decision', 'Reasoning'],
              rows: [
                ['High LR (0.2) in Phase 1', 'Only the new head is training — fast convergence is safe and desirable'],
                ['Low LR (0.01) in Phase 2', 'Preserve ImageNet weights; gentle adaptation prevents catastrophic forgetting'],
                ['include_top=False', "Discard ImageNet's 1,000-class head, keep the deep feature extractor"],
                ['GlobalAveragePooling2D', 'Reduce spatial maps to a compact vector — standard, robust transfer-learning head'],
                ['Two-phase schedule', 'Freeze-then-fine-tune is the core recipe that makes fine-tuning stable'],
                ['sparse_categorical_crossentropy', 'Integer labels used directly, no one-hot encoding'],
              ],
            },
          ],
        },
        {
          heading: 'Engineering honesty: the cars196 extension',
          blocks: [
            { type: 'text', text: 'The cars196 extension is included deliberately, because how you handle your own mistakes is part of the work.' },
            { type: 'text', text: 'While extending the pipeline to the 196-class car dataset, I found and documented two real bugs in the notebook: one cell loaded the tf_flowers split instead of cars196, and the classification head was sized to 5 classes (flowers) instead of 196 (cars). The consequence is that the reported "cars" numbers were actually measured on flower data — so I do not present them as a validated 196-class car-classification result. I diagnosed both issues, wrote them up transparently, and specified the exact fixes.' },
            { type: 'text', text: "I keep this in the case study on purpose. The flowers result (91%) is the legitimate, headline outcome. The cars extension demonstrates something equally important for production work: I audit my own pipeline, catch data-loading and shape bugs, and report what the numbers actually mean rather than what I'd like them to mean. That habit — honest reporting over flattering reporting — is the same discipline that runs through the rest of my portfolio." },
          ],
        },
        {
          heading: 'Mathematical concepts demonstrated',
          blocks: [
            {
              type: 'table',
              columns: ['Concept', 'Role in the project'],
              rows: [
                ['Depthwise separable convolutions', 'The core of Xception — factorized convolutions for efficiency'],
                ['Transfer learning', 'Reuse ImageNet feature representations to minimize labeled-data needs'],
                ['Fine-tuning', 'Unfreeze pretrained weights and continue training at a low learning rate'],
                ['Catastrophic forgetting', 'The failure mode the two-phase schedule is designed to prevent'],
                ['Global average pooling', 'Spatial reduction to a per-channel mean vector'],
                ['SGD with momentum', 'Gradient descent with velocity for stable convergence'],
                ['Softmax + categorical crossentropy', 'Multi-class probability output and its matching log-loss'],
              ],
            },
          ],
        },
        {
          heading: 'What this demonstrates',
          blocks: [
            { type: 'text', text: 'This project is the applied-vision counterpart to the fundamentals in my portfolio. It shows I understand why transfer learning works — general features in the base, task-specific learning in the head — and that I can execute the fine-tuning discipline (freeze, unfreeze, learning-rate control) that separates a model that improves from one that quietly destroys its own pretrained knowledge.' },
            { type: 'text', text: 'Just as importantly, it shows engineering maturity: I made an explicit cost/carbon argument for the approach, delivered a strong validated result on the primary task, and handled a flawed extension by diagnosing, documenting, and correctly scoping it rather than overclaiming. That combination — sound technique plus honest reporting — is exactly what makes applied ML work trustworthy.' },
          ],
        },
      ],
      contextNote: 'Context: Deep Learning 2, George Brown College. Built with tensorflow / keras, tensorflow_datasets, and tf.keras.applications.Xception, trained on Google Colab. Paired course project.',
    },
  },
  {
    id: 7,
    number: '07',
    slug: 'shakegen-character-level-language-model',
    category: 'Deep Learning',
    title: 'ShakeGen',
    subtitle: 'Character-Level Language Model',
    description:
      'A character-level recurrent neural network — an embedding layer, a single GRU, and a softmax head, no transformers or pretrained weights — trained on the complete works of Shakespeare to generate original Elizabethan prose and demonstrate how temperature trades coherence against creativity.',
    tags: ['Language Modeling', 'GRU / RNN', 'Temperature Sampling', 'TensorFlow'],
    year: '',
    // TODO: source and attach the actual PDF for this case study
    pdfUrl: null,
    gradient: 'linear-gradient(135deg, rgba(220,150,255,0.05) 0%, transparent 60%)',
    detail: {
      headline: 'Character-Level Language Modeling from Scratch',
      subheadline: 'Teaching a GRU to Write Shakespeare',
      summary:
        'I built a character-level recurrent neural network that learns the structure of Elizabethan English one character at a time and generates original Shakespearean prose — no transformers, no pretrained weights, just an embedding layer, a single GRU, and a softmax head trained on the complete works of Shakespeare. The goal was never a party trick. It was to understand, at the level of the math, how a sequence model represents language and how a single sampling parameter trades coherence against creativity.',
      lead: 'This use case uses ShakeGen, the character-level text generator I built for AASD-4011 (Advanced Mathematics for Deep Learning), as the worked example.',
      sections: [
        {
          heading: 'The problem: understanding sequence models from first principles',
          blocks: [
            { type: 'text', text: 'It\'s easy to call an API and get fluent text back. It\'s much harder to explain why the model produces what it produces — where the "creativity" comes from, why the same model can sound coherent or completely unhinged depending on one number, and how a network with no notion of words learns word structure anyway.' },
            { type: 'text', text: 'That gap matters. Applied AI work sits on top of sequence models, and the people who build reliable systems are the ones who understand the mechanics underneath, not just the interface. This project was a deliberate move to close that gap the hard way: build a language model from the ground up, train it, break it, and observe its behavior directly.' },
            { type: 'text', text: 'The task was concrete: feed the complete works of Shakespeare into a network one character at a time, and get it to hallucinate new, plausible Shakespearean text.' },
          ],
        },
        {
          heading: 'The approach: a minimal character-level RNN',
          blocks: [
            { type: 'text', text: 'The whole system is intentionally small, so that every component is legible:' },
            {
              type: 'code',
              text:
                'Input: integer-encoded character sequence (window = 100 characters)\n' +
                '      ↓\n' +
                'Embedding(vocab_size, 16)        maps each character ID to a 16-dim dense vector\n' +
                '      ↓\n' +
                'GRU(128)                         gated recurrent unit — captures sequential dependencies\n' +
                '      ↓\n' +
                'Dense(39, activation="softmax")  probability distribution over 39 unique characters',
            },
            {
              type: 'bullets',
              items: [
                { title: 'Corpus', text: "the complete works of Shakespeare (Karpathy's char-rnn corpus) — roughly 1.1 million characters, reduced to a vocabulary of 39 unique characters (letters, punctuation, newline)." },
                { title: 'Encoding', text: 'character-level integer mapping via Keras TextVectorization, adapted on the full corpus.' },
                { title: 'Windows', text: '100-character sliding windows with shift = 1, wrapped in a tf.data pipeline (batch, shuffle, prefetch) for dense supervision — every window teaches the model to predict the next character.' },
                { title: 'Objective', text: 'sparse_categorical_crossentropy with the Adam optimizer, so integer labels are used directly with no one-hot encoding.' },
                { title: 'Training', text: '10 epochs, roughly 3.8 hours on CPU (tensorflow-cpu, no GPU).' },
              ],
            },
            { type: 'text', text: 'The design principle: keep the architecture minimal so the behavior is the interesting variable, not the parameter count.' },
          ],
        },
        {
          heading: 'The core idea: temperature sampling — creativity vs. coherence',
          blocks: [
            { type: 'text', text: 'The most instructive part of the project is generation, not training. Once the model outputs a probability distribution over the next character, how you sample from that distribution decides everything about the output\'s character. That control knob is temperature — the logits are divided by the temperature before the softmax, which sharpens or flattens the distribution.' },
            {
              type: 'table',
              columns: ['Temperature', 'Behavior', 'Output style'],
              rows: [
                ['0.01', 'Near-deterministic — almost always picks the most likely next character', 'Repetitive and highly coherent, but boring'],
                ['1.0', 'Balanced — samples in proportion to the learned probabilities', 'Natural-sounding, convincing Shakespearean text'],
                ['100', 'Near-uniform — character choice is almost random', 'Chaotic, "creative," largely incoherent'],
              ],
            },
            { type: 'text', text: 'I ran generation across all three regimes to demonstrate the tradeoff empirically rather than describe it in the abstract. Low temperature is greedy and safe; high temperature is risky and creative; the usable range for convincing fake Shakespeare sits between roughly 0.7 and 1.0. This is the same mechanism that governs sampling in modern LLMs — studied here in a system small enough to reason about completely.' },
          ],
        },
        {
          heading: 'What the exploration surfaced',
          blocks: [
            { type: 'text', text: 'Beyond reproducing a reference implementation, I ran a genuine investigation and documented what I found:' },
            {
              type: 'bullets',
              items: [
                { title: 'Corpus anomalies', text: 'Stray $ and 3 characters appearing in "Shakespeare" text traced back to OCR errors and typos in the digitized source — a reminder that data quality problems are upstream of any model.' },
                { title: 'TextVectorization internals', text: 'I documented adapt(), split, and standardize in detail, since the encoding layer quietly determines the entire vocabulary and how text is tokenized.' },
                { title: 'A real compute constraint', text: 'Full training took over three hours on CPU, so I worked with pretrained weights for the generation experiments — an honest tradeoff, not a hidden shortcut.' },
                { title: 'Temperature experiments', text: 'Systematic generation at 0.01, 1.0, and 100 to show the creativity–coherence curve rather than assert it.' },
              ],
            },
          ],
        },
        {
          heading: 'Results',
          blocks: [
            {
              type: 'table',
              columns: ['Metric', 'Value'],
              rows: [
                ['Training accuracy', '~60%'],
                ['Validation accuracy', '~55%'],
                ['Training time', '~3.8 hours (CPU)'],
                ['Epochs', '10'],
                ['Vocabulary', '39 characters'],
                ['Corpus size', '~1.1M characters'],
              ],
            },
            { type: 'text', text: 'For character-level modeling over a 39-token vocabulary, ~55% next-character accuracy is meaningful — the model has learned character co-occurrence, word structure, and enough Elizabethan syntax to produce recognizably Shakespearean output. Character-level prediction is a genuinely hard target: the model has no concept of words and still reconstructs them from statistics alone.' },
          ],
        },
        {
          heading: 'Key concepts demonstrated',
          blocks: [
            {
              type: 'table',
              columns: ['Concept', 'Application in the project'],
              rows: [
                ['GRU (Gated Recurrent Unit)', 'Update and reset gates selectively retain or forget sequence history'],
                ['Character-level LM', 'Predict the next character from the previous 100'],
                ['Embedding layer', 'Maps discrete character IDs into continuous 16-dim vectors'],
                ['Temperature sampling', 'Scales logits before softmax to control output distribution sharpness'],
                ['Autoregressive generation', 'Feeds each predicted character back as input, one character at a time'],
                ['Sliding-window dataset', 'tf.data pipeline with 100-char windows, shift = 1, for dense supervision'],
                ['Sparse categorical crossentropy', 'Integer-label loss with no one-hot encoding'],
              ],
            },
          ],
        },
        {
          heading: 'What this demonstrates',
          blocks: [
            { type: 'text', text: 'This is the fundamentals layer of my portfolio. The agentic and RAG systems I build sit on top of exactly these mechanics — tokenization, embeddings, sequence modeling, and sampling — and this project is the proof that I understand them from the inside, not just as an API surface.' },
            { type: 'text', text: "It shows I can implement a language model end to end, reason about the math behind its behavior, run a real investigation into its data and its sampling dynamics, and report results honestly, including the constraints. That's the groundwork that makes the applied systems trustworthy: when you understand why temperature controls creativity in a 128-unit GRU, you understand why grounding and sampling discipline matter in a production LLM." },
          ],
        },
      ],
      contextNote: 'Context: AASD-4011 — Advanced Mathematics for Deep Learning, George Brown College (Winter 2023). Reference implementation based on Aurélien Géron, Hands-On Machine Learning (3rd ed.). Built as a paired course project.',
    },
  },
  {
    id: 8,
    number: '08',
    slug: '4d-framework-ai-fluency',
    category: 'AI Fluency',
    title: 'The 4D Framework',
    subtitle: 'AI Fluency Applied to Chatbot Projects',
    description:
      "An internal enablement framework translating Anthropic's AI Fluency course — Delegation, Description, Discernment, Diligence — into shipping practice for chatbots, agents, and SLM fine-tunes: delegation-aware project plans, three-part briefs, a 5-check release pass, and pre-launch and in-production diligence.",
    tags: ['AI Fluency', 'Delegation', 'Discernment', 'Responsible Shipping'],
    year: '',
    // TODO: source and attach the actual PDF for this case study
    pdfUrl: null,
    gradient: 'linear-gradient(135deg, rgba(80,140,255,0.06) 0%, transparent 60%)',
    detail: {
      headline: 'The 4D Framework',
      subheadline: 'Delegation · Description · Discernment · Diligence — Applied to Chatbot Projects',
      summary:
        "An internal enablement deck (Teeny Tech Trek) that takes the Anthropic AI Fluency course from theory to the chatbots, agents, and SLM fine-tunes a team actually ships. Chatbots aren't prompts — they're systems, and 4D is how a team moves from prompt-hacking to systems that survive contact with real users.",
      lead: 'Internal Enablement · Teeny Tech Trek — Delegation · Description · Discernment · Diligence.',
      sections: [
        {
          heading: "What we'll cover",
          blocks: [
            { type: 'text', text: 'Six stops from the Anthropic AI Fluency course to the chatbots, agents, and SLMs we already ship.' },
            {
              type: 'bullets',
              items: [
                { title: '01 Why AI fluency matters', text: "Chatbots aren't prompts — they're systems." },
                { title: '02 The 4D Framework', text: 'Four disciplines for working well with AI.' },
                { title: '03 Applying 4D to a build', text: 'Tasks · delegation · plan.' },
                { title: '04 Description in depth', text: 'Product · Process · Performance.' },
                { title: '05 Effective · Efficient · Ethical · Safe', text: 'The four qualities that compound.' },
                { title: '06 Putting it together', text: 'Loop · takeaways · next steps.' },
              ],
            },
          ],
        },
        {
          heading: 'The gap: chatbots, agents, SLMs — none of them work without all four disciplines',
          blocks: [
            { type: 'text', text: '4D is how Teeny Tech Trek moves from prompt-hacking to systems that survive contact with real users.' },
            {
              type: 'bullets',
              items: [
                { title: '70%+', text: 'of chatbot failures trace to scope, persona, or escalation that no one owned.' },
                { title: '3 of 4', text: 'TTT shipping motions — chatbot, agent, SLM fine-tune — break the same way without 4D.' },
                { title: '4D', text: 'turns "it works in a demo" into "it works on a Tuesday at 2 a.m."' },
              ],
            },
            { type: 'quote', text: 'Owning the system beats handing off the prompt.' },
          ],
        },
        {
          heading: 'Four disciplines for working well with AI',
          blocks: [
            {
              type: 'cards',
              items: [
                { title: '01 Delegation', text: 'Deciding what AI does, what humans do, and where to co-create.' },
                { title: '02 Description', text: 'Clearly specifying Product, Process, and Performance.' },
                { title: '03 Discernment', text: 'Evaluating AI outputs with a critical eye.' },
                { title: '04 Diligence', text: 'Using AI responsibly — verifying, citing, accounting.' },
              ],
            },
            { type: 'text', text: 'Applied at Teeny Tech Trek: client chatbots · custom AI agents · SLM fine-tuning runs · internal tooling. Source: Anthropic AI Fluency Course — Framework Foundations.' },
          ],
        },
        {
          heading: 'D1 · Delegation: what to delegate, what to own',
          blocks: [
            { type: 'text', text: "Delegation is the first decision — before you write a single prompt. For each task, ask: is this human-led, AI-led, or collaborative? The answer shapes prompts, review gates, and where your team's time goes." },
            {
              type: 'bullets',
              items: [
                { title: 'Human-led', text: 'Judgment, ethics, client context, final approvals.' },
                { title: 'AI-led', text: 'Scaffolding, bulk generation, structured transformation, enumeration.' },
                { title: 'Collaborative', text: 'Brainstorming, drafting, debugging, refinement.' },
              ],
            },
          ],
        },
        {
          heading: 'D1 applied · Step 1 — list the work',
          blocks: [
            { type: 'text', text: 'Major tasks in a chatbot or SLM project. Step 1 — list the work. Be specific enough that each task has a clear owner.' },
            {
              type: 'bullets',
              items: [
                { title: '01 Use case & scope', text: 'Support / lead gen / community.' },
                { title: '02 Knowledge base curation', text: 'Docs, FAQs, policies, products.' },
                { title: '03 System prompt engineering', text: 'Persona, tone, guardrails.' },
                { title: '04 RAG pipeline setup', text: 'Chunking, embeddings, retrieval.' },
                { title: '05 Intent & escalation', text: 'When to answer, when to hand off.' },
                { title: '06 UI / widget integration', text: 'WordPress, WhatsApp, web embed.' },
                { title: '07 Testing & red-teaming', text: 'Adversarial prompts, persona drift.' },
                { title: '08 Deployment & monitoring', text: 'Logging, analytics, cost.' },
                { title: '09 Feedback loop', text: 'Transcripts, KB updates, tuning.' },
              ],
            },
          ],
        },
        {
          heading: 'D1 applied · Step 2 — who does what, and why',
          blocks: [
            { type: 'text', text: 'For each task, answer the four questions before committing: Q1 — Capabilities needed? Q2 — Human strengths? Q3 — What AI does well? Q4 — Highest-leverage collab?' },
            {
              type: 'table',
              columns: ['Task', 'Capabilities needed', 'Human strengths', 'What AI does well', 'Highest-leverage collab'],
              rows: [
                ['Use case & scope', 'Client context', 'Stakeholder interviews', 'Summarise discovery', 'Co-writing scope'],
                ['KB curation', 'SME input', 'Judging canonical sources', 'Chunking, tagging', 'Reviewing tags'],
                ['System prompt', 'Brand voice', 'Voice & guardrails', 'Drafting variants', 'Iterating on failures'],
                ['Red-teaming', 'Adversarial mindset', 'Novel attack paths', 'Enumerate known', 'Triage findings'],
                ['Feedback loop', 'Transcript judgment', 'Labelling handoffs', 'Clustering at scale', 'What to re-train'],
              ],
            },
          ],
        },
        {
          heading: 'D1 applied · Step 3 — a delegation-aware project plan',
          blocks: [
            { type: 'text', text: 'Step 3 — every task has a delegation call and a rationale. What a good plan shows:' },
            {
              type: 'bullets',
              items: [
                { title: '1', text: 'Explicit owner per task.' },
                { title: '2', text: 'Delegation type per task.' },
                { title: '3', text: 'One-line rationale per call.' },
              ],
            },
            {
              type: 'table',
              columns: ['Task', 'Duration', 'Delegation'],
              rows: [
                ['Use case & scope', '1w', 'Human-led'],
                ['KB curation', '2w', 'Collaborative'],
                ['System prompt engineering', '2w', 'Collaborative'],
                ['RAG pipeline setup', '2w', 'AI-led'],
                ['Intent & escalation', '1w', 'Collaborative'],
                ['UI / widget integration', '1w', 'AI-led'],
                ['Testing & red-teaming', '2w', 'Human-led'],
                ['Deployment & monitoring', '1w', 'AI-led'],
                ['Feedback loop', '1w', 'Human-led'],
              ],
            },
          ],
        },
        {
          heading: 'D2 · Description: three descriptions make or break the output',
          blocks: [
            {
              type: 'cards',
              items: [
                { title: 'What — Product', text: 'What output do you need? Specific deliverable · format, style, length · level of detail.' },
                { title: 'How — Process', text: 'How should Claude approach it? Methods or frameworks · steps or sequence · constraints to follow.' },
                { title: 'Vibe — Performance', text: 'How should Claude behave? Concise vs detailed · challenging vs supportive · ideas vs analysis.' },
              ],
            },
            { type: 'text', text: "Miss any one of these and you'll rewrite the output — or worse, ship it wrong." },
          ],
        },
        {
          heading: 'D2 applied · Worked examples',
          blocks: [
            { type: 'text', text: 'Worked example: draft the system prompt for a TTT support agent.' },
            {
              type: 'bullets',
              items: [
                { title: 'P1 Product', text: '300-word system prompt: persona, tone, scope, fallback, 3 Q&A pairs. Markdown, no emojis. English.' },
                { title: 'P2 Process', text: 'Role → Task → Context → Format. Two variants (warm / neutral). Cite which guardrail each line enforces. Stop before examples.' },
                { title: 'P3 Performance', text: 'Challenging — flag ambiguous scope before drafting. Concise — no meta. Ideas over analysis at this stage.' },
              ],
            },
            { type: 'text', text: 'Worked example: spec the training plan for a TTT-domain SLM.' },
            {
              type: 'bullets',
              items: [
                { title: 'P1 Product', text: '2-page training spec: base model, parameter budget, dataset mix with %, eval suite, success thresholds. Markdown, tables for data/eval, no emojis. English.' },
                { title: 'P2 Process', text: 'Goal → Constraints → Data → Eval → Risks. One canonical recipe + one stretch recipe. Cite which capability each dataset slice supports. Stop before hyperparameter sweeps.' },
                { title: 'P3 Performance', text: "Challenging — name the capability that won't survive distillation. Concise — no infra wishlists. Tradeoffs over coverage at this stage." },
              ],
            },
          ],
        },
        {
          heading: "D3 · Discernment: don't trust — verify",
          blocks: [
            { type: 'text', text: 'Hallucinations reach users directly. Persona drift erodes brand. Bad escalation hurts conversion.' },
            {
              type: 'bullets',
              items: [
                { title: 'Hallucinations', text: "Reach users directly — there's no PM between Claude and the customer." },
                { title: 'Persona drift', text: 'Small tone slips compound over thousands of conversations.' },
                { title: 'Bad escalation', text: 'A bot that refuses to hand off loses leads and loyalty.' },
              ],
            },
            { type: 'text', text: 'The 5-check pass:' },
            {
              type: 'bullets',
              items: [
                { title: '01 Factual accuracy', text: 'Does every claim tie to the KB?' },
                { title: '02 Scope adherence', text: 'Did it stay in its lane?' },
                { title: '03 Tone & persona', text: 'Does it sound like us?' },
                { title: '04 Escalation logic', text: 'Did it hand off when it should?' },
                { title: '05 Internal logic', text: 'Do references inside the reply actually match?' },
              ],
            },
            { type: 'text', text: 'In practice · TTT runs the 5-check pass before every agent or SLM release — not just chatbots.' },
          ],
        },
        {
          heading: 'D4 · Diligence: responsible shipping. Responsible running.',
          blocks: [
            { type: 'text', text: 'Pre-launch — before ship:' },
            {
              type: 'bullets',
              items: [
                { text: 'Data handling reviewed (PII, consent, retention).' },
                { text: 'Citations wired in RAG responses.' },
                { text: 'Safety evals run (jailbreak, toxic, off-topic).' },
                { text: 'Logging + redaction live.' },
              ],
            },
            { type: 'text', text: 'Operations — in production:' },
            {
              type: 'bullets',
              items: [
                { text: 'Weekly transcript review.' },
                { text: 'Cost & latency dashboards.' },
                { text: 'Incident playbook.' },
                { text: 'Feedback channel to users.' },
              ],
            },
            { type: 'text', text: 'In practice · Cost dashboards and transcript review run weekly across our chatbot, agent, and SLM stacks.' },
            { type: 'quote', text: 'Diligence is the difference between a demo and a system.' },
          ],
        },
        {
          heading: 'Four qualities every AI system should have',
          blocks: [
            {
              type: 'cards',
              items: [
                { title: 'Effective', text: 'Resolution rate, CSAT, lead capture, time-to-answer.' },
                { title: 'Efficient', text: 'Smallest model that works, cached retrieval, shortest useful prompt.' },
                { title: 'Ethical', text: "Transparent, consented, bias-checked. Users know they're talking to AI." },
                { title: 'Safe', text: 'Guardrails hold under pressure. Escalation paths work. No silent failure.' },
              ],
            },
            { type: 'text', text: "These aren't trade-offs — they compound. A safe chatbot is usually more effective too." },
          ],
        },
        {
          heading: 'The 4D loop runs the same way for a chatbot, an agent, or an SLM fine-tune',
          blocks: [
            {
              type: 'code',
              text:
                '01 Kickoff    →  02 Spec       →  03 Build                     →  04 Ship     →  05 Run\n' +
                '   Delegation      Description      Description + Discernment       Diligence      Diligence + Discernment',
            },
            {
              type: 'bullets',
              items: [
                { text: '4D is not linear — you loop.' },
                { text: 'Every rework is a missed Description.' },
                { text: 'Every incident is a missed Diligence step.' },
              ],
            },
          ],
        },
        {
          heading: 'Changing Monday — what TTT is taking to every build',
          blocks: [
            { type: 'text', text: '5 takeaways:' },
            {
              type: 'bullets',
              items: [
                { title: '01', text: 'Make the delegation call before the first prompt.' },
                { title: '02', text: 'P+P+P every brief — Product, Process, Performance.' },
                { title: '03', text: '5-check pass on every release, chatbot or SLM.' },
                { title: '04', text: 'Pre-launch and in-prod diligence are not optional.' },
                { title: '05', text: 'Effective · Efficient · Ethical · Safe — judge every system on all four.' },
              ],
            },
            { type: 'text', text: 'Next steps for @teenytechtrek:' },
            {
              type: 'bullets',
              items: [
                { text: '4D Planning Template — default for new chatbot, agent, and SLM projects.' },
                { text: '5-check pass embedded in every PR review.' },
                { text: 'Diligence dashboard live for production AI systems.' },
                { text: 'Monthly 4D retro — what we delegated, described, discerned, did diligently.' },
              ],
            },
            { type: 'text', text: 'Course: anthropic.skilljar.com/ai-fluency-framework-foundations' },
          ],
        },
      ],
      contextNote: 'Internal enablement · Teeny Tech Trek (@teenytechtrek). Source: Anthropic AI Fluency Course — Framework Foundations.',
    },
  },
];

export function getCaseStudyBySlug(slug) {
  return caseStudies.find(study => study.slug === slug) || null;
}
