import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO } from '../src/seo/seoConfig.js';
import { getAllCaseStudySeo } from '../src/seo/caseStudySeo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceTagText(html, regex, text) {
  return html.replace(regex, (_match, open, _old, close) => `${open}${escapeHtml(text)}${close}`);
}

function replaceAttrValue(html, regex, value) {
  return html.replace(regex, (_match, open, _old, close) => `${open}${escapeHtml(value)}${close}`);
}

function injectRouteSeo(baseHtml, meta) {
  let html = baseHtml;

  html = replaceTagText(html, /(<title>)([\s\S]*?)(<\/title>)/, meta.title);
  html = replaceAttrValue(html, /(<meta name="description" content=")([^"]*)(")/, meta.description);
  html = replaceAttrValue(html, /(<link rel="canonical" href=")([^"]*)(")/, meta.canonical);

  html = replaceAttrValue(html, /(<meta property="og:url" content=")([^"]*)(")/, meta.og.url);
  html = replaceAttrValue(html, /(<meta property="og:title" content=")([^"]*)(")/, meta.og.title);
  html = replaceAttrValue(html, /(<meta property="og:description" content=")([^"]*)(")/, meta.og.description);
  html = replaceAttrValue(html, /(<meta property="og:image" content=")([^"]*)(")/, meta.og.image);

  html = replaceAttrValue(html, /(<meta name="twitter:title" content=")([^"]*)(")/, meta.twitter.title);
  html = replaceAttrValue(html, /(<meta name="twitter:description" content=")([^"]*)(")/, meta.twitter.description);
  html = replaceAttrValue(html, /(<meta name="twitter:image" content=")([^"]*)(")/, meta.twitter.image);

  // Drop the JSON-LD baked into the built index.html (always the homepage's
  // Person schema) and inject this route's own set — CreativeWork/Breadcrumb
  // for case studies, Person for home/about, etc.
  html = html.replace(/\s*<script type="application\/ld\+json" data-seo="jsonld">[\s\S]*?<\/script>/, '');
  const jsonLdBlocks = (meta.jsonLd || [])
    .map(entry => `    <script type="application/ld+json" data-seo="jsonld">\n    ${JSON.stringify(entry)}\n    </script>`)
    .join('\n');
  html = html.replace('</head>', `${jsonLdBlocks}\n  </head>`);

  return html;
}

async function prerender() {
  console.log('🚀 Generating static HTML route files for production deploy...');

  try {
    const mainHtmlPath = path.join(DIST_DIR, 'index.html');
    const baseHtml = await fs.readFile(mainHtmlPath, 'utf-8');
    const routes = [SEO.home, SEO.notFound, SEO.about, SEO.projects, SEO.caseStudies, ...getAllCaseStudySeo()];

    for (const meta of routes) {
      const html = injectRouteSeo(baseHtml, meta);

      let targetFile;
      if (meta.path === '/') {
        targetFile = mainHtmlPath;
      } else if (meta.path === '/404') {
        targetFile = path.join(DIST_DIR, '404.html');
      } else {
        const routeDir = path.join(DIST_DIR, meta.path.slice(1));
        await fs.mkdir(routeDir, { recursive: true });
        targetFile = path.join(routeDir, 'index.html');
      }

      await fs.writeFile(targetFile, html, 'utf-8');
      console.log(`   ✅ Static route generated: ${meta.path} -> ${path.relative(DIST_DIR, targetFile)}`);
    }

    console.log('✨ All static HTML route files created successfully!');
  } catch (err) {
    console.error('❌ Error during static route generation:', err.message);
    process.exitCode = 1;
  }
}

prerender();
