// Case-study-specific SEO metadata. Imports the full case-study content
// data, so this module must only ever be imported from the already
// React.lazy-loaded CaseStudyDetail page (or from Node scripts, where
// bundle size doesn't matter) — never from an eagerly-loaded route, or its
// weight would land on every page's initial load.
import { caseStudies } from '../data/caseStudiesData.js';
import { SITE_URL, PERSON_NAME, buildMeta, breadcrumbJsonLd } from './seoBase.js';

function caseStudyJsonLd(study) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: study.detail.headline,
    name: `${study.title} ${study.subtitle}`,
    description: study.description,
    url: `${SITE_URL}/case-studies/${study.slug}`,
    author: { '@type': 'Person', name: PERSON_NAME, url: `${SITE_URL}/` },
    about: study.category,
    keywords: study.tags.join(', '),
  };
}

function buildCaseStudyMeta(study) {
  return buildMeta({
    path: `/case-studies/${study.slug}`,
    title: `${study.detail.headline} - Case Study | Anisha Singla`,
    description: study.description,
    jsonLd: [
      caseStudyJsonLd(study),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: study.title, path: `/case-studies/${study.slug}` },
      ]),
    ],
  });
}

export function getCaseStudySeo(slug) {
  const study = caseStudies.find(s => s.slug === slug);
  return study ? buildCaseStudyMeta(study) : null;
}

export function getAllCaseStudySeo() {
  return caseStudies.map(buildCaseStudyMeta);
}
