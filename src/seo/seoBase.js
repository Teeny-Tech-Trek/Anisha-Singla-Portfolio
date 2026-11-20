// Shared SEO helpers with no data-file imports, so both seoConfig.js (eager,
// every route) and caseStudySeo.js (lazy, case-study route only) can build
// on the same primitives without either pulling in the other's data.
export const SITE_URL = 'https://www.anishasingla.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const PERSON_NAME = 'Anisha Singla';

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON_NAME,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/anisha-singla.jpg`,
    jobTitle: 'AI Business Analyst · GenAI Adoption, Requirements and Delivery',
    description: 'AI Business Analyst in Toronto specializing in GenAI adoption, requirements analysis, and delivery coordination. 15 engagements, 10 clients across six industries.',
    email: 'mailto:anishasingla23@gmail.com',
    worksFor: { '@type': 'Organization', name: 'APT Growth Digital Inc.', url: 'https://www.anishasingla.com/' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'George Brown College', url: 'https://www.georgebrown.ca' },
      { '@type': 'CollegeOrUniversity', name: 'Rotman School of Management, University of Toronto', url: 'https://www.rotman.utoronto.ca' },
      { '@type': 'CollegeOrUniversity', name: 'CGC Jhanjeri', url: 'https://www.cgc.ac.in' },
    ],
    knowsAbout: [
      'Business Analysis', 'Requirements Analysis', 'User Stories',
      'Acceptance Criteria', 'Process Mapping', 'Stakeholder Management',
      'Generative AI', 'Retrieval-Augmented Generation', 'AI Adoption',
      'Change Management', 'Agile Methodologies', 'Jira and ClickUp',
    ],
    sameAs: [
      'https://www.linkedin.com/in/singlaanisha',
      'https://github.com/Anisha-Singla-22',
      'https://medium.com/@teenytechtrek',
      'https://www.teenytechtrek.com',
      'https://www.techtrekkers.ai',
    ],
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Teeny Tech Trek',
    url: 'https://techtrekkers.ai',
    founder: { '@type': 'Person', name: PERSON_NAME, url: `${SITE_URL}/` },
    sameAs: [
      'https://www.teenytechtrek.com',
      'https://www.techtrekkers.ai',
      'https://medium.com/@teenytechtrek',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: PERSON_NAME,
    url: `${SITE_URL}/`,
  };
}

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large';

export function buildMeta({ path, title, description, jsonLd, ogImage = DEFAULT_OG_IMAGE, robots = DEFAULT_ROBOTS }) {
  const url = `${SITE_URL}${path}`;
  return {
    path,
    title,
    description,
    canonical: url,
    robots,
    og: { type: 'website', url, title, description, image: ogImage },
    twitter: { card: 'summary_large_image', title, description, image: ogImage },
    jsonLd,
  };
}
