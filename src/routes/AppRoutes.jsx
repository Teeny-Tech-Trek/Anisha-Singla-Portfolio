import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AvailabilityBanner from '../components/AvailabilityBanner';
import Projects from '../components/Projects';
import About from '../components/About';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Education from '../components/Education';
import WritingSpeaking from '../components/WritingSpeaking';
import Volunteer from '../components/Volunteer';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';
import { ROUTES, consumePendingSection, getCurrentPath, navigateTo, navigateToSection, scrollToSection } from './index';

// Code-split: none of these are needed for the first paint of the home page.
// - Certifications pulls in pdfjs-dist (a large PDF-rendering library) just
//   to render on-demand certificate thumbnails, so it's split into its own
//   chunk even though it lives on the home route.
// - The route-level pages below are only ever needed once a visitor
//   navigates to that specific route.
const Certifications = lazy(() => import('../components/Certifications'));
const AllProjects = lazy(() => import('../components/AllProjects'));
const AllCaseStudies = lazy(() => import('../components/AllCaseStudies'));
const CaseStudyDetail = lazy(() => import('../components/CaseStudyDetail'));
const AboutDetail = lazy(() => import('../components/AboutDetail'));

function RouteFallback() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#000' }}>
      <div
        className="h-8 w-8 rounded-full animate-spin"
        style={{ border: '2px solid rgba(201,168,76,0.25)', borderTopColor: '#C9A84C' }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

// Matches Certifications' section background so swapping the fallback for
// the real, lazily-loaded component doesn't flash a different color; the
// id is kept so in-page nav links to "Skills" still land in the right spot
// while the chunk is still loading.
function CertificationsFallback() {
  return <section id="skills" style={{ background: '#050505', minHeight: 480 }} />;
}

function HomeRoute() {
  useEffect(() => {
    const pendingSection = consumePendingSection();

    if (!pendingSection) {
      return undefined;
    }

    // Try scrolling after 100ms, 300ms, and 600ms to align with dynamic height changes
    const t1 = window.setTimeout(() => {
      scrollToSection(pendingSection);
    }, 100);

    const t2 = window.setTimeout(() => {
      scrollToSection(pendingSection);
    }, 300);

    const t3 = window.setTimeout(() => {
      scrollToSection(pendingSection);
    }, 600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen w-full max-w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <AvailabilityBanner />
      <About />
      <Services />
      <Experience />
      <Projects />
      <Education />
      <Suspense fallback={<CertificationsFallback />}>
        <Certifications />
      </Suspense>
      <WritingSpeaking />
      <Volunteer />
      <Footer />
    </div>
  );
}

export default function AppRoutes() {
  const [pathname, setPathname] = useState(getCurrentPath());

  useEffect(() => {
    const handleRouteChange = () => setPathname(getCurrentPath());

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  if (pathname === ROUTES.HOME) {
    return <HomeRoute key={pathname} />;
  }

  if (pathname === ROUTES.CASE_STUDIES) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AllCaseStudies />
      </Suspense>
    );
  }

  if (pathname.startsWith(`${ROUTES.CASE_STUDIES}/`)) {
    const slug = pathname.slice(ROUTES.CASE_STUDIES.length + 1);
    return (
      <Suspense fallback={<RouteFallback />}>
        <CaseStudyDetail key={slug} slug={slug} />
      </Suspense>
    );
  }

  if (pathname === ROUTES.ABOUT) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AboutDetail />
      </Suspense>
    );
  }

  if (pathname === ROUTES.PROJECTS) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AllProjects onBack={() => navigateToSection('projects')} />
      </Suspense>
    );
  }

  return <NotFound />;
}
