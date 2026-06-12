import React from "react";
import { cn } from "@/lib/utils";

/**
 * Window — shared terminal-window chrome: traffic lights + a title tab.
 */
export default function Window({
  title,
  children,
  className,
  contentClassName,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative border border-line bg-panel/90 backdrop-blur-sm shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 h-10 select-none">
        <span className="w-3 h-3 rounded-full bg-rose/80" />
        <span className="w-3 h-3 rounded-full bg-amber/80" />
        <span className="w-3 h-3 rounded-full bg-mint/80" />
        <span className="ml-3 text-[12px] text-dim font-mono truncate">
          {title}
        </span>
        <span className="ml-auto text-faint text-[12px] font-mono hidden sm:block">
          — bash — 80×24
        </span>
      </div>
      <div className={cn("p-5 sm:p-7", contentClassName)}>{children}</div>
    </div>
  );
}
