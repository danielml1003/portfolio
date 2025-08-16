import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Portfolio() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleScroll = (e: MouseEvent) => {
      const node = e.target as Element | null;
      const anchor = node?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const scrollTarget = document.querySelector(href);
          if (scrollTarget) {
            scrollTarget.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleScroll);
    return () => document.removeEventListener('click', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen overflow-x-hidden snap-y snap-mandatory"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </motion.div>
    </AnimatePresence>
  );
}
