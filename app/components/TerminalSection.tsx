import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Window from "./Window";
import ScrambleText from "./ScrambleText";
import TypeOnView from "./TypeOnView";
import Snake from "./Snake";
import GhostIndex from "./GhostIndex";
import { MATRIX_EVENT } from "./MatrixRain";
import { ACCENTS, applyAccent } from "@/lib/accent";
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
  ["git log", "my journey, condensed"],
  ["projects", "featured repositories"],
  ["skills", "tech stack summary"],
  ["socials", "where to find me"],
  ["cv", "download my CV"],
  ["open github|linkedin", "jump to a profile"],
  ["theme <color>", "lime · cyan · amber · violet · rose"],
  ["snake", "🐍 — yes, really"],
  ["cowsay <msg>", "wisdom, bovine edition"],
  ["date", "current time"],
  ["clear", "wipe the screen"],
  ["sudo hire-me", "the shortcut"],
];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "up late? respect.";
  if (h < 12) return "good morning.";
  if (h < 18) return "good afternoon.";
  if (h < 23) return "good evening.";
  return "night owl mode detected.";
}

function cowsay(msg: string): string {
  const words = (msg || "moo. hire daniel.").split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > 34) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  const width = Math.max(...lines.map((l) => l.length));
  const top = " " + "_".repeat(width + 2);
  const bottom = " " + "-".repeat(width + 2);
  const body = lines
    .map((l, i) => {
      const pad = l.padEnd(width, " ");
      if (lines.length === 1) return `< ${pad} >`;
      if (i === 0) return `/ ${pad} \\`;
      if (i === lines.length - 1) return `\\ ${pad} /`;
      return `| ${pad} |`;
    })
    .join("\n");
  const cow = String.raw`        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||`;
  return `${top}\n${body}\n${bottom}\n${cow}`;
}

export default function TerminalSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [mode, setMode] = useState<"shell" | "vim">("shell");
  const [gameActive, setGameActive] = useState(false);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = (node: React.ReactNode) =>
    setEntries((prev) => [...prev, { id: idRef.current++, node }]);

  useEffect(() => {
    push(
      <Out>
        <span className="text-acc">daniel.sh</span> v2.1 — {greeting()}
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

    // trapped in vim — the only way out is the ancient ritual
    if (mode === "vim") {
      push(
        <div className="break-words">
          <span className="text-mint">-- INSERT --</span>{" "}
          <span className="text-ink">{cmd}</span>
        </div>
      );
      if (/^:(q!?|wq|x)$/.test(cmd)) {
        setMode("shell");
        push(
          <Out>
            <span className="text-mint">✓ escaped vim.</span> wrote nothing,
            lost nothing. you may brag about this.
          </Out>
        );
      } else {
        push(
          <Out>
            <span className="text-rose">E492: Not an editor command:</span>{" "}
            {cmd || "(nothing)"} — the exit is <span className="text-acc">:q</span>
          </Out>
        );
      }
      return;
    }

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
            developer. NOC @ Unilink by day, building with python · typescript
            · rust by night. based in Israel, open to dev roles.
          </Out>
        );
        break;

      case "git":
        if (arg.startsWith("log")) {
          push(
            <Out>
              <span className="text-acc">a1b2c3f</span> init: java — checkers,
              chess (2019){"\n"}
              <span className="text-cyan">c4d5e6f</span> work: full-stack dev @
              LS-TECH (2020-21){"\n"}
              <span className="text-amber">1d8f2c9</span> service: IT
              technician, IDF (2022-24){"\n"}
              <span className="text-acc">d4e5f6a</span> feat: shop-saver —
              py/ts/rust (2025){"\n"}
              <span className="text-cyan">f0a1b2c</span> work: NOC @ Unilink
              (now){"\n"}
              <span className="text-acc">HEAD</span> chore(career): your repo
              here?
            </Out>
          );
        } else {
          push(<Out>this terminal only knows one trick: git log</Out>);
        }
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
              <span className="text-acc">winwin-shop</span> — client e-commerce
              build (private repo — ask me about it)
            </div>
            <div>
              <span className="text-acc">music-genre-classification</span> — ML
              audio experiments (python)
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
            <span className="text-mint">[daily_driver]</span> typescript ·
            react · python · node · tailwind · git{"\n"}
            <span className="text-cyan">[comfortable]</span> postgres · mongo ·
            docker · express · linux{"\n"}
            <span className="text-amber">[leveling_up]</span> rust · system
            design · ci/cd
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

      case "theme": {
        if (!arg) {
          push(
            <Out>
              usage: theme &lt;color&gt; — available:{" "}
              {Object.keys(ACCENTS).map((name, i) => (
                <span key={name}>
                  {i > 0 && " · "}
                  <span style={{ color: ACCENTS[name].acc }}>{name}</span>
                </span>
              ))}
            </Out>
          );
        } else if (applyAccent(arg)) {
          push(
            <Out>
              <span className="text-acc">✓ theme set to {arg}</span> — the whole
              workstation just recompiled its colors.
            </Out>
          );
        } else {
          push(
            <Out>
              unknown theme: {arg} — try{" "}
              {Object.keys(ACCENTS).join(" · ")}
            </Out>
          );
        }
        break;
      }

      case "snake": {
        if (window.matchMedia("(pointer: coarse)").matches) {
          push(
            <Out>
              🐍 snake needs arrow keys — come back on a keyboard. (or enjoy
              everything else here)
            </Out>
          );
          break;
        }
        setGameActive(true);
        push(
          <Snake
            onExit={(score, hi) => {
              setGameActive(false);
              push(
                <Out>
                  snake exited — score{" "}
                  <span className="text-acc">{score}</span>, best{" "}
                  <span className="text-acc">{hi}</span>.{" "}
                  {score >= 10
                    ? "ok that's genuinely good."
                    : "the food was ◆ by the way."}
                </Out>
              );
              window.setTimeout(() => inputRef.current?.focus(), 50);
            }}
          />
        );
        break;
      }

      case "cowsay":
        push(<Out>{cowsay(raw.trim().slice(7))}</Out>);
        break;

      case "matrix":
        window.dispatchEvent(new CustomEvent(MATRIX_EVENT));
        push(<Out>wake up, neo… (click or esc to exit)</Out>);
        break;

      case "vim":
      case "vi":
      case "nano":
        setMode("vim");
        push(
          <Out>
            <span className="text-faint">
              {"~\n~\n~    VIM - Vi IMproved (portfolio edition)\n~\n~    you are now inside vim.\n~    good luck getting out.\n~"}
            </span>
          </Out>
        );
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
    <section id="terminal" className="relative py-24 sm:py-32 overflow-hidden">
      <GhostIndex n="04" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-12 font-mono">
          <TypeOnView text="ssh guest@daniel — no password needed" />
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
            onClick={() => {
              if (!gameActive) inputRef.current?.focus();
            }}
            className="cursor-text"
            data-cursor="type"
          >
            <Window
              title="guest@daniel: ~ (ssh)"
              className="scanlines levitate"
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
                  <span className="shrink-0">
                    {mode === "vim" ? (
                      <span className="text-mint">-- INSERT --</span>
                    ) : (
                      PROMPT
                    )}
                  </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent outline-none text-ink caret-acc placeholder:text-faint/60 min-w-0"
                    placeholder={
                      gameActive
                        ? "snake has the keyboard — q to quit"
                        : mode === "vim"
                          ? "how do I exit this thing?"
                          : "type 'help'…"
                    }
                    aria-label="Terminal input"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    disabled={gameActive}
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
