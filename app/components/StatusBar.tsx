import React, { useEffect, useState } from "react";
import { GitBranch, ArrowUp } from "lucide-react";
import { ACCENTS, applyAccent } from "@/lib/accent";

/**
 * StatusBar — fixed editor-style bottom bar with live local (Israel) time.
 */
export default function StatusBar() {
  const [time, setTime] = useState<string>("--:--:--");
  const [uptime, setUptime] = useState<string>("0:00");
  const [scrollPos, setScrollPos] = useState<string>("TOP");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jerusalem",
    });
    const start = Date.now();
    const tick = () => {
      setTime(fmt.format(new Date()));
      const s = Math.floor((Date.now() - start) / 1000);
      const m = Math.floor(s / 60);
      setUptime(
        m >= 60
          ? `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}m`
          : `${m}:${String(s % 60).padStart(2, "0")}`
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // vim-style position indicator: TOP / NN% / BOT
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setScrollPos(p < 0.02 ? "TOP" : p > 0.98 ? "BOT" : `${Math.round(p * 100)}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 h-7 border-t border-line bg-bg2/95 backdrop-blur-md font-mono text-[11px] select-none">
      <div className="h-full px-3 sm:px-5 flex items-center justify-between text-dim">
        <div className="flex items-center gap-4 min-w-0">
          <span className="flex items-center gap-1.5 text-acc">
            <GitBranch className="w-3 h-3" />
            main
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-mint text-mint" />
            open_to_work
          </span>
          <span className="hidden md:inline text-faint">
            utf-8 · react 19 · 0 errors · up {uptime}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* one-click accent themes */}
          <span className="hidden lg:flex items-center gap-1.5" role="group" aria-label="Accent theme">
            {Object.entries(ACCENTS).map(([name, c]) => (
              <button
                key={name}
                onClick={() => applyAccent(name)}
                aria-label={`Theme ${name}`}
                title={`theme ${name}`}
                className="w-2.5 h-2.5 rounded-full border border-bg hover:scale-125 transition-transform"
                style={{ background: c.acc }}
              />
            ))}
          </span>
          <span className="hidden sm:inline text-faint">israel</span>
          <span className="tabular-nums">{time} IDT</span>
          <span className="tabular-nums text-faint w-9 text-right">
            {scrollPos}
          </span>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex items-center gap-1 hover:text-acc transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            top
          </a>
        </div>
      </div>
    </div>
  );
}
