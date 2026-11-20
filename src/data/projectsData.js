/**
 * Public-Safe Selected Work & Case Studies
 * Structured on the approved BA pattern:
 * Context · My Role · What I Did · What the Team Built · Outcome · What I Would Do Differently
 * Strictly no NDA engagements.
 */

export const projects = [
  {
    id: 1,
    title: 'AI Search Visibility Platform (AEO / GEO)',
    category: 'Product Requirements & Method',
    year: '2025',
    role: 'Method & Product Requirements (with partner studio)',
    description:
      'Defined the five-stage Discover, Fix, Publish, Monitor, Benchmark methodology and product requirements for auditing brand visibility across ChatGPT, Gemini, and Perplexity.',
    context:
      'Brands losing discoverability and visibility as consumer queries transition from traditional search engines to AI assistants (ChatGPT, Gemini, Perplexity).',
    whatIDid:
      'Defined the five-stage Discover, Fix, Publish, Monitor, Benchmark methodology, citation check logic, and reporting requirements.',
    whatTeamBuilt:
      'Engineers built the automated multi-model pipeline utilizing n8n, Python, and Gemini API to crawl, audit, and benchmark brand citations.',
    outcome:
      'Completed and delivered; this audit and visibility framework is the exact methodology now applied in my Toronto consulting role.',
    differently:
      'Define the baseline benchmark dataset prior to conducting the first client audit, rather than establishing it retrospectively.',
    tags: ['AEO / GEO', 'Method Definition', 'Requirements', 'Gemini & n8n'],
    featured: true,
    gradient: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.10) 0%, transparent 65%)',
  },
  {
    id: 2,
    title: 'Export Process & Operations Automation',
    category: 'Process Improvement & PM',
    year: '2024 – 2026',
    role: 'Project Manager (Appu International)',
    description:
      'Specified five core process automations across quotation generation, order tracking, and production reporting at a precision spare-parts exporter, saving staff roughly 10 hours a week.',
    context:
      'A precision spare-parts exporter handling domestic and international orders through fragmented, manual paper-and-spreadsheet workflows.',
    whatIDid:
      'Specified five core process automations (quotation generation, order tracking, production reporting), created the export documentation checklist, and structured freight-forwarder coordination.',
    whatTeamBuilt:
      'Managed the developer who implemented the automations and integrations connecting shop-floor status with management reports.',
    outcome:
      'Staff estimated saving approximately 10 hours per week in clerical overhead and status chasing.',
    differently:
      'Some automations lapsed after departure; handover requires a dedicated human process owner on the floor, not merely documentation.',
    tags: ['Process Mapping', 'Automation PM', 'SOP Design', 'Change Management'],
    featured: false,
    gradient: 'radial-gradient(ellipse at bottom left, rgba(100,180,255,0.10) 0%, transparent 65%)',
  },
  {
    id: 3,
    title: 'Tech Trekkers Suite Product Strategy',
    category: 'Product Definition & Strategy',
    year: '2025 – 2026',
    role: 'Product Owner (NeoScript, NexEstate, NetTwin)',
    description:
      'Defined product lines, target personas, tier/credit/BYOK pricing models, and shared agentic workflows across three working AI demonstration products.',
    context:
      'Utilizing engineering bench capacity between client engagements to build proof-of-concept AI productivity products.',
    whatIDid:
      'Defined product lines and target personas, the shared agentic engine architecture, pricing models (tiers, credits, BYOK), the Engage-Capture-Qualify-Act framework, and model selection per feature.',
    whatTeamBuilt:
      'Engineering team built three working demos: NeoScript (MCP content pipeline), NexEstate (lead capture), and NetTwin (conversational professional twin).',
    outcome:
      'Validated multi-agent patterns internally and produced functional demonstration prototypes; no external commercial users yet.',
    differently:
      'Focus on validating one focused product with ten active users before expanding into a three-product suite.',
    tags: ['Product Definition', 'Model Selection', 'Pricing Strategy', 'Multi-Agent Strategy'],
    featured: false,
    links: {
      caseStudy: '/case-studies/multi-agent-content-intelligence-system+conversational-digital-twin-platform',
    },
    gradient: 'radial-gradient(ellipse at top right, rgba(180,100,255,0.10) 0%, transparent 65%)',
  },
  {
    id: 4,
    title: 'Privacy-Software Product & Compliance Assessment',
    category: 'Regulatory & Product Assessment',
    year: '2026',
    role: 'Consultant (UK Browser-Extension Startup)',
    description:
      'Authored a 43-question product, engineering, and regulatory assessment matrix evaluating GDPR, CCPA, and India’s DPDPA obligations for an early-stage browser-extension startup.',
    context:
      'An early-stage browser-extension startup evaluating product feature scope alongside stringent international data-privacy obligations.',
    whatIDid:
      'Authored a comprehensive 43-question product, engineering, and compliance assessment matrix evaluating GDPR, CCPA, and India’s DPDPA obligations.',
    whatTeamBuilt:
      'Delivered strategic product recommendations, data-minimization rules, and feature prioritization guidelines for the technical roadmap.',
    outcome:
      'Delivered on schedule; the client subsequently shelved the engagement due to internal corporate restructuring.',
    differently:
      'Scope an initial high-level compliance MVP rather than delivering a comprehensive 43-question audit upfront.',
    tags: ['GDPR / CCPA / DPDPA', 'Compliance Assessment', 'Feature Scoping', 'Data Privacy'],
    featured: false,
    gradient: 'radial-gradient(ellipse at top right, rgba(120,220,255,0.11) 0%, transparent 65%)',
  },
  {
    id: 5,
    title: 'Immigration Consultancy Website & Intake Assessment',
    category: 'Requirements & Client Intake',
    year: '2026',
    role: 'Business Analyst & Delivery Lead',
    description:
      'Led discovery, conditional intake logic, user stories, and acceptance sign-off for a public web portal and structured applicant assessment now live in production.',
    context:
      'An immigration advisory practice requiring a professional public web presence and a structured, self-service client intake assessment.',
    whatIDid:
      'Led client discovery, defined the conditional intake logic and data model, wrote functional user stories, and signed off on delivery acceptance.',
    whatTeamBuilt:
      'Engineering team built the responsive public portal and structured multi-step applicant questionnaire.',
    outcome:
      'Live in production, standardizing inbound applicant evaluations and eliminating unstructured email inquiries.',
    differently:
      'Test the conditional intake questions with five real applicants prior to launch to identify confusing terminology earlier.',
    tags: ['Intake Workflows', 'Requirements', 'Acceptance Testing', 'Client Discovery'],
    featured: false,
    gradient: 'radial-gradient(ellipse at top right, rgba(255,255,255,0.09) 0%, transparent 65%)',
  },
  {
    id: 6,
    title: 'Generative Previsualisation Pitch',
    category: 'Generative Media & Storyboarding',
    year: '2026',
    role: 'Solo Delivery (Orlina Ventures)',
    description:
      'Produced a 13-scene, 150-second cultural centre previsualisation video and conceptual visuals using Google Flow and Veo for an ecotourism pitch, publicly credited by the client.',
    context:
      'A high-stakes commercial pitch for an ecotourism initiative and cultural centre requiring rich conceptual visual storytelling under tight deadlines.',
    whatIDid:
      'Personally generated and curated a 13-scene, 150-second cultural centre previsualisation video and approximately 60 conceptual visuals using Google Flow, Veo, and generative image tooling.',
    whatTeamBuilt:
      'Solo engagement where I personally produced and delivered all generative assets; under 30 final assets were integrated into the winning client pitch.',
    outcome:
      'Completed on time, fully paid, and publicly credited by the client.',
    differently:
      'Establish visual fidelity guidelines with the client prior to asset generation to reduce prompt iteration cycles.',
    tags: ['Generative Media', 'Google Flow & Veo', 'Storyboarding', 'Pitch Delivery'],
    featured: false,
    gradient: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.10) 0%, transparent 65%)',
  },
  {
    id: 7,
    title: 'Inventory & Production-Tracking Rollout',
    category: 'Systems Implementation & Training',
    year: '2021 – 2022',
    role: 'IT Implementation Specialist (Appu International)',
    description:
      'Evaluated vendor software, cleaned master parts data, reconciled stock counts, authored SOPs, and trained shop-floor staff to transition Appu International from paper ledgers.',
    context:
      'A traditional precision spare-parts manufacturing shop floor transitioning from paper ledgers to digital inventory and production control.',
    whatIDid:
      'Evaluated software solutions, coordinated vendor implementation, cleaned and standardized master parts data, authored bilingual SOPs, and trained shop staff.',
    whatTeamBuilt:
      'External vendor deployed software; I built owner-facing Excel reporting models connecting stock levels with daily production records.',
    outcome:
      'Successfully deployed across stores and production; provided operational visibility before later platform modernization.',
    differently:
      'System adoption requires an ongoing floor champion across shifts, not only initial classroom training sessions.',
    tags: ['Systems Rollout', 'Master Data Cleanup', 'SOP Authoring', 'Staff Training'],
    featured: false,
    gradient: 'radial-gradient(ellipse at bottom left, rgba(100,220,200,0.09) 0%, transparent 65%)',
  },
  {
    id: 8,
    title: 'Workflow Automation Designs for Partner Studio',
    category: 'Workflow Automation Design',
    year: '2025 – 2026',
    role: 'Design & Review (Engineers Built)',
    description:
      'Designed functional logic for an Upwork proposal automation (deployed) and mapped a 25-node multilingual video pipeline across six languages evaluated for API cost feasibility.',
    context:
      'Partner agency seeking to automate Upwork proposal generation and multi-language marketing video assembly.',
    whatIDid:
      'Designed the functional logic for an Upwork proposal generator and mapped a 25-node multilingual video-generation pipeline across six languages.',
    whatTeamBuilt:
      'Engineers built the n8n workflows integrating Gemini and Veo model APIs.',
    outcome:
      'The proposal automation successfully deployed; the 25-node video pipeline was shelved due to API generation costs.',
    differently:
      'Include a strict cost-per-generated-asset ceiling in the initial requirements before building complex multi-model pipelines.',
    tags: ['n8n Workflows', 'Cost Feasibility', 'Pipeline Design', 'Review & QA'],
    featured: false,
    gradient: 'radial-gradient(ellipse at top right, rgba(180,140,255,0.10) 0%, transparent 65%)',
  },
  {
    id: 9,
    title: 'Transfer-Learning Image Classifier (Coursework)',
    category: 'George Brown College Coursework',
    year: '2023',
    role: 'Team Coursework — Data, Evaluation & Write-Up',
    description:
      'Graduate coursework at George Brown College handling dataset preparation, performance evaluation methodology, error analysis, and technical report write-up.',
    context:
      'Graduate coursework at George Brown College exploring transfer learning and compute efficiency on image classification benchmarks.',
    whatIDid:
      'Responsible for dataset preparation, performance evaluation methodology, error analysis, and final technical report write-up.',
    whatTeamBuilt:
      'Collaborative team project applying pre-trained Xception weights across tf_flowers and cars196 datasets.',
    outcome:
      'Successfully completed as academic coursework demonstrating transfer-learning trade-offs and validation practices.',
    differently:
      'Benchmark smaller lightweight architectures (e.g. MobileNet) alongside Xception to analyze inference latency vs. accuracy.',
    tags: ['Coursework', 'Data Preparation', 'Model Evaluation', 'George Brown College'],
    featured: false,
    links: {
      caseStudy: '/case-studies/transfer-learning-image-classification',
    },
    gradient: 'radial-gradient(ellipse at top right, rgba(255,255,255,0.08) 0%, transparent 65%)',
  },
  {
    id: 10,
    title: 'Jigsaw Toxic-Comment Classifier (Coursework)',
    category: 'George Brown College Coursework',
    year: '2023',
    role: 'Team Coursework — Data Preparation & Baseline Model',
    description:
      'Graduate coursework at George Brown College managing data cleaning, tokenization, TF-IDF pipelines, and baseline classification models across 159K discussion comments.',
    context:
      'Graduate coursework at George Brown College exploring multi-label text moderation and evaluation metrics.',
    whatIDid:
      'Handled data cleaning, tokenization, TF-IDF feature pipelines, and built the baseline classification models.',
    whatTeamBuilt:
      'Team comparative study evaluating multiple algorithmic approaches across 159K Wikipedia discussion comments.',
    outcome:
      'Demonstrated data preprocessing discipline, class imbalance mitigation, and baseline model benchmarking.',
    differently:
      'Explore synthetic data augmentation for rare toxic label categories early in the pipeline.',
    tags: ['Coursework', 'NLP & Preprocessing', 'Baseline Modeling', 'George Brown College'],
    featured: false,
    gradient: 'radial-gradient(ellipse at bottom right, rgba(100,180,255,0.10) 0%, transparent 65%)',
  },
];
