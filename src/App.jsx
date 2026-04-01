import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
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
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Education />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
