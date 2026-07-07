import React, { useEffect, useRef, useState } from "react";
import { currentAccent } from "@/lib/accent";

export const MATRIX_EVENT = "ws-matrix";

const GLYPHS =
  "アィウェオカキクケコサシスセソタチツテトナニヌネノ0123456789<>[]{}$#@";

/**
 * MatrixRain — a full-screen digital rain overlay in the active accent
 * color. Triggered via the "ws-matrix" window event (terminal: `matrix`).
 * Click, Esc, or ~10s dismisses it.
 */
export default function MatrixRain() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const onTrigger = () => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        setActive(true);
    };
    window.addEventListener(MATRIX_EVENT, onTrigger);
    return () => window.removeEventListener(MATRIX_EVENT, onTrigger);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const color = currentAccent();
    const fontSize = 15;
    const cols = Math.ceil(w / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -40);
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(11, 14, 17, 0.14)";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // bright head, dimmer trail handled by the fade rect
        ctx.fillStyle = Math.random() > 0.9 ? "#ffffff" : color;
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.fillText(ch, x, y);
        ctx.globalAlpha = 1;
        if (y > h && Math.random() > 0.975) drops[i] = Math.random() * -20;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const dismiss = () => setActive(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    const timeout = window.setTimeout(dismiss, 10000);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[95] cursor-pointer"
      onClick={() => setActive(false)}
      role="presentation"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute bottom-10 inset-x-0 text-center font-mono text-[12px] text-dim">
        click or press esc to wake up
      </p>
    </div>
  );
}
