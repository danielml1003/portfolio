import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileDown } from "lucide-react";
import AsciiField from "./AsciiField";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";
import cvPdfUrl from "../../Daniel Baravik - junior developer..pdf";

const ROLES = [
  "full-stack developer",
  "python · typescript · rust",
  "builds things end-to-end",
  "open to junior roles",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    let word = 0;
    let char = 0;
    let deleting = false;
    let t = 0;
    const step = () => {
      const current = words[word];
      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          t = window.setTimeout(step, 1700);
          return;
        }
        t = window.setTimeout(step, 55 + Math.random() * 50);
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
        t = window.setTimeout(step, 28);
      }
    };
    t = window.setTimeout(step, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return text;
}

const SOCIALS = [
  { icon: Github, url: "https://github.com/danielml1003", label: "GitHub" },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/daniel-baravik-429b38207/",
    label: "LinkedIn",
  },
  { icon: Mail, url: "mailto:danielbaravik1003@gmail.com", label: "Email" },
];

export default function Hero() {
  const role = useTypewriter(ROLES);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // content drifts up and fades as you scroll past the hero
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* interactive ascii background */}
      <div className="absolute inset-0">
        <AsciiField className="absolute inset-0 w-full h-full" />
        {/* readability vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,14,17,0.55)_70%,rgba(11,14,17,0.92)_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 flex-1 flex items-center pointer-events-none">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 w-full pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
            className="pointer-events-auto max-w-3xl"
          >
            {/* prompt line */}
            <p className="font-mono text-[13px] sm:text-sm text-dim mb-5">
              <span className="text-acc">$</span> whoami
              <span className="ml-3 inline-flex items-center gap-2 text-mint">
                <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-mint" />
                open_to_work
              </span>
            </p>

            {/* name — each line wipes up out of a clip */}
            <h1 className="font-display font-bold leading-[0.92] tracking-tight text-[clamp(3.2rem,12.5vw,9.5rem)] select-none">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ScrambleText text="DANIEL" as="span" className="block text-ink" />
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ScrambleText
                    text="BARAVIK"
                    as="span"
                    delay={250}
                    className="block text-acc"
                  />
                </motion.span>
              </span>
            </h1>

            {/* typed role */}
            <p className="mt-6 font-mono text-base sm:text-xl text-dim h-7">
              <span className="text-faint">&gt;</span>{" "}
              <span className="text-ink">{role}</span>
              <span className="caret" />
            </p>

            <p className="mt-6 max-w-xl font-mono text-[13px] sm:text-sm leading-relaxed text-dim">
              I design and ship complete things — from the database schema to
              the last pixel. Currently hunting for a team where I can build,
              break, learn and repeat.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3 font-mono text-sm">
              <Magnetic>
                <a
                  href="#projects"
                  data-cursor="view"
                  className="brackets group inline-block bg-acc text-bg px-5 py-2.5 font-medium hover:bg-acc-dim transition-colors"
                >
                  ./view_projects
                  <span className="inline-block ml-2 transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={cvPdfUrl}
                  download="Daniel-Baravik-CV.pdf"
                  data-cursor="save"
                  className="brackets border border-line2 text-ink px-5 py-2.5 hover:border-acc hover:text-acc transition-colors inline-flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  cv.pdf
                </a>
              </Magnetic>
              <div className="flex items-center gap-1 sm:ml-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-2.5 text-dim hover:text-acc transition-colors"
                  >
                    <s.icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* HUD — decorative telemetry on the right edge */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-end gap-3 font-mono text-[10px] tracking-[0.25em] text-faint select-none pointer-events-none"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-hidden="true"
      >
        <span>32.0853°N</span>
        <span>34.7818°E</span>
        <span className="w-px h-16 bg-line2 self-end mr-8" />
        <span className="text-acc/70">SYS::ONLINE</span>
        <span>PORTFOLIO v3</span>
      </motion.div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-1 text-faint hover:text-acc transition-colors font-mono text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        scroll
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
