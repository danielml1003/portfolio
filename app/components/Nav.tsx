import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Command } from "lucide-react";

const LINKS = [
  { href: "#about", label: "./about", index: "01" },
  { href: "#skills", label: "./skills", index: "02" },
  { href: "#projects", label: "./projects", index: "03" },
  { href: "#terminal", label: "./terminal", index: "04" },
  { href: "#contact", label: "./contact", index: "05" },
];

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* reading progress */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-acc origin-left"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-14 flex items-center justify-between font-mono text-[13px]">
        <a
          href="#top"
          className="text-ink hover:text-acc transition-colors whitespace-nowrap"
          aria-label="Back to top"
        >
          <span className="text-acc">daniel</span>
          <span className="text-faint">@</span>
          <span className="text-dim">baravik</span>
          <span className="text-faint">:~$</span>
          <span className="caret" />
        </a>

        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group text-dim hover:text-acc transition-colors"
            >
              <span className="text-[9px] text-faint align-super mr-0.5 group-hover:text-acc/70 transition-colors">
                {l.index}
              </span>
              <span className="link-sweep">{l.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 border border-line bg-panel/70 px-2.5 py-1.5 text-dim hover:text-acc hover:border-line2 transition-colors"
            aria-label="Open command palette"
            data-cursor="⌘K"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">K</span>
          </button>
          <a
            href="#contact"
            className="brackets border border-acc/60 text-acc px-3 py-1.5 hover:bg-acc hover:text-bg transition-colors whitespace-nowrap"
          >
            [hire_me]
          </a>
        </div>
      </nav>
    </header>
  );
}
