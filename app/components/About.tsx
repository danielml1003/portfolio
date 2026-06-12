import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import TypeOnView from "./TypeOnView";

const COMMITS: Array<{
  hash: string;
  type: string;
  msg: string;
  date: string;
  head?: boolean;
}> = [
  {
    hash: "a1b2c3f",
    type: "init",
    msg: "curiosity installed — started with Java: checkers, chess tactics",
    date: "2019",
  },
  {
    hash: "4f7e21a",
    type: "feat(net)",
    msg: "client/server experiments — chat server, file transfer, sockets",
    date: "2020-22",
  },
  {
    hash: "9c0d3b2",
    type: "feat(ml)",
    msg: "music-genre-classification — python, inference scripts, QML UI",
    date: "2021",
  },
  {
    hash: "d4e5f6a",
    type: "feat(stack)",
    msg: "shop-saver — full-stack python + typescript + rust, dockerized",
    date: "2025",
  },
  {
    hash: "7b8c9d0",
    type: "feat(work)",
    msg: "winwin-shop — first freelance build, delivered to a real client",
    date: "2026",
  },
  {
    hash: "e1f2a3b",
    type: "fix(habits)",
    msg: "read the error message — twice",
    date: "ongoing",
  },
  {
    hash: "HEAD",
    type: "chore(career)",
    msg: "merging into a great team — your repo here?",
    date: "now",
    head: true,
  },
];

const ENV_VARS: Array<[string, string, boolean?]> = [
  ["DANIEL_BASE", '"Israel (UTC+3)"'],
  ["DANIEL_FOCUS", '"full-stack web"'],
  ["DANIEL_STACK", '"py · ts · rust"'],
  ["DANIEL_STATUS", '"open_to_work"', true],
  ["DANIEL_COFFEE", '"dangerous levels"'],
];

const STATEMENT: Array<{ word: string; acc?: boolean }> = [
  { word: "I" },
  { word: "like" },
  { word: "owning" },
  { word: "the" },
  { word: "whole", acc: true },
  { word: "stack", acc: true },
  { word: "—" },
  { word: "schema," },
  { word: "API," },
  { word: "UI," },
  { word: "deploy." },
  { word: "Understanding" },
  { word: "deeply", acc: true },
  { word: "beats" },
  { word: "using" },
  { word: "blindly." },
];

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative py-24 sm:py-32 blueprint overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--color-bg)_85%)] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 font-mono">
          <TypeOnView text="cat about.md && git log --journey" />
          <ScrambleText
            text="ABOUT"
            as="h2"
            className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-ink"
          />
        </div>

        {/* statement — staggered word reveal */}
        <motion.p
          className="font-display text-2xl sm:text-4xl leading-snug max-w-3xl mb-16 sm:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduced ? 0 : 0.045 } },
          }}
        >
          {STATEMENT.map((w, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.3em] ${
                w.acc ? "text-acc" : "text-ink"
              }`}
              variants={{
                hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {w.word}
            </motion.span>
          ))}
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-8 items-start">
          {/* git log timeline */}
          <div className="font-mono relative">
            <p className="text-[12px] text-faint mb-6 select-none">
              commit history — the short version
            </p>
            <div className="relative pl-6">
              {/* the graph line draws itself in */}
              <motion.div
                className="absolute left-[5px] top-1 bottom-1 w-px bg-gradient-to-b from-acc/70 via-line2 to-acc/70 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <ul className="space-y-7">
                {COMMITS.map((c, i) => (
                  <motion.li
                    key={c.hash}
                    className="relative"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.5,
                      delay: reduced ? 0 : 0.15 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* commit dot */}
                    <span
                      className={`absolute -left-6 top-1.5 w-[11px] h-[11px] rounded-full border-2 ${
                        c.head
                          ? "bg-acc border-acc pulse-dot text-acc"
                          : "bg-bg border-line2"
                      }`}
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-[13px] sm:text-sm">
                      <span className={c.head ? "text-acc font-bold" : "text-acc/80"}>
                        {c.hash}
                      </span>
                      <span className="text-vio">{c.type}:</span>
                      <span className="text-faint text-[11px] ml-auto shrink-0">
                        {c.date}
                      </span>
                    </div>
                    <p
                      className={`mt-0.5 text-[13px] sm:text-sm leading-6 ${
                        c.head ? "text-ink" : "text-dim"
                      }`}
                    >
                      {c.msg}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* env panel */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[13px]"
          >
            <p className="text-[12px] text-faint mb-3 select-none">
              $ env | grep DANIEL_
            </p>
            <div className="space-y-px">
              {ENV_VARS.map(([k, v, hot], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: reduced ? 0 : 0.2 + i * 0.07,
                  }}
                  className="border border-line bg-panel px-4 py-3 hover:border-acc/40 hover:bg-raise transition-colors group"
                >
                  <span className="text-cyan group-hover:text-acc transition-colors">
                    {k}
                  </span>
                  <span className="text-faint">=</span>
                  <span className={hot ? "text-mint" : "text-amber"}>{v}</span>
                </motion.div>
              ))}
            </div>
            <p className="pt-5 text-faint leading-6">
              <span className="text-acc">tip:</span> there's a real terminal
              further down this page. it knows things this section doesn't.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
