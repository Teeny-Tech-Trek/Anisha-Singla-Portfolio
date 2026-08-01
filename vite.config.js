import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Group heavy, slow-changing third-party libraries into their own
        // named vendor chunks instead of one big app bundle:
        // - app code (which changes often) stays cacheable independently of
        //   these, so a content change doesn't force users to re-download
        //   React/GSAP/Lenis/pdfjs-dist on every deploy.
        // - pdfjs-dist in particular is only ever pulled in by the lazily
        //   loaded Certifications/PdfReader chunks, so grouping it here also
        //   guarantees it's never duplicated across those two entry points.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('pdfjs-dist')) return 'pdfjs';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('lenis')) return 'lenis';
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'react-vendor';
          return 'vendor';
        },
      },
    },
  },
})
