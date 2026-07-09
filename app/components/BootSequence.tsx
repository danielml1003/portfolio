import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  "BARAVIK-OS v2.0.26 — initializing workstation",
  "[ ok ] mounting /dev/curiosity",
  "[ ok ] loading modules: react · typescript · python · rust",
  "[ ok ] establishing uplink: github.com/danielml1003",
  "[ ok ] coffee.service started",
  "[ ok ] status: open_to_work",
  "launching portfolio…",
];

/**
 * BootSequence — a fast, skippable fake boot log shown once per session.
 * Click anywhere or press any key to skip.
 */
export default function BootSequence({ onDone }: { onDone?: () => void }) {
  const [active, setActive] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem("ws-booted", "1");
    } catch {}
    setActive(false);
    onDone?.();
  };

  useEffect(() => {
    let booted = "1";
    try {
      booted = sessionStorage.getItem("ws-booted") ?? "";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (booted || reduced) {
      finished.current = true;
      onDone?.();
      return;
    }

    setActive(true);
    const timers: number[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setLineCount(i + 1), 90 + i * 170));
    });
    timers.push(
      window.setTimeout(finish, 90 + BOOT_LINES.length * 170 + 420)
    );

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] bg-bg crt flex items-center justify-center cursor-pointer select-none"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          aria-hidden="true"
        >
          <div className="scanlines absolute inset-0" />
          <div className="w-full max-w-xl px-6 font-mono text-[13px] leading-7">
            <div className="flex items-center justify-between text-[11px] text-faint mb-4">
              <span>BARAVIK-OS</span>
              <span className="text-acc tabular-nums">
                LOADING {Math.min(100, Math.round((lineCount / BOOT_LINES.length) * 100))}%
              </span>
            </div>
            <div className="h-px bg-line mb-6 overflow-hidden">
              <div
                className="h-full bg-acc transition-all duration-200 ease-out"
                style={{
                  width: `${Math.min(100, (lineCount / BOOT_LINES.length) * 100)}%`,
                }}
              />
            </div>
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <div key={i} className={i === 0 ? "text-acc" : "text-dim"}>
                {line.startsWith("[ ok ]") ? (
                  <>
                    <span className="text-mint">[ ok ]</span>
                    {line.slice(6)}
                  </>
                ) : (
                  line
                )}
              </div>
            ))}
            <span className="caret text-acc" />
            <div className="mt-8 text-faint text-[11px]">
              press any key to skip
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
