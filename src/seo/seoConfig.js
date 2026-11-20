// Central per-route SEO metadata for the routes that don't need case-study
// content (home, about, projects index, case-studies index, 404). Consumed
// eagerly by the client (src/hooks/useSeo.js) on every page, so this file
// deliberately does NOT import src/data/caseStudiesData.js — that data is
// only needed by the case-study detail page, which is already React.lazy
// loaded (see src/seo/caseStudySeo.js). Pulling it in here would add it to
// every route's initial bundle, including the home page.
import { SITE_URL, buildMeta, personJsonLd, breadcrumbJsonLd, organizationJsonLd, websiteJsonLd } from './seoBase.js';

const HOME = buildMeta({
  path: '/',
  title: 'Anisha Singla | AI Business Analyst — GenAI Adoption & Delivery',
  description: 'AI Business Analyst in Toronto specializing in GenAI adoption, requirements analysis, and delivery coordination. 15 engagements, 10 clients across six industries.',
  jsonLd: [personJsonLd(), organizationJsonLd(), websiteJsonLd()],
});

const ABOUT = buildMeta({
  path: '/about',
  title: 'About Anisha Singla | AI Business Analyst',
  description: 'AI Business Analyst based in Toronto. 15 engagements across six industries, George Brown College Dean\'s Honour List, Rotman School of Management.',
  jsonLd: [personJsonLd(), breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])],
});


const PROJECTS = buildMeta({
  path: '/projects',
  title: 'Selected Work & Projects | Anisha Singla — AI Business Analyst',
  description: 'Public-safe case studies in AI requirements, method definitions, process automations, and systems rollouts.',
  jsonLd: [breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }])],
});

const CASE_STUDIES = buildMeta({
  path: '/case-studies',
  title: 'Case Studies | Anisha Singla — AI Business Analyst',
  description: 'Detailed case studies on AI business analysis, requirements definition, human-in-the-loop design, and workflow adoption.',
  jsonLd: [breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }])],
});

const NOT_FOUND = buildMeta({
  path: '/404',
  title: '404 - Page Not Found | Anisha Singla',
  description: 'The page you are looking for does not exist or has been relocated.',
  jsonLd: [],
  // 404s shouldn't be indexed -- there's nothing here for Google to rank.
  robots: 'noindex, follow',
});

export const SEO = {
  home: HOME,
  about: ABOUT,
  projects: PROJECTS,
  caseStudies: CASE_STUDIES,
  notFound: NOT_FOUND,
};

export { HOME, ABOUT, PROJECTS, CASE_STUDIES, NOT_FOUND };
