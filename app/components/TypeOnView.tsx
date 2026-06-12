import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * TypeOnView — a "$ command" prompt line that types itself out
 * the first time it scrolls into view.
 */
export default function TypeOnView({
  text,
  className,
  speed = 26,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);
  const timer = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        if (reduced) {
          setShown(text.length);
          return;
        }
        let i = 0;
        timer.current = window.setInterval(() => {
          i++;
          setShown(i);
          if (i >= text.length) window.clearInterval(timer.current);
        }, speed);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer.current);
    };
  }, [text, speed]);

  const typing = shown > 0 && shown < text.length;

  return (
    <p ref={ref} className={cn("font-mono text-[13px] text-dim mb-2", className)}>
      <span className="text-acc">$</span>{" "}
      <span aria-label={text}>{text.slice(0, shown)}</span>
      {typing && <span className="caret" />}
    </p>
  );
}
