import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { navigateTo, ROUTES } from '../routes';
import { useSeo } from '../hooks/useSeo';
import { SEO } from '../seo/seoConfig';

export default function NotFound() {
  useSeo(SEO.notFound);

  return (
    <div className="bg-black min-h-screen w-full max-w-full overflow-x-hidden flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 z-10 relative">
        <div className="inline-block rounded-full bg-gold/10 border border-gold/20 px-4 py-1.5 mb-6 text-xs uppercase tracking-widest text-gold font-body">
          Error 404 — Page Not Found
        </div>

        <h1 className="font-title text-7xl sm:text-9xl text-white tracking-wider mb-4">
          404
        </h1>

        <h2 className="font-title text-2xl sm:text-4xl text-gold mb-6 tracking-wide">
          LOST IN THE VECTOR SPACE?
        </h2>

        <p className="font-body text-gray-400 max-w-md mx-auto mb-10 text-sm sm:text-base leading-relaxed">
          The page or route you are looking for does not exist or has been relocated. Let’s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => navigateTo(ROUTES.HOME)}
            className="w-full sm:w-auto font-body text-xs rounded-lg tracking-widest uppercase border border-gold bg-gold text-black font-semibold px-8 py-3.5 transition-all duration-300 hover:bg-gold-light shadow-lg hover:shadow-gold/20"
          >
            Return to Home
          </button>

          <button
            onClick={() => navigateTo(ROUTES.PROJECTS)}
            className="w-full sm:w-auto font-body text-xs rounded-lg tracking-widest uppercase border border-gray-700 text-gray-300 px-8 py-3.5 transition-all duration-300 hover:border-gold hover:text-gold"
          >
            View Projects
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
