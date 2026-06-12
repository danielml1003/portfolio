import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Window from "./Window";
import ScrambleText from "./ScrambleText";
import cvPdfUrl from "../../Daniel Baravik - junior developer..pdf";

type Entry = { id: number; node: React.ReactNode };

const PROMPT = (
  <>
    <span className="text-mint">guest</span>
    <span className="text-faint">@</span>
    <span className="text-cyan">daniel</span>
    <span className="text-faint">:~$</span>
  </>
);

const FILES = ["about.md", "skills.json", "projects/", "cv.pdf", "secrets/"];

function Out({ children }: { children: React.ReactNode }) {
  return <div className="text-dim whitespace-pre-wrap break-words">{children}</div>;
}

function downloadCv() {
  const a = document.createElement("a");
  a.href = cvPdfUrl;
  a.download = "Daniel-Baravik-CV.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const HELP: Array<[string, string]> = [
  ["help", "you are here"],
  ["whoami", "identify yourself"],
  ["ls", "list files"],
  ["cat <file>", "read a file (try about.md)"],
  ["projects", "featured repositories"],
  ["skills", "tech stack summary"],
  ["socials", "where to find me"],
  ["cv", "download my CV"],
  ["open github|linkedin", "jump to a profile"],
  ["date", "current time"],
  ["clear", "wipe the screen"],
  ["sudo hire-me", "the shortcut"],
];

