import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import AllProjects from '../components/AllProjects';
import About from '../components/About';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Volunteer from '../components/Volunteer';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AllCaseStudies from '../components/AllCaseStudies';
import { ROUTES, consumePendingSection, getCurrentPath, navigateTo, scrollToSection } from './index';

function HomeRoute() {
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

  return (
    <div className="bg-black min-h-screen w-full max-w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Volunteer />
      {/* <Contact /> */}
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

  if (pathname === ROUTES.PROJECTS) {
    return <AllProjects onBack={() => navigateTo(ROUTES.HOME)} />;
  }

  return <HomeRoute key={pathname} />;
}
