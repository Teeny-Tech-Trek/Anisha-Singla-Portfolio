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
    jobTitle: 'AI Strategist & Business Analyst',
    description: 'AI Strategist and Business Analyst based in Toronto. 10 client AI engagements, 3 production agent products, RAG systems, and AI governance.',
    email: 'mailto:anishasingla23@gmail.com',
    worksFor: { '@type': 'Organization', name: 'Teeny Tech Trek', url: 'https://techtrekkers.ai' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'George Brown Polytechnic', url: 'https://www.georgebrown.ca' },
      { '@type': 'CollegeOrUniversity', name: 'Rotman School of Management, University of Toronto', url: 'https://www.rotman.utoronto.ca' },
    ],
    knowsAbout: [
      'Artificial Intelligence', 'Product Management', 'Business Analysis',
      'Retrieval-Augmented Generation', 'AI Agents', 'Large Language Models',
      'Model Context Protocol', 'AI Governance',
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
