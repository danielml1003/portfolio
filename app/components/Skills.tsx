import React from "react";
import { motion } from "framer-motion";
import Window from "./Window";
import ScrambleText from "./ScrambleText";

const ASCII_DB = String.raw`
██████╗ ██████╗
██╔══██╗██╔══██╗
██║  ██║██████╔╝
██║  ██║██╔══██╗
██████╔╝██████╔╝
╚═════╝ ╚═════╝
`;

const FETCH_ROWS: Array<[string, string]> = [
  ["user", "daniel@workstation"],
  ["os", "Developer OS (curiosity-based)"],
  ["kernel", "problem-solver 6.1.0-stable"],
  ["shell", "full-stack/bash"],
  ["languages", "TypeScript · Python · Rust · Java · SQL"],
  ["frontend", "React · Tailwind CSS · Framer Motion · Vite"],
  ["backend", "Node.js · Express · Python · GraphQL"],
  ["databases", "PostgreSQL · MongoDB · MySQL · Firebase"],
  ["devops", "Docker · GitHub Actions · CI/CD · Linux"],
  ["learning", "Rust (deeper) · system design"],
  ["uptime", "always-on, recompiles daily"],
];

const PROC_BARS: Array<{ name: string; pct: number }> = [
  { name: "typescript/react", pct: 82 },
  { name: "python", pct: 78 },
  { name: "node/apis", pct: 70 },
  { name: "sql/databases", pct: 62 },
  { name: "docker/devops", pct: 58 },
  { name: "rust", pct: 44 },
];

const PALETTE = [
  "bg-rose",
  "bg-amber",
  "bg-acc",
  "bg-mint",
  "bg-cyan",
  "bg-vio",
  "bg-dim",
  "bg-ink",
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 font-mono">
          <p className="text-[13px] text-dim mb-2">
            <span className="text-acc">$</span> neofetch --stack
          </p>
          <ScrambleText
            text="SYSTEM SPECS"
            as="h2"
            className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-ink"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Window title="daniel@workstation: ~ (neofetch)">
            <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
              {/* ascii logo + palette */}
              <div className="font-mono select-none">
                <pre className="text-acc text-[11px] sm:text-[13px] leading-[1.15] drop-shadow-[0_0_18px_rgba(200,255,61,0.25)]">
                  {ASCII_DB}
                </pre>
                <div className="flex gap-1.5 mt-4" aria-hidden="true">
                  {PALETTE.map((c) => (
                    <span key={c} className={`w-5 h-3 ${c}`} />
                  ))}
                </div>
              </div>

              {/* key/value rows */}
              <dl className="font-mono text-[13px] sm:text-sm leading-7 min-w-0">
                {FETCH_ROWS.map(([k, v]) => (
                  <div key={k} className="flex gap-3 min-w-0">
                    <dt className="text-acc w-24 sm:w-28 shrink-0">{k}</dt>
                    <dd className="text-faint shrink-0">:</dd>
                    <dd className="text-ink/90 truncate sm:whitespace-normal">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* proficiency monitor */}
            <div className="mt-10 border-t border-line pt-6">
              <p className="font-mono text-[12px] text-faint mb-4">
                $ top -o proficiency{" "}
                <span className="text-faint/60">
                  — honest numbers, updated as I level up
                </span>
              </p>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                {PROC_BARS.map((bar, i) => (
                  <div key={bar.name} className="font-mono text-[12px]">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-dim">{bar.name}</span>
                      <span className="text-acc">{bar.pct}%</span>
                    </div>
                    <div className="h-2 bg-raise border border-line overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-acc-dim to-acc"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.15 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Window>
        </motion.div>
      </div>
    </section>
  );
}
