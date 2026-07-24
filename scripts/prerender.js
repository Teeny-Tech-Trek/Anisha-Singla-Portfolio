import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

const ROUTES = [
  '/',
  '/404',
  '/about',
  '/projects',
  '/case-studies',
  '/case-studies/agentic-workflow-automation-system',
  '/case-studies/rag-business-knowledge-assistant',
  '/case-studies/real-estate-intelligence-dashboard',
  '/case-studies/multi-agent-content-intelligence-system',
  '/case-studies/responsible-ai-governance-framework',
  '/case-studies/transfer-learning-image-classification',
];

async function prerender() {
  console.log('🚀 Generating static HTML route files for production deploy...');

  try {
    const mainHtmlPath = path.join(DIST_DIR, 'index.html');
    const baseHtml = await fs.readFile(mainHtmlPath, 'utf-8');

    for (const route of ROUTES) {
      if (route === '/') continue;

      let targetFile;
      if (route === '/404') {
        targetFile = path.join(DIST_DIR, '404.html');
      } else {
        const routeDir = path.join(DIST_DIR, route.slice(1));
        await fs.mkdir(routeDir, { recursive: true });
        targetFile = path.join(routeDir, 'index.html');
      }

      await fs.writeFile(targetFile, baseHtml, 'utf-8');
      console.log(`   ✅ Static route generated: ${route} -> ${path.relative(DIST_DIR, targetFile)}`);
    }

    console.log('✨ All static HTML route files created successfully!');
  } catch (err) {
    console.error('❌ Error during static route generation:', err.message);
    process.exitCode = 1;
  }
}

prerender();
