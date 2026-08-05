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
    jobTitle: 'AI Product Manager and Business Analyst',
    description: 'AI Product Manager and Business Analyst. Founder of Teeny Tech Trek, building production RAG systems and AI agents.',
    email: 'mailto:anishasingla23@gmail.com',
    worksFor: { '@type': 'Organization', name: 'Teeny Tech Trek', url: 'https://techtrekkers.ai' },
    alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'George Brown College', url: 'https://www.georgebrown.ca' }],
    knowsAbout: [
      'Artificial Intelligence', 'Product Management', 'Business Analysis',
      'Retrieval-Augmented Generation', 'AI Agents', 'Large Language Models',
      'Model Context Protocol', 'AI Governance',
    ],
    sameAs: [
      'https://www.linkedin.com/in/singlaanisha',
      'https://github.com/Anisha-Singla-22',
      'https://medium.com/@teenytechtrek',
      'https://luma.com/user/anishasingla',
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

export function buildMeta({ path, title, description, jsonLd, ogImage = DEFAULT_OG_IMAGE }) {
  const url = `${SITE_URL}${path}`;
  return {
    path,
    title,
    description,
    canonical: url,
    og: { type: 'website', url, title, description, image: ogImage },
    twitter: { card: 'summary_large_image', title, description, image: ogImage },
    jsonLd,
  };
}
