import { useState } from 'react';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import Projects      from './components/Projects';
import AllProjects   from './components/AllProjects';
import About         from './components/About';
import Services      from './components/Services';
import Experience    from './components/Experience';
import Education     from './components/Education';
import Skills        from './components/Skills';
import Certifications from './components/Certifications';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import './index.css';

export default function App() {
  const [showAll, setShowAll] = useState(false);

  if (showAll) {
    return <AllProjects onBack={() => setShowAll(false)} />;
  }

  return (
    <div className="bg-black min-h-screen w-full max-w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects onViewAll={() => setShowAll(true)} />
      <Experience />
      <Education />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
