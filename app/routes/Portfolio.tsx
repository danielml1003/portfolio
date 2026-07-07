import React, { useCallback, useEffect, useState } from "react";
import type { Route } from "./+types/Portfolio";
import BootSequence from "../components/BootSequence";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import TerminalSection from "../components/TerminalSection";
import Contact from "../components/Contact";
import StatusBar from "../components/StatusBar";
import CommandPalette from "../components/CommandPalette";
import MatrixRain from "../components/MatrixRain";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Daniel Baravik — Full-Stack Developer" },
    {
      name: "description",
      content:
        "The workstation of Daniel Baravik — a full-stack developer building with TypeScript, Python and Rust. Comes with a real in-page terminal. Type 'help'.",
    },
    { property: "og:title", content: "Daniel Baravik — Full-Stack Developer" },
    {
      property: "og:description",
      content:
        "A terminal-native portfolio. Interactive ASCII canvas, working shell, honest skill bars.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:image",
      content: "https://danielml1003.github.io/portfolio/og.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:image",
      content: "https://danielml1003.github.io/portfolio/og.jpg",
    },
  ];
}

export default function Portfolio() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // vim-style navigation: j/k between sections, gg top, G bottom, ? palette
  useEffect(() => {
    const SECTIONS = ["top", "about", "skills", "projects", "terminal", "contact"];
    let lastG = 0;
    const currentIndex = () => {
      let idx = 0;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4)
          idx = i;
      });
      return idx;
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      )
        return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      try {
        if (!sessionStorage.getItem("ws-booted")) return;
      } catch {}

      if (e.key === "j") {
        document
          .getElementById(SECTIONS[Math.min(currentIndex() + 1, SECTIONS.length - 1)])
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "k") {
        document
          .getElementById(SECTIONS[Math.max(currentIndex() - 1, 0)])
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "g") {
        const now = Date.now();
        if (now - lastG < 450) window.scrollTo({ top: 0, behavior: "smooth" });
        lastG = now;
      } else if (e.key === "G") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else if (e.key === "?") {
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ink font-mono pb-7">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[110] focus:bg-acc focus:text-bg focus:px-4 focus:py-2 font-mono text-sm"
      >
        skip to content
      </a>

      <BootSequence />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <TerminalSection />
        <Contact />
      </main>

      <StatusBar />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <MatrixRain />
    </div>
  );
}