export default function TerminalSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = (node: React.ReactNode) =>
    setEntries((prev) => [...prev, { id: idRef.current++, node }]);

  useEffect(() => {
    push(
      <Out>
        <span className="text-acc">daniel.sh</span> v2.0 — interactive mode.
        {"\n"}type <span className="text-acc">help</span> to see what I respond
        to, or just poke around.
      </Out>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    push(
      <div className="break-words">
        {PROMPT} <span className="text-ink">{cmd}</span>
      </div>
    );
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 50));
    setHistIdx(-1);

    const [head, ...rest] = cmd.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    switch (head) {
      case "help":
        push(
          <Out>
            {HELP.map(([c, d]) => (
              <div key={c} className="grid grid-cols-[180px_1fr] gap-2">
                <span className="text-acc">{c}</span>
                <span>{d}</span>
              </div>
            ))}
          </Out>
        );
        break;

      case "whoami":
        push(
          <Out>
            guest — but the more interesting answer:{"\n"}
            <span className="text-ink">Daniel Baravik</span>, full-stack
            developer. python · typescript · rust. based in Israel, open to
            work.
          </Out>
        );
        break;

      case "ls":
        if (arg.startsWith("secrets")) {
          push(<Out><span className="text-rose">ls: secrets/: permission denied</span> — nice try though.</Out>);
        } else {
          push(
            <Out>
              {FILES.map((f) => (
                <span key={f} className={`inline-block w-40 ${f.endsWith("/") ? "text-cyan" : "text-ink"}`}>
                  {f}
                </span>
              ))}
            </Out>
          );
        }
        break;

      case "cat":
        if (!arg) push(<Out>usage: cat &lt;file&gt; — try cat about.md</Out>);
        else if (arg.includes("about"))
          push(
            <Out>
              # about.md{"\n"}Junior full-stack dev who likes owning the whole
              stack — schema, API, UI, deploy. Ships small, ships often, reads
              the error message twice.
            </Out>
          );
        else if (arg.includes("skills"))
          push(
            <Out>
              {`{ "languages": ["TypeScript", "Python", "Rust", "Java", "SQL"],\n  "frontend": ["React", "Tailwind", "Vite"],\n  "backend": ["Node.js", "Express", "GraphQL"],\n  "data": ["PostgreSQL", "MongoDB", "MySQL"],\n  "devops": ["Docker", "CI/CD", "Linux"] }`}
            </Out>
          );
        else if (arg.includes("cv")) {
          downloadCv();
          push(<Out>cv.pdf is binary — downloading it instead ✓</Out>);
        } else if (arg.includes("secret"))
          push(<Out><span className="text-rose">cat: permission denied.</span> the secrets stay secret.</Out>);
        else push(<Out>cat: {arg}: no such file</Out>);
        break;

      case "projects":
        push(
          <Out>
            <div>
              <span className="text-acc">shop-saver</span> — full-stack price
              tracker (python/ts/rust + docker)
            </div>
            <div>
              <span className="text-acc">music-genre-classification</span> — ML
              audio experiments (python)
            </div>
            <div>
              <span className="text-acc">portfolio</span> — this exact site
              (react/ts/tailwind)
            </div>
            <div className="mt-1">
              full list:{" "}
              <a
                className="text-cyan underline underline-offset-4"
                href="https://github.com/danielml1003"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/danielml1003
              </a>
            </div>
          </Out>
        );
        break;

      case "skills":
        push(
          <Out>
            TypeScript/React ▓▓▓▓▓▓▓▓░░ · Python ▓▓▓▓▓▓▓▓░░ · Node
            ▓▓▓▓▓▓▓░░░{"\n"}SQL ▓▓▓▓▓▓░░░░ · Docker ▓▓▓▓▓▓░░░░ · Rust
            ▓▓▓▓░░░░░░ (climbing)
          </Out>
        );
        break;

      case "socials":
      case "contact":
        push(
          <Out>
            github &nbsp;→{" "}
            <a className="text-cyan underline underline-offset-4" href="https://github.com/danielml1003" target="_blank" rel="noopener noreferrer">
              danielml1003
            </a>
            {"\n"}linkedin →{" "}
            <a className="text-cyan underline underline-offset-4" href="https://www.linkedin.com/in/daniel-baravik-429b38207/" target="_blank" rel="noopener noreferrer">
              daniel-baravik
            </a>
            {"\n"}email &nbsp;&nbsp;→{" "}
            <a className="text-cyan underline underline-offset-4" href="mailto:danielbaravik1003@gmail.com">
              danielbaravik1003@gmail.com
            </a>
          </Out>
        );
        break;

      case "cv":
      case "resume":
        downloadCv();
        push(<Out>fetching cv.pdf… download started ✓</Out>);
        break;

      case "open":
        if (arg.includes("github")) {
          window.open("https://github.com/danielml1003", "_blank");
          push(<Out>opening github ↗</Out>);
        } else if (arg.includes("linkedin")) {
          window.open("https://www.linkedin.com/in/daniel-baravik-429b38207/", "_blank");
          push(<Out>opening linkedin ↗</Out>);
        } else push(<Out>open what? try: open github | open linkedin</Out>);
        break;

      case "date":
        push(<Out>{new Date().toString()}</Out>);
        break;

      case "pwd":
        push(<Out>/home/guest/danielbaravik.portfolio</Out>);
        break;

      case "echo":
        push(<Out>{rest.length ? raw.trim().slice(5) : ""}</Out>);
        break;

      case "clear":
        setEntries([]);
        break;

      case "neofetch":
        push(
          <Out>
            <span className="text-acc">{" ██████╗ ██████╗\n ██╔══██╗██╔══██╗\n ██║  ██║██████╔╝\n ██████╔╝██╔══██╗\n ╚═════╝ ╚═════╝"}</span>
            {"\n"}user: daniel · os: developer-os · shell: full-stack/bash ·
            status: open_to_work
          </Out>
        );
        break;

      case "sudo":
        if (arg.includes("hire")) {
          push(
            <Out>
              <span className="text-mint">[sudo] access granted.</span>
              {"\n"}initiating hiring sequence…{"\n"}→ opening mail client with
              the only command that matters:
              {"\n"}
              <a
                className="text-acc underline underline-offset-4"
                href="mailto:danielbaravik1003@gmail.com?subject=Let's%20work%20together"
              >
                mail danielbaravik1003@gmail.com
              </a>
            </Out>
          );
          window.setTimeout(() => {
            window.location.href =
              "mailto:danielbaravik1003@gmail.com?subject=Let's%20work%20together";
          }, 900);
        } else {
          push(<Out>guest is not in the sudoers file. this incident will be reported. (try: sudo hire-me)</Out>);
        }
        break;

      case "rm":
        push(
          <Out>
            <span className="text-rose">rm: refusing to delete the portfolio.</span>{" "}
            I worked hard on this.
          </Out>
        );
        break;

      case "exit":
      case "quit":
        push(<Out>there is no escape. (acceptable exits: <span className="text-acc">cv</span>, <span className="text-acc">sudo hire-me</span>)</Out>);
        break;

      case "hello":
      case "hi":
      case "hey":
        push(<Out>hey! 👋 you found the terminal. type <span className="text-acc">help</span> and let's talk.</Out>);
        break;

      default:
        push(
          <Out>
            <span className="text-rose">command not found:</span> {head} — type{" "}
            <span className="text-acc">help</span>
          </Out>
        );
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next < 0 ? -1 : next);
      setInput(next < 0 ? "" : history[next] ?? "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <section id="terminal" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-12 font-mono">
          <p className="text-[13px] text-dim mb-2">
            <span className="text-acc">$</span> ssh guest@daniel — no password
            needed
          </p>
          <ScrambleText
            text="TRY THE TERMINAL"
            as="h2"
            className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-ink"
          />
          <p className="mt-4 text-[13px] text-dim max-w-lg leading-6">
            This one's real — it takes commands, keeps history (↑/↓), and has
            at least one undocumented feature.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            onClick={() => inputRef.current?.focus()}
            className="cursor-text"
          >
            <Window
              title="guest@daniel: ~ (ssh)"
              className="scanlines"
              contentClassName="p-0"
            >
              <div
                ref={scrollRef}
                role="log"
                aria-label="Terminal output"
                className="h-[380px] overflow-y-auto px-5 py-4 font-mono text-[13px] leading-6 space-y-1.5"
              >
                {entries.map((entry) => (
                  <div key={entry.id}>{entry.node}</div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="shrink-0">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent outline-none text-ink caret-[#c8ff3d] placeholder:text-faint/60 min-w-0"
                    placeholder="type 'help'…"
                    aria-label="Terminal input"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
              </div>
            </Window>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
