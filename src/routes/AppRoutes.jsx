import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import AllProjects from '../components/AllProjects';
import About from '../components/About';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AllCaseStudies from '../components/AllCaseStudies';
import { ROUTES, consumePendingSection, getCurrentPath, scrollToSection } from './index';

function HomeRoute() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const pendingSection = consumePendingSection();

    if (!pendingSection) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToSection(pendingSection);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (showAllProjects) {
    return <AllProjects onBack={() => setShowAllProjects(false)} />;
  }

  return (
    <div className="bg-black min-h-screen w-full max-w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Projects onViewAll={() => setShowAllProjects(true)} />
      <Education />
      <Skills />
      <Certifications />
      <Contact />
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

  return <HomeRoute key={pathname} />;
}
