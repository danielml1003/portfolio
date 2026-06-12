import React, { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%&@01";

/**
 * ScrambleText — decodes text from glitch glyphs to the real string.
 * Plays once when it scrolls into view and replays on hover.
 */
export default function ScrambleText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  scrambleOnHover = true,
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  scrambleOnHover?: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef(0);
  const played = useRef(false);
  const elRef = useRef<HTMLElement | null>(null);

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    const totalFrames = Math.max(14, text.length * 2.2);
    frame.current = 0;

    const tick = () => {
      frame.current++;
      const progress = frame.current / totalFrames;
      const settled = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || i < settled) out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (frame.current < totalFrames) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          const id = window.setTimeout(run, delay);
          return () => window.clearTimeout(id);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [run, delay]);

  return (
    <Tag
      ref={elRef as React.Ref<any>}
      className={className}
      onMouseEnter={scrambleOnHover ? run : undefined}
      aria-label={text}
    >
      {display}
    </Tag>
  );
}
