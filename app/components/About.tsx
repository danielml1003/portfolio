import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import TypeOnView from "./TypeOnView";

/* ----------------------------- timeline data ----------------------------- */

interface Commit {
  hash: string;
  type: string;
  msg: string;
  date: string;
  head?: boolean;
}

interface BranchBlock {
  kind: "branch";
  name: string;
  open?: boolean;
  commits: Commit[];
  /** static class strings so Tailwind can see them */
  c: { line: string; curve: string; dot: string; text: string };
}

interface MainBlock {
  kind: "commit";
  commit: Commit;
}

type TimelineItem = MainBlock | BranchBlock;

const CYAN = {
  line: "bg-cyan/50",
  curve: "border-cyan/50",
  dot: "bg-bg border-cyan",
  text: "text-cyan",
};
const AMBER = {
  line: "bg-amber/50",
  curve: "border-amber/50",
  dot: "bg-bg border-amber",
  text: "text-amber",
};

const TIMELINE: TimelineItem[] = [
  {
    kind: "commit",
    commit: {
      hash: "a1b2c3f",
      type: "init",
      msg: "curiosity installed — started with Java: checkers, chess tactics",
      date: "2019",
    },
  },
  {
    kind: "branch",
    name: "work/ls-tech",
    c: CYAN,
    commits: [
      {
        hash: "c4d5e6f",
        type: "feat(job)",
        msg: "full-stack developer @ LS-TECH — responsive web apps, CSS-in-JS, legacy refactors",
        date: "2020-21",
      },
    ],
  },
  {
    kind: "commit",
    commit: {
      hash: "4f7e21a",
      type: "feat(net)",
      msg: "client/server experiments — chat server, file transfer, sockets",
      date: "2020-22",
    },
  },
  {
    kind: "commit",
    commit: {
      hash: "9c0d3b2",
      type: "feat(ml)",
      msg: "music-genre-classification — python, inference scripts, QML UI",
      date: "2021",
    },
  },
  {
    kind: "branch",
    name: "service/idf",
    c: AMBER,
    commits: [
      {
        hash: "1d8f2c9",
        type: "serve(tech)",
        msg: "IT technician, IDF — keeping systems alive; discipline and pressure included",
        date: "2022-24",
      },
    ],
  },
  {
    kind: "commit",
    commit: {
      hash: "d4e5f6a",
      type: "feat(stack)",
      msg: "shop-saver — full-stack python + typescript + rust, dockerized",
      date: "2025",
    },
  },
  {
    kind: "commit",
    commit: {
      hash: "b5c6d7e",
      type: "feat(edu)",
      msg: "B.Sc computer science @ The Open University — in progress",
      date: "2025-",
    },
  },
  {
    kind: "branch",
    name: "work/unilink",
    open: true,
    c: CYAN,
    commits: [
      {
        hash: "f0a1b2c",
        type: "feat(job)",
        msg: "NOC @ Unilink — production monitoring, incident response, eyes on the graphs",
        date: "now",
      },
    ],
  },
  {
    kind: "commit",
    commit: {
      hash: "7b8c9d0",
      type: "feat(work)",
      msg: "winwin-shop — freelance build, delivered to a real client",
      date: "2026",
    },
  },
  {
    kind: "commit",
    commit: {
      hash: "e1f2a3b",
      type: "fix(habits)",
      msg: "read the error message — twice",
      date: "ongoing",
    },
  },
  {
    kind: "commit",
    commit: {
      hash: "HEAD",
      type: "chore(career)",
      msg: "working days, building nights — merging into a great dev team next. your repo here?",
      date: "now",
      head: true,
    },
  },
];

const ENV_VARS: Array<[string, string, boolean?]> = [
  ["DANIEL_BASE", '"Israel (UTC+3)"'],
  ["DANIEL_DAYJOB", '"NOC @ Unilink"'],
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

/* ------------------------------- components ------------------------------ */

function CommitBody({ commit }: { commit: Commit }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-[13px] sm:text-sm">
        <span className={commit.head ? "text-acc font-bold" : "text-acc/80"}>
          {commit.hash}
        </span>
        <span className="text-vio">{commit.type}:</span>
        <span className="text-faint text-[11px] ml-auto shrink-0">
          {commit.date}
        </span>
      </div>
      <p
        className={`mt-0.5 text-[13px] sm:text-sm leading-6 ${
          commit.head ? "text-ink" : "text-dim"
        }`}
      >
        {commit.msg}
      </p>
    </>
  );
}

