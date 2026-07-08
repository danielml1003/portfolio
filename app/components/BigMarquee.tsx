import React from "react";
import VelocityMarquee from "./VelocityMarquee";

/**
 * BigMarquee — the giant outlined statement strip before the contact
 * section. Skews with scroll momentum; alternating outline/filled words.
 */
export default function BigMarquee() {
  return (
    <VelocityMarquee
      baseVelocity={70}
      className="relative border-t border-line bg-bg2/60 py-8 sm:py-12 overflow-hidden select-none"
    >
      <span className="flex items-baseline font-display font-bold uppercase leading-none text-[clamp(2.8rem,8vw,7rem)] tracking-tight">
        <span className="text-outline pr-8">LET'S BUILD</span>
        <span className="text-acc pr-8 text-[0.5em] self-center">✦</span>
        <span className="text-ink pr-8">SOMETHING</span>
        <span className="text-acc pr-8 text-[0.5em] self-center">✦</span>
        <span className="text-outline pr-8">OPEN TO WORK</span>
        <span className="text-acc pr-8 text-[0.5em] self-center">✦</span>
      </span>
    </VelocityMarquee>
  );
}
