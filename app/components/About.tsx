import React from "react";
import { motion } from "framer-motion";
import Window from "./Window";
import ScrambleText from "./ScrambleText";

const LINES: Array<{ kind: "h" | "p" | "c" | "b" | "gap"; text?: string }> = [
  { kind: "h", text: "# README.md" },
  { kind: "gap" },
  { kind: "c", text: "// who is this guy?" },
  {
    kind: "p",
    text: "Junior full-stack developer from Israel who likes owning the whole stack — schema, API, UI, deploy. I'd rather understand a thing deeply than use it blindly.",
  },
  { kind: "gap" },
  { kind: "c", text: "// how I work" },
  {
    kind: "b",
    text: "ship small, ship often — momentum beats perfection",
  },
  { kind: "b", text: "read the error message. then read it again" },
  { kind: "b", text: "if it's manual and boring, it gets a script" },
  { kind: "b", text: "strong opinions, loosely held, version-controlled" },
  { kind: "gap" },
  { kind: "c", text: "// currently" },
  {
    kind: "p",
    text: "Building side-projects across Python, TypeScript and Rust, and looking for my first full-time engineering role — somewhere I can learn fast and contribute faster.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 blueprint">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,var(--color-bg)_85%)] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 font-mono">
          <p className="text-[13px] text-dim mb-2">
            <span className="text-acc">$</span> cat about.md
          </p>
          <ScrambleText
            text="ABOUT"
            as="h2"
            className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-ink"
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Window title="~/daniel/about.md" contentClassName="p-0">
              <div className="font-mono text-[13px] sm:text-sm leading-7 overflow-x-auto">
                {LINES.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-12 shrink-0 text-right pr-4 text-faint/60 select-none border-r border-line mr-4">
                      {i + 1}
                    </span>
                    <span className="py-0 pr-6">
                      {line.kind === "h" && (
                        <span className="text-acc font-bold">{line.text}</span>
                      )}
                      {line.kind === "c" && (
                        <span className="text-faint italic">{line.text}</span>
                      )}
                      {line.kind === "p" && (
                        <span className="text-ink/90">{line.text}</span>
                      )}
                      {line.kind === "b" && (
                        <span className="text-ink/90">
                          <span className="text-vio">-</span> {line.text}
                        </span>
                      )}
                      {line.kind === "gap" && <span>&nbsp;</span>}
                    </span>
                  </div>
                ))}
              </div>
            </Window>
          </motion.div>

          {/* fact sheet */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[13px] space-y-px"
          >
            {[
              ["base", "Israel (UTC+3)"],
              ["focus", "full-stack web"],
              ["stack", "py · ts · rust"],
              ["status", "open_to_work"],
              ["coffee", "dangerous levels"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between border border-line bg-panel px-4 py-3 hover:border-line2 transition-colors"
              >
                <span className="text-faint">{k}:</span>
                <span className={k === "status" ? "text-mint" : "text-ink"}>
                  {v}
                </span>
              </div>
            ))}
            <p className="pt-4 text-faint leading-6">
              <span className="text-acc">tip:</span> there's a real terminal
              further down this page. it knows things this section doesn't.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
