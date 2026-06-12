import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  Hash,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Copy,
  TerminalSquare,
} from "lucide-react";
import cvPdfUrl from "../../Daniel Baravik - junior developer..pdf";

interface Action {
  id: string;
  label: string;
  hint: string;
  icon: React.ElementType;
  run: () => void;
}

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<Action[]>(() => {
    const goto = (id: string) => () => {
      onClose();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return [
      { id: "about", label: "go to: about", hint: "section", icon: Hash, run: goto("about") },
      { id: "skills", label: "go to: system specs", hint: "section", icon: Hash, run: goto("skills") },
      { id: "projects", label: "go to: selected work", hint: "section", icon: Hash, run: goto("projects") },
      { id: "terminal", label: "go to: terminal", hint: "section", icon: TerminalSquare, run: goto("terminal") },
      { id: "contact", label: "go to: contact", hint: "section", icon: Hash, run: goto("contact") },
      {
        id: "cv",
        label: "download cv.pdf",
        hint: "file",
        icon: FileDown,
        run: () => {
          onClose();
          const a = document.createElement("a");
          a.href = cvPdfUrl;
          a.download = "Daniel-Baravik-CV.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
      {
        id: "github",
        label: "open github profile",
        hint: "external",
        icon: Github,
        run: () => {
          onClose();
          window.open("https://github.com/danielml1003", "_blank");
        },
      },
      {
        id: "linkedin",
        label: "open linkedin",
        hint: "external",
        icon: Linkedin,
        run: () => {
          onClose();
          window.open("https://www.linkedin.com/in/daniel-baravik-429b38207/", "_blank");
        },
      },
      {
        id: "email",
        label: "send email",
        hint: "mailto",
        icon: Mail,
        run: () => {
          onClose();
          window.location.href = "mailto:danielbaravik1003@gmail.com";
        },
      },
      {
        id: "copy-email",
        label: "copy email address",
        hint: "clipboard",
        icon: Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText("danielbaravik1003@gmail.com");
          } catch {}
          onClose();
        },
      },
    ];
  }, [onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint.includes(q)
    );
  }, [actions, query]);

  useEffect(() => setSelected(0), [query, open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      // wait for the panel to mount
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selected]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[18vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ scale: 0.97, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg border border-line2 bg-panel shadow-[0_32px_80px_-16px_rgba(0,0,0,0.9)] font-mono"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 h-12">
              <Search className="w-4 h-4 text-faint shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type a command or search…"
                className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-faint/70"
                aria-label="Search commands"
              />
              <kbd className="text-[10px] text-faint border border-line px-1.5 py-0.5">
                esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-[13px] text-faint">
                  command not found: {query}
                </li>
              )}
              {filtered.map((action, i) => (
                <li key={action.id}>
                  <button
                    onClick={action.run}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-left transition-colors ${
                      i === selected
                        ? "bg-raise text-acc"
                        : "text-dim hover:text-ink"
                    }`}
                  >
                    <action.icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{action.label}</span>
                    <span className="text-[10px] text-faint uppercase tracking-wider">
                      {action.hint}
                    </span>
                    {i === selected && (
                      <CornerDownLeft className="w-3.5 h-3.5 shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-4 py-2 flex gap-4 text-[10px] text-faint">
              <span>↑↓ navigate</span>
              <span>↵ run</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
