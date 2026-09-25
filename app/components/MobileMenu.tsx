import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, Linkedin, Mail, FileDown } from "lucide-react";
import { ACCENTS, applyAccent } from "@/lib/accent";
import cvPdfUrl from "../../Daniel Baravik - junior developer..pdf";

const LINKS = [
  { href: "#about", label: "about", index: "01" },
  { href: "#skills", label: "skills", index: "02" },
  { href: "#projects", label: "projects", index: "03" },
  { href: "#terminal", label: "terminal", index: "04" },
  { href: "#contact", label: "contact", index: "05" },
];

/**
 * MobileMenu — full-screen terminal-style navigation for small screens.
 * Locks page scroll while open, closes on Esc / backdrop / link, moves
 * focus to the first link on open and hands it back on close.
 */
export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const id = requestAnimationFrame(() => firstLink.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(id);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[80] bg-bg/95 backdrop-blur-md flex flex-col font-mono md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between h-14 px-5 border-b border-line shrink-0">
            <span className="text-[13px] truncate">
              <span className="text-acc">daniel</span>
              <span className="text-faint">@</span>
              <span className="text-dim">baravik</span>
              <span className="text-faint">:~$ ls ~/sections</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 -mr-2 text-dim hover:text-acc transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-6" aria-label="Sections">
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                ref={i === 0 ? firstLink : undefined}
                href={l.href}
                onClick={onClose}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.06 + i * 0.06,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex items-baseline gap-4 py-3.5 border-b border-line/70 text-ink focus-visible:text-acc active:text-acc"
              >
                <span className="text-[11px] text-faint w-6 shrink-0">{l.index}</span>
                <span className="font-display font-bold text-4xl tracking-tight">
                  {l.label}
                </span>
                <span className="ml-auto text-acc opacity-0 group-focus-visible:opacity-100 group-active:opacity-100 transition-opacity">
                  →
                </span>
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="px-6 pb-10 space-y-5 shrink-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35 }}
          >
            <div className="flex items-center gap-2.5" role="group" aria-label="Accent theme">
              {Object.entries(ACCENTS).map(([name, c]) => (
                <button
                  key={name}
                  onClick={() => applyAccent(name)}
                  aria-label={`Theme ${name}`}
                  className="w-5 h-5 rounded-full border border-bg"
                  style={{ background: c.acc }}
                />
              ))}
              <span className="text-[11px] text-faint ml-1">theme</span>
            </div>
            <div className="flex items-center gap-1 text-[13px]">
              <a
                href={cvPdfUrl}
                download="Daniel-Baravik-CV.pdf"
                className="border border-line2 px-4 py-2.5 inline-flex items-center gap-2 text-ink mr-2"
              >
                <FileDown className="w-4 h-4" />
                cv.pdf
              </a>
              <a
                href="https://github.com/danielml1003"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 text-dim hover:text-acc"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-baravik-429b38207/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 text-dim hover:text-acc"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:danielbaravik1003@gmail.com"
                aria-label="Email"
                className="p-2.5 text-dim hover:text-acc"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
