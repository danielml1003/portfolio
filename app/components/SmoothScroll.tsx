import { useEffect } from "react";

/**
 * SmoothScroll — a ~90-line Lenis-style inertial scroller. Wheel input is
 * intercepted and eased toward its target with a lerp each frame, so the
 * page glides instead of stepping. Native scrolling (keyboard, scrollbar,
 * touch) stays untouched and resyncs the internal state via scroll events.
 * Hash-anchor clicks are routed through the same easing. Mounts nothing —
 * and does nothing on touch devices or for reduced-motion users, where
 * native scrolling is simply left alone.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let target = window.scrollY;
    let current = window.scrollY;
    let lastSet = window.scrollY;
    // ring of recent self-written positions — scroll events echoing these
    // are ours; anything else is external input to resync against
    let w1 = -1;
    let w2 = -1;
    let w3 = -1;
    let raf = 0;
    let running = false;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()));

    const loop = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        running = false;
      }
      w3 = w2;
      w2 = w1;
      w1 = lastSet;
      lastSet = Math.round(current);
      window.scrollTo(0, lastSet);
      if (running) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // let pinch-zoom and modifier scrolls behave natively
      if (e.ctrlKey) return;
      e.preventDefault();
      const mult = e.deltaMode === 1 ? 32 : 1; // line-mode deltas (firefox)
      target = clamp(target + e.deltaY * mult);
      start();
    };

    // scrollbar drags / keyboard / programmatic smooth scrolls move the page
    // without us — resync so we don't fight them. Our own scrollTo() writes
    // echo back as scroll events up to a few frames late, so anything that
    // matches a recently written position is ignored as our own echo.
    const onScroll = () => {
      const sy = window.scrollY;
      if (
        Math.abs(sy - lastSet) <= 1 ||
        Math.abs(sy - w1) <= 1 ||
        Math.abs(sy - w2) <= 1 ||
        Math.abs(sy - w3) <= 1
      )
        return;
      target = sy;
      current = sy;
      lastSet = sy;
    };

    // route in-page anchors through the same easing
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;
      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
      target = clamp(el.getBoundingClientRect().top + window.scrollY);
      start();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);

    // Watchdog: if rAF is being starved (weak device, background throttling)
    // the glide can't progress while wheel defaults are prevented — that
    // would brick scrolling. Detect a stalled glide and tear ourselves down;
    // the page falls back to plain native scrolling.
    let lastWatchY = window.scrollY;
    let stalled = 0;
    const teardown = () => {
      cancelAnimationFrame(raf);
      window.clearInterval(watchdog);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
    const watchdog = window.setInterval(() => {
      if (!running || Math.abs(target - current) < 4) {
        stalled = 0;
        lastWatchY = window.scrollY;
        return;
      }
      if (window.scrollY === lastWatchY) {
        if (++stalled >= 2) teardown();
      } else {
        stalled = 0;
      }
      lastWatchY = window.scrollY;
    }, 350);

    return teardown;
  }, []);

  return null;
}
