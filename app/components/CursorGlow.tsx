import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CursorGlow — a huge, soft accent-colored orb that drifts after the
 * pointer behind the whole page, like a flashlight over the workstation.
 * Pure decoration: pointer-events-none, screen blend, very low opacity.
 * Mounts nothing on touch devices or for reduced-motion users.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.9 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.9 });

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] mix-blend-screen"
      style={{ x: sx, y: sy }}
    >
      <div
        className="w-[46rem] h-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, var(--color-acc) 0%, transparent 60%)",
        }}
      />
    </motion.div>
  );
}
