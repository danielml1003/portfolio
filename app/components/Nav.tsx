import React, { useEffect, useState } from "react";
import { Command } from "lucide-react";

const LINKS = [
  { href: "#about", label: "./about" },
  { href: "#skills", label: "./skills" },
  { href: "#projects", label: "./projects" },
  { href: "#terminal", label: "./terminal" },
  { href: "#contact", label: "./contact" },
];

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);

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
              className="text-dim hover:text-acc transition-colors link-sweep"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 border border-line bg-panel/70 px-2.5 py-1.5 text-dim hover:text-acc hover:border-line2 transition-colors"
            aria-label="Open command palette"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">K</span>
          </button>
          <a
            href="#contact"
            className="border border-acc/60 text-acc px-3 py-1.5 hover:bg-acc hover:text-bg transition-colors whitespace-nowrap"
          >
            [hire_me]
          </a>
        </div>
      </nav>
    </header>
  );
}
