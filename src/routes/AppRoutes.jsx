import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AvailabilityBanner from '../components/AvailabilityBanner';
import Projects from '../components/Projects';
import AllProjects from '../components/AllProjects';
import About from '../components/About';
import SelectedWork from '../components/SelectedWork';
import Suite from '../components/Suite';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import WritingSpeaking from '../components/WritingSpeaking';
import Volunteer from '../components/Volunteer';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AllCaseStudies from '../components/AllCaseStudies';
import CaseStudyDetail from '../components/CaseStudyDetail';
import AboutDetail from '../components/AboutDetail';
import { ROUTES, consumePendingSection, getCurrentPath, navigateTo, navigateToSection, scrollToSection } from './index';
import Testimonial from '../components/Testimonial';

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
      {/* <SelectedWork /> */}
      {/* <Suite /> */}
      <Services />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <WritingSpeaking />
      <Volunteer />
      {/* <Contact /> */}
      {/* <Testimonial /> */}
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

  if (pathname === ROUTES.CASE_STUDIES) {
    return <AllCaseStudies />;
  }

  if (pathname.startsWith(`${ROUTES.CASE_STUDIES}/`)) {
    const slug = pathname.slice(ROUTES.CASE_STUDIES.length + 1);
    return <CaseStudyDetail key={slug} slug={slug} />;
  }

  if (pathname === ROUTES.ABOUT) {
    return <AboutDetail />;
  }

  if (pathname === ROUTES.PROJECTS) {
    return <AllProjects onBack={() => navigateToSection('projects')} />;
  }

  return <HomeRoute key={pathname} />;
}
