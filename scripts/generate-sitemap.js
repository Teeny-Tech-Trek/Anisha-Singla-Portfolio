import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO } from '../src/seo/seoConfig.js';
import { getAllCaseStudySeo } from '../src/seo/caseStudySeo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

// Static routes get a fixed priority by depth; anything not listed here
// (i.e. every case study, from getAllCaseStudySeo()) falls through to
// CASE_STUDY_PRIORITY below.
const STATIC_ROUTE_PRIORITY = {
  '/': '1.0',
  '/about': '0.8',
  '/projects': '0.8',
  '/case-studies': '0.8',
};
const CASE_STUDY_PRIORITY = '0.7';

function urlEntry(meta, lastmod) {
  const priority = STATIC_ROUTE_PRIORITY[meta.path] ?? CASE_STUDY_PRIORITY;
  return `  <url>\n    <loc>${meta.canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml from live route data...');

  try {
    const lastmod = new Date().toISOString().slice(0, 10);
    // Same source of truth prerender.js uses for static HTML -- pulling
    // routes from SEO/getAllCaseStudySeo() means a new case study or route
    // can never go missing from the sitemap the way the old hand-written
    // public/sitemap.xml did. /404 is intentionally excluded.
    const routes = [SEO.home, SEO.about, SEO.projects, SEO.caseStudies, ...getAllCaseStudySeo()];

    const body = routes.map(meta => urlEntry(meta, lastmod)).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

    const targetFile = path.join(DIST_DIR, 'sitemap.xml');
    await fs.writeFile(targetFile, xml, 'utf-8');
    console.log(`   ✅ sitemap.xml written with ${routes.length} URLs -> ${path.relative(DIST_DIR, targetFile)}`);
  } catch (err) {
    console.error('❌ Error generating sitemap.xml:', err.message);
    process.exitCode = 1;
  }
}

generateSitemap();
