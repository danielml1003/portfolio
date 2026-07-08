import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Elements that make the ring expand to its active size. */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, [data-cursor]';

const SPRING = { stiffness: 350, damping: 28 };

/**
 * Cursor — terminal-style pointer follower. A 4px accent dot rides the
 * exact pointer position while a square outline ring trails it on a
 * spring; the native cursor stays visible. The ring grows over
 * interactive elements, and `data-cursor="label"` on an element (or any
 * ancestor) shows a tiny label chip next to the ring — e.g.
 * `<a data-cursor="open">`. Mounts nothing on touch devices or when the
 * user prefers reduced motion. Render once at page level.
 */
export default function Cursor() {
  // The route is prerendered in Node, so every window/document check
  // lives in an effect and rendering is gated on state.
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!coarse.matches && !reduced.matches);
    update();
    coarse.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // hybrid devices
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    // Event delegation: one listener pair covers every element,
    // including ones mounted after this effect runs.
    const over = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return;
      setActive(e.target.closest(INTERACTIVE) !== null);
      setLabel(e.target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "");
    };

    const out = (e: PointerEvent) => {
      if (e.relatedTarget instanceof Element && e.relatedTarget.closest(INTERACTIVE)) return;
      setActive(false);
      setLabel("");
    };

    const leave = () => {
      setVisible(false);
      setActive(false);
      setLabel("");
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerenter", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerenter", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const anchor = cn(
    "pointer-events-none fixed left-0 top-0 z-[120] transition-opacity duration-150",
    visible ? "opacity-100" : "opacity-0"
  );

  return (
    <>
      {/* trailing ring + label chip */}
      <motion.div aria-hidden className={anchor} style={{ x: sx, y: sy }}>
        <div
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 border",
            "transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            active ? "size-11 border-acc" : "size-7 border-acc/60"
          )}
        />
        <AnimatePresence>
          {label !== "" && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-7 top-7 whitespace-nowrap bg-acc px-1.5 py-0.5 font-mono text-[10px] leading-none text-bg"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* exact pointer dot — no spring */}
      <motion.div aria-hidden className={anchor} style={{ x, y }}>
        <div className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acc" />
      </motion.div>
    </>
  );
}
