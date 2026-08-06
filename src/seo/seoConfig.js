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
  title: 'Anisha Singla - AI Product Manager and Business Analyst | Toronto',
  description: 'AI Product Manager and Business Analyst. Founder of Teeny Tech Trek. I build production RAG systems and AI agents. Relocating to Toronto, September 2026.',
  jsonLd: [personJsonLd(), organizationJsonLd(), websiteJsonLd()],
});

const ABOUT = buildMeta({
  path: '/about',
  title: 'About Anisha Singla - AI Product Manager & Business Analyst',
  description: "Applied AI and Project Management professional working at the intersection of AI implementation, business analysis, and delivery. 10+ client AI deployments, postgraduate credentials from George Brown College.",
  jsonLd: [personJsonLd(), breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])],
});

const PROJECTS = buildMeta({
  path: '/projects',
  title: 'All Projects - Anisha Singla | AI Product Manager & Business Analyst',
  description: 'Browse all AI and software projects by Anisha Singla, including RAG systems, agentic workflows, automation tools, and analytics dashboards.',
  jsonLd: [breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }])],
});

const CASE_STUDIES = buildMeta({
  path: '/case-studies',
  title: 'Case Studies - Anisha Singla | AI Product Manager & Business Analyst',
  description: 'In-depth case studies covering production AI systems built by Anisha Singla: agentic workflows, RAG assistants, analytics dashboards, and responsible AI governance.',
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
