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
    </div>
  );
}
