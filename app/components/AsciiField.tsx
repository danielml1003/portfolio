import React, { useEffect, useRef } from "react";

/**
 * AsciiField — an animated field of ASCII characters driven by value noise.
 * The cursor injects "energy" into the field; nearby cells glow in the accent
 * color and climb the character ramp. Renders to a single canvas.
 */

const RAMP = " ·:;+=xX#%@".split("");
const CELL = 16; // px between characters
const DIM_COLOR = "rgba(141, 154, 168, 1)";
const ACC_COLOR = "rgba(200, 255, 61, 1)";

// -- tiny value-noise implementation (no deps) ------------------------------
function hash3(x: number, y: number, z: number): number {
  let h = (x * 374761393 + y * 668265263 + z * 1274126177) | 0;
  h = (h ^ (h >>> 13)) | 0;
  h = (h * 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number, z: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const zf = smooth(z - zi);

  let v = 0;
  // trilinear interpolation of 8 lattice corners
  for (let dz = 0; dz <= 1; dz++) {
    const wz = dz ? zf : 1 - zf;
    for (let dy = 0; dy <= 1; dy++) {
      const wy = dy ? yf : 1 - yf;
      for (let dx = 0; dx <= 1; dx++) {
        const wx = dx ? xf : 1 - xf;
        v += hash3(xi + dx, yi + dy, zi + dz) * wx * wy * wz;
      }
    }
  }
  return v;
}

export default function AsciiField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let visible = true;
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;

    // mouse state, smoothed so the glow trails the cursor
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, energy: 0 };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `12px "JetBrains Mono", monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.energy = Math.min(mouse.energy + 0.12, 1);
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // ease the glow toward the cursor and decay its energy
      if (mouse.tx > -9000) {
        mouse.x += (mouse.tx - mouse.x) * 0.12;
        mouse.y += (mouse.ty - mouse.y) * 0.12;
      } else {
        mouse.energy = Math.max(mouse.energy - 0.01, 0);
      }
      mouse.energy = Math.max(mouse.energy - 0.004, mouse.tx > -9000 ? 0.55 : 0);

      const time = t * 0.00012;
      const glowR = Math.min(w, h) * 0.28;

      const dimCells: Array<[string, number, number, number]> = [];
      const accCells: Array<[string, number, number, number]> = [];

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const px = gx * CELL;
          const py = gy * CELL;

          // two octaves of drifting noise
          let v =
            valueNoise(gx * 0.055, gy * 0.075, time) * 0.65 +
            valueNoise(gx * 0.16, gy * 0.21, time * 1.7 + 50) * 0.35;

          // cursor energy
          let boost = 0;
          if (mouse.energy > 0.01) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const d2 = dx * dx + dy * dy;
            boost = Math.exp(-d2 / (glowR * glowR)) * mouse.energy;
          }

          const total = v * 0.72 + boost * 0.85;
          if (total < 0.3) continue; // empty cell — skip the draw call

          const idx = Math.min(
            RAMP.length - 1,
            Math.floor(((total - 0.3) / 0.7) * RAMP.length)
          );
          if (idx === 0) continue;

          const alpha = Math.min(0.08 + (total - 0.3) * 0.95, 0.95);
          const cell: [string, number, number, number] = [RAMP[idx], px, py, alpha];
          if (boost > 0.16) accCells.push(cell);
          else dimCells.push(cell);
        }
      }

      // two passes → only two fillStyle switches per frame
      ctx.fillStyle = DIM_COLOR;
      for (const [ch, x, y, a] of dimCells) {
        ctx.globalAlpha = a * 0.62;
        ctx.fillText(ch, x, y);
      }
      ctx.fillStyle = ACC_COLOR;
      for (const [ch, x, y, a] of accCells) {
        ctx.globalAlpha = a;
        ctx.fillText(ch, x, y);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (running && visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      // a single static frame for reduced-motion users
      draw(1000);
    } else {
      canvas.parentElement?.addEventListener("pointermove", onMove);
      canvas.parentElement?.addEventListener("pointerleave", onLeave);
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      io.observe(canvas);
      const onVis = () => {
        running = document.visibilityState === "visible";
      };
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        canvas.parentElement?.removeEventListener("pointermove", onMove);
        canvas.parentElement?.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVis);
        io.disconnect();
      };
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
