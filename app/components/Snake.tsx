import React, { useEffect, useReducer, useRef } from "react";

/**
 * Snake — an ASCII snake game that lives inside a terminal entry.
 * Arrows / WASD to steer, q or Esc to quit. Speeds up as you eat.
 */

const COLS = 22;
const ROWS = 12;
const START_SPEED = 150;
const MIN_SPEED = 70;

type Vec = { x: number; y: number };

interface GameState {
  snake: Vec[];
  dir: Vec;
  nextDir: Vec;
  food: Vec;
  score: number;
  hi: number;
  phase: "playing" | "over" | "done";
}

function randFood(snake: Vec[]): Vec {
  while (true) {
    const f = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
}

export default function Snake({
  onExit,
}: {
  onExit: (score: number, hi: number) => void;
}) {
  const [, rerender] = useReducer((x: number) => x + 1, 0);
  const state = useRef<GameState | null>(null);
  const exited = useRef(false);

  if (state.current === null) {
    const snake = [
      { x: 5, y: 6 },
      { x: 4, y: 6 },
      { x: 3, y: 6 },
    ];
    let hi = 0;
    if (typeof window !== "undefined") {
      try {
        hi = parseInt(localStorage.getItem("ws-snake-hi") ?? "0", 10) || 0;
      } catch {}
    }
    state.current = {
      snake,
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: randFood(snake),
      score: 0,
      hi,
      phase: "playing",
    };
  }

  useEffect(() => {
    const g = state.current!;
    let timer = 0;

    const finish = () => {
      if (exited.current) return;
      exited.current = true;
      g.phase = "done";
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey, true);
      rerender();
      onExit(g.score, g.hi);
    };

    const onKey = (e: KeyboardEvent) => {
      // while the game runs, it owns the keyboard
      e.stopPropagation();
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k))
        e.preventDefault();

      if (g.phase === "over") {
        finish();
        return;
      }
      if (k === "q" || k === "escape") {
        finish();
        return;
      }

      const d = g.dir;
      if ((k === "arrowup" || k === "w") && d.y !== 1) g.nextDir = { x: 0, y: -1 };
      else if ((k === "arrowdown" || k === "s") && d.y !== -1) g.nextDir = { x: 0, y: 1 };
      else if ((k === "arrowleft" || k === "a") && d.x !== 1) g.nextDir = { x: -1, y: 0 };
      else if ((k === "arrowright" || k === "d") && d.x !== -1) g.nextDir = { x: 1, y: 0 };
    };

    const tick = () => {
      if (g.phase !== "playing") return;
      g.dir = g.nextDir;
      const head = {
        x: g.snake[0].x + g.dir.x,
        y: g.snake[0].y + g.dir.y,
      };
      const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      const hitSelf = g.snake.some((s) => s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) {
        g.phase = "over";
        if (g.score > g.hi) {
          g.hi = g.score;
          try {
            localStorage.setItem("ws-snake-hi", String(g.hi));
          } catch {}
        }
        rerender();
        return;
      }
      g.snake.unshift(head);
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score++;
        g.food = randFood(g.snake);
      } else {
        g.snake.pop();
      }
      rerender();
      timer = window.setTimeout(tick, Math.max(MIN_SPEED, START_SPEED - g.score * 4));
    };

    window.addEventListener("keydown", onKey, true);
    timer = window.setTimeout(tick, START_SPEED);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const g = state.current;
  const grid: string[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => " ")
  );
  g.snake.forEach((s, i) => {
    if (s.y >= 0 && s.y < ROWS && s.x >= 0 && s.x < COLS)
      grid[s.y][s.x] = i === 0 ? "█" : "▓";
  });
  if (g.phase === "playing") grid[g.food.y][g.food.x] = "◆";

  return (
    <div className="my-2 select-none" aria-label="Snake game">
      <div className="inline-block border border-line2 bg-raise/40 px-3 py-2">
        <pre className="leading-[1.05] text-[13px]">
          {grid.map((row, y) => (
            <div key={y}>
              {row.map((cell, x) => {
                if (cell === "█")
                  return (
                    <span key={x} className="text-acc">
                      █
                    </span>
                  );
                if (cell === "▓")
                  return (
                    <span key={x} className="text-acc/70">
                      ▓
                    </span>
                  );
                if (cell === "◆")
                  return (
                    <span key={x} className="text-rose">
                      ◆
                    </span>
                  );
                return (
                  <span key={x} className="text-line">
                    ·
                  </span>
                );
              })}
            </div>
          ))}
        </pre>
      </div>
      <div className="text-[12px] text-dim mt-1.5">
        {g.phase === "over" ? (
          <span className="text-rose">
            game over — score {g.score}
            {g.score >= g.hi && g.score > 0 ? " ★ new best!" : ` (best ${g.hi})`}{" "}
            — press any key
          </span>
        ) : g.phase === "done" ? (
          <span className="text-faint">session ended</span>
        ) : (
          <>
            score <span className="text-acc">{g.score}</span> · best{" "}
            <span className="text-acc">{g.hi}</span> ·{" "}
            <span className="text-faint">arrows/wasd to steer · q to quit</span>
          </>
        )}
      </div>
    </div>
  );
}
