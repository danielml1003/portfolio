import React, { useEffect, useState } from "react";
import { GitBranch, ArrowUp } from "lucide-react";

/**
 * StatusBar — fixed editor-style bottom bar with live local (Israel) time.
 */
export default function StatusBar() {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jerusalem",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
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
            utf-8 · react 19 · 0 errors
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-faint">israel</span>
          <span className="tabular-nums">{time} IDT</span>
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
