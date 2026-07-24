// Certifications shown in the Portfolio OS "Certifications" tab.
// Each card opens its PDF directly (same viewer as the Case Studies section).
// imageUrl is the certificate preview image; pdfUrl is the document opened on click.
export const certificationsData = [
  {
    // Confirmed via the certificate image itself: issued by Securiti (course
    // title "AI Security & Governance"), so this is the same credential the
    // work order calls "Securiti AI Security" — not a separate certification.
    // id kept as-is (Icons.jsx keys its icon/color lookup off this exact id).
    id: 'ai-security-governance',
    name: 'Securiti AI Security',
    issuer: 'Securiti',
    pdfUrl: '/Certificates/AI-Security-and-Governance.pdf',
    imageUrl: '/Certificates-Photos/ai-security-governance.png',
  },
  {
    id: 'python',
    name: 'Python',
    issuer: 'IBM',
    pdfUrl: '/Certificates/Python.pdf',
    imageUrl: '/Certificates-Photos/python.png',
  },
  {
    id: 'design-thinking',
    name: 'Design Thinking Practitioner',
    issuer: 'IBM',
    pdfUrl: '/Certificates/Design-Thinking-Practitioner.pdf',
    imageUrl: '/Certificates-Photos/design-thinking.png',
  },
  // Referenced in detail inside the "4D Framework" case study
  // (caseStudiesData.js) but wasn't listed as a formal credential here.
  // No preview image yet, so the card falls back to its no-image state.
  {
    id: 'anthropic-ai-fluency',
    name: 'Anthropic AI Fluency',
    issuer: 'Anthropic',
    pdfUrl: '/Certificates/Certificate of Antropic ai fluency.pdf',
  },
];


