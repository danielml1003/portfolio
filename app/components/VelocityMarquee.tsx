import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/**
 * VelocityMarquee — infinite marquee that drifts on its own and reacts to
 * scroll: scrolling down accelerates it, scrolling up throws it into reverse,
 * and the strip skews slightly with the momentum. Children are repeated 4x
 * for a seamless wrap; only the first copy is exposed to screen readers.
 * Honors prefers-reduced-motion and pauses all rAF work while the marquee
 * is offscreen or the tab is hidden.
 */

const COPIES = 4;

/** Motion's `wrap(min, max, v)` — loops `v` inside [min, max). */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export default function VelocityMarquee({
  children,
  baseVelocity = 60,
  className,
  skew = true,
}: {
  /** One "unit" of content — repeated 4x internally for the seamless loop. */
  children: React.ReactNode;
  /** Baseline drift in px/s. Negative drifts leftward. */
  baseVelocity?: number;
  /** Applied to the outer section (borders, padding, bg). */
  className?: string;
  /** Skew the strip with scroll velocity (max ~±5deg). */
  skew?: boolean;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const stripWidth = useRef(0);
  const direction = useRef(1);
  const inView = useRef(true);
  const pageVisible = useRef(true);
  const motionOKRef = useRef(false);
  // Static until the effect confirms motion is OK — same DOM either way,
  // so there is no hydration mismatch or layout jump.
  const [motionOK, setMotionOK] = useState(false);

  // The classic Motion "scroll velocity" chain:
  // scrollY → velocity → spring smoothing → unitless speed factor.
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  // Slight italic lean with momentum, clamped to ±5deg.
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [-5, 5]);
  // 4 copies → one copy is 25% of the strip, so wrapping baseX into
  // [-25, 0) loops seamlessly.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  // prefers-reduced-motion — checked in an effect only; this app prerenders
  // in Node, so there is no window access during render.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      motionOKRef.current = !mq.matches;
      setMotionOK(!mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Skip frame work while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => {
      pageVisible.current = document.visibilityState === "visible";
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Skip frame work while the marquee is offscreen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Track the strip's pixel width so baseVelocity (px/s) maps onto x (%).
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const measure = () => {
      stripWidth.current = el.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!motionOKRef.current || !inView.current || !pageVisible.current) return;
    const width = stripWidth.current;
    if (width <= 0) return;

    // Clamp dt so the first frame after a pause can't teleport the strip.
    const dt = Math.min(delta, 64) / 1000;
    const pctPerPx = 100 / width;
    let moveBy = direction.current * baseVelocity * dt * pctPerPx;

    // Scrolling down speeds the drift up; scrolling up reverses it.
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor;

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section ref={sectionRef} className={className}>
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          ref={stripRef}
          className="flex whitespace-nowrap will-change-transform"
          style={skew && motionOK ? { x, skewX } : { x }}
        >
          {Array.from({ length: COPIES }, (_, i) => (
            <span key={i} className="block shrink-0" aria-hidden={i > 0}>
              {children}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
