import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Window from "./Window";
import ScrambleText from "./ScrambleText";
import TypeOnView from "./TypeOnView";
import GhostIndex from "./GhostIndex";

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
  ["frontend", "React · Tailwind CSS · Framer Motion · Vite"],
  ["backend", "Node.js · Express · Python · GraphQL"],
  ["databases", "PostgreSQL · MongoDB · MySQL · Firebase"],
  ["devops", "Docker · GitHub Actions · Linux"],
  ["uptime", "always-on, recompiles daily"],
];

const TIERS: Array<{
  label: string;
  note: string;
  color: string;
  dot: string;
  items: string[];
}> = [
  {
    label: "daily_driver",
    note: "reach for these without thinking",
    color: "text-mint",
    dot: "bg-mint",
    items: ["TypeScript", "React", "Python", "Node.js", "Tailwind CSS", "Git"],
  },
  {
    label: "comfortable",
    note: "shipped real things with them",
    color: "text-cyan",
    dot: "bg-cyan",
    items: ["PostgreSQL", "MongoDB", "Docker", "Express", "Linux", "GraphQL"],
  },
  {
    label: "leveling_up",
    note: "actively learning, watch this space",
    color: "text-amber",
    dot: "bg-amber",
    items: ["Rust", "system design", "CI/CD", "Java"],
  },
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
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <GhostIndex n="02" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 font-mono">
          <TypeOnView text="neofetch --stack" />
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
                  {PALETTE.map((c, i) => (
                    <motion.span
                      key={c}
                      className={`w-5 h-3 ${c}`}
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: reduced ? 0 : 0.3 + i * 0.05 }}
                    />
                  ))}
                </div>
              </div>

              {/* key/value rows */}
              <dl className="font-mono text-[13px] sm:text-sm leading-7 min-w-0">
                {FETCH_ROWS.map(([k, v], i) => (
                  <motion.div
                    key={k}
                    className="flex gap-3 min-w-0"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: reduced ? 0 : 0.1 + i * 0.05,
                    }}
                  >
                    <dt className="text-acc w-24 sm:w-28 shrink-0">{k}</dt>
                    <dd className="text-faint shrink-0">:</dd>
                    <dd className="text-ink/90 min-w-0 break-words">{v}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>

            {/* skill tiers — no made-up percentages */}
            <div className="mt-10 border-t border-line pt-6">
              <p className="font-mono text-[12px] text-faint mb-5">
                $ ls skills/ --group-by depth{" "}
                <span className="text-faint/60 hidden sm:inline">
                  — no fake percentages, just honest tiers
                </span>
              </p>
              <div className="space-y-5">
                {TIERS.map((tier, ti) => (
                  <div
                    key={tier.label}
                    className="grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-4 items-start font-mono"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: reduced ? 0 : ti * 0.1 }}
                      className="text-[13px]"
                    >
                      <span className={`${tier.color} font-semibold`}>
                        [{tier.label}]
                      </span>
                      <p className="text-faint text-[11px] mt-0.5 leading-4">
                        {tier.note}
                      </p>
                    </motion.div>
                    <div className="flex flex-wrap gap-2">
                      {tier.items.map((item, i) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 18,
                            delay: reduced ? 0 : ti * 0.1 + i * 0.05,
                          }}
                          whileHover={reduced ? undefined : { scale: 1.08, y: -2 }}
                          className="inline-flex items-center gap-2 border border-line bg-raise/60 px-3 py-1.5 text-[12px] text-ink/90 hover:border-acc/50 hover:text-acc transition-colors cursor-default"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${tier.dot}`} />
                          {item}
                        </motion.span>
                      ))}
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