const rowAnim = (reduced: boolean | null, delay: number) => ({
  initial: { opacity: 0, x: -16 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.6 } as const,
  transition: {
    duration: 0.5,
    delay: reduced ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative py-24 sm:py-32 blueprint overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--color-bg)_85%)] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 font-mono">
          <TypeOnView text="cat about.md && git log --graph --all" />
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
          {/* git graph timeline — main trunk + side branches (work, army) */}
          <div className="font-mono relative">
            <p className="text-[12px] text-faint mb-6 select-none">
              commit history — code on <span className="text-acc">main</span>,
              jobs on <span className="text-cyan">work/*</span>, service on{" "}
              <span className="text-amber">service/*</span>
            </p>
            <div className="relative">
              {/* main trunk draws itself in */}
              <motion.div
                className="absolute left-[5px] top-1 bottom-1 w-px bg-gradient-to-b from-acc/70 via-line2 to-acc/70 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <ul>
                {TIMELINE.map((item, i) => {
                  if (item.kind === "commit") {
                    const c = item.commit;
                    return (
                      <motion.li
                        key={c.hash}
                        className="relative pl-12 pb-7"
                        {...rowAnim(reduced, 0.1 + i * 0.07)}
                      >
                        <span
                          className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 ${
                            c.head
                              ? "bg-acc border-acc pulse-dot text-acc"
                              : "bg-bg border-line2"
                          }`}
                        />
                        <CommitBody commit={c} />
                      </motion.li>
                    );
                  }

                  // branch block: fork curve → offset lane → merge curve / open end
                  return (
                    <li key={item.name} className="relative pb-7">
                      {/* fork: ─╮ off the main trunk */}
                      <motion.div
                        className="relative h-6"
                        {...rowAnim(reduced, 0.1 + i * 0.07)}
                      >
                        <span
                          className={`absolute left-[5px] top-[7px] w-[22px] h-[24px] border-t border-r rounded-tr-lg ${item.c.curve}`}
                          aria-hidden="true"
                        />
                        <span
                          className={`absolute left-12 top-0 text-[11px] ${item.c.text}`}
                        >
                          git checkout -b {item.name}
                        </span>
                      </motion.div>

                      {/* branch lane */}
                      <div className="relative">
                        <motion.div
                          className={`absolute left-[26px] -top-1 w-px origin-top ${item.c.line} ${
                            item.open ? "-bottom-1" : "bottom-2"
                          }`}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{
                            duration: 0.7,
                            delay: reduced ? 0 : 0.15,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                        <ul>
                          {item.commits.map((c, ci) => (
                            <motion.li
                              key={c.hash}
                              className="relative pl-[68px] pt-2 pb-3"
                              {...rowAnim(reduced, 0.2 + ci * 0.08)}
                            >
                              <span
                                className={`absolute left-[21px] top-[15px] w-[11px] h-[11px] rounded-full border-2 ${item.c.dot}`}
                              />
                              <CommitBody commit={c} />
                            </motion.li>
                          ))}
                        </ul>

                        {/* merge back, or leave the branch running */}
                        {item.open ? (
                          <motion.p
                            className={`pl-[68px] pt-1 text-[11px] ${item.c.text}`}
                            {...rowAnim(reduced, 0.3)}
                          >
                            <span
                              className={`inline-block w-1.5 h-1.5 rounded-full mr-2 pulse-dot ${item.c.text}`}
                              style={{ background: "currentColor" }}
                            />
                            still running…
                          </motion.p>
                        ) : (
                          <motion.div
                            className="relative h-5"
                            {...rowAnim(reduced, 0.3)}
                          >
                            <span
                              className={`absolute left-[5px] -top-1 w-[22px] h-[14px] border-b border-r rounded-br-lg ${item.c.curve}`}
                              aria-hidden="true"
                            />
                            <span className="absolute left-12 top-0 text-[11px] text-faint">
                              git merge {item.name}{" "}
                              <span className={item.c.text}>
                                — lessons kept
                              </span>
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </li>
                  );
                })}
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
