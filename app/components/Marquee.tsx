import React from "react";
import VelocityMarquee from "./VelocityMarquee";

const ITEMS = [
  "REACT",
  "TYPESCRIPT",
  "PYTHON",
  "RUST",
  "NODE.JS",
  "DOCKER",
  "POSTGRESQL",
  "TAILWIND",
  "GIT",
  "LINUX",
  "CI/CD",
  "MONGODB",
];

/** Tech ticker — drifts on its own, accelerates with scroll velocity. */
export default function Marquee() {
  return (
    <VelocityMarquee
      baseVelocity={-35}
      skew={false}
      className="relative border-y border-line bg-bg2 overflow-hidden select-none"
    >
      <span className="flex items-center py-3">
        {ITEMS.map((item) => (
          <span
            key={item}
            className="flex items-center font-mono text-[12px] tracking-[0.2em] text-faint"
          >
            <span className="px-6 hover:text-acc transition-colors">{item}</span>
            <span className="text-acc/50">✦</span>
          </span>
        ))}
      </span>
    </VelocityMarquee>
  );
}
