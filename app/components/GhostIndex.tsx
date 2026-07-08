import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * GhostIndex — a giant outlined section numeral that parallaxes slower
 * than the content, sitting behind each section like a chapter mark.
 */
export default function GhostIndex({
  n,
  className,
}: {
  n: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { y }}
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none absolute top-10 right-2 sm:right-6 font-display font-bold leading-none text-outline opacity-50 text-[7rem] lg:text-[11rem] z-0",
        className
      )}
    >
      {n}
    </motion.div>
  );
}
