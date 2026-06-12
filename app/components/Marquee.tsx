import React from "react";

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

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative border-y border-line bg-bg2 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="ticker flex w-max items-center gap-0 py-3">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-mono text-[12px] tracking-[0.2em] text-faint"
          >
            <span className="px-6 hover:text-acc transition-colors">{item}</span>
            <span className="text-acc/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
