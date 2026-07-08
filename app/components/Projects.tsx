import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { FolderGit2, ExternalLink, ArrowUpRight, Lock } from "lucide-react";
import ScrambleText from "./ScrambleText";
import TypeOnView from "./TypeOnView";
import data from "@/data/projects.json";

interface Language {
  name: string;
  pct: number;
  color: string;
}

interface ProjectType {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  github_url?: string;
  demo_url?: string | null;
  technologies: string[];
  languages?: Language[];
  year?: string;
  status?: string;
  visibility?: string;
  featured: boolean;
}

const projects = (data as { projects: ProjectType[] }).projects;

/* ------------------------------------------------------------- shared UI */

function LangStats({
  project,
  compact = false,
}: {
  project: ProjectType;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "pt-5" : ""}>
      <p className={`text-faint ${compact ? "text-[11px]" : "text-[12px]"}`}>
        $ git show --stat
      </p>

      {project.languages ? (
        <div className={compact ? "mt-3 space-y-3" : "mt-6 space-y-5"}>
          {project.languages.map((lang, li) => (
            <div key={lang.name}>
              <div
                className={`flex items-baseline justify-between ${
                  compact ? "text-[11px]" : "text-[13px]"
                }`}
              >
                <span className="flex items-center gap-2 text-dim">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: lang.color }}
                  />
                  {lang.name}
                </span>
                <span className="text-faint">{lang.pct}%</span>
              </div>
              <div
                className={`overflow-hidden bg-raise ${
                  compact ? "mt-1.5 h-1.5" : "mt-2 h-2"
                }`}
              >
                <motion.span
                  className="block h-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.pct}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + li * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ background: lang.color }}
                  title={`${lang.name} ${lang.pct}%`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`border border-line bg-raise/40 text-[12px] leading-6 text-faint ${
            compact ? "mt-3 p-4" : "mt-6 p-5"
          }`}
        >
          <p>{"// client work — repo private"}</p>
          <p>{"// happy to walk through the build live"}</p>
        </div>
      )}
    </div>
  );
}

function CardFooter({
  project,
  compact = false,
}: {
  project: ProjectType;
  compact?: boolean;
}) {
  const pad = compact ? "px-5 py-3" : "px-6 py-4";
  return (
    <div
      className={`mt-auto flex items-center border-t border-line ${
        compact ? "text-[12px]" : "text-[13px]"
      }`}
    >
      {project.github_url && (
        <a
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 ${pad} text-dim hover:text-acc hover:bg-raise transition-colors`}
        >
          git clone <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      )}
      {project.demo_url && (
        <a
          href={project.demo_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 ${pad} text-dim hover:text-acc hover:bg-raise transition-colors ${
            project.github_url ? "border-l border-line" : ""
          }`}
        >
          live demo <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
      {!project.github_url && !project.demo_url && (
        <span className={`flex items-center gap-1.5 ${pad} text-faint`}>
          <Lock className="w-3.5 h-3.5" />
          source: client-owned
        </span>
      )}
      <span
        className={`ml-auto flex items-center gap-2 text-faint ${
          compact ? "pr-5" : "pr-6"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            project.status === "active" ? "bg-mint" : "bg-amber"
          }`}
        />
        {project.status}
        {project.year ? ` · ${project.year}` : ""}
      </span>
    </div>
  );
}

function CardInner({
  project,
  index,
  compact = false,
}: {
  project: ProjectType;
  index: number;
  compact?: boolean;
}) {
  const isPrivate = project.visibility === "private";

  const number = (
    <span
      aria-hidden
      className={`font-display font-bold leading-none text-outline select-none ${
        compact ? "text-3xl" : "text-7xl"
      }`}
    >
      0{index + 1}
    </span>
  );

  const heading = (
    <div
      className={
        compact
          ? "flex items-center gap-2.5"
          : "flex flex-wrap items-center gap-x-3 gap-y-2"
      }
    >
      {isPrivate ? (
        <Lock
          className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-amber shrink-0`}
        />
      ) : (
        <FolderGit2
          className={`${compact ? "w-4 h-4" : "w-5 h-5"} text-acc shrink-0`}
        />
      )}
      <h3
        className={
          compact
            ? "text-ink font-semibold text-[15px] truncate"
            : "font-display font-bold text-4xl tracking-tight text-ink min-w-0"
        }
      >
        {project.name}
      </h3>
      <span
        className={`${
          compact ? "ml-auto " : ""
        }shrink-0 text-[10px] uppercase tracking-wider border px-1.5 py-0.5 ${
          isPrivate ? "border-amber/40 text-amber" : "border-line2 text-dim"
        }`}
      >
        {isPrivate ? "private" : "public"}
      </span>
    </div>
  );

  const tagline = project.tagline ? (
    <p
      className={
        compact ? "pt-1 text-[12px] text-faint" : "mt-2 text-sm text-dim"
      }
    >
      — {project.tagline}
    </p>
  ) : null;

  const description = (
    <p
      className={
        compact
          ? "pt-3 text-[13px] leading-6 text-dim"
          : "mt-5 max-w-xl text-[15px] leading-7 text-dim"
      }
    >
      {project.description}
    </p>
  );

  const chips = (
    <div
      className={`flex flex-wrap ${
        compact ? "gap-1.5 pt-4" : "gap-2 mt-6"
      }`}
    >
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="text-[11px] text-cyan/90 bg-cyan/5 border border-cyan/15 px-2 py-0.5"
        >
          {tech.toLowerCase()}
        </span>
      ))}
    </div>
  );

  if (compact) {
    return (
      <>
        <div className="flex-1 p-5">
          {number}
          <div className="mt-3">{heading}</div>
          {tagline}
          {description}
          {chips}
          <LangStats project={project} compact />
        </div>
        <CardFooter project={project} compact />
      </>
    );
  }

  return (
    <>
      <div className="grid flex-1 grid-cols-[1fr_360px] gap-12 p-10 xl:p-14">
        <div className="flex min-w-0 flex-col">
          {number}
          <div className="mt-8">{heading}</div>
          {tagline}
          {description}
          {chips}
        </div>
        <div className="flex min-w-0 flex-col justify-center">
          <LangStats project={project} />
        </div>
      </div>
      <CardFooter project={project} />
    </>
  );
}

/* --------------------------------------------- mobile / tablet (< lg) */

function MobileCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group sheen relative flex flex-col border border-line bg-panel hover:border-acc/50 hover:-translate-y-1 transition-all duration-300 font-mono"
    >
      <CardInner project={project} index={index} compact />
    </motion.article>
  );
}

/* --------------------------------------------- desktop sticky stack (lg+) */

function StackedCard({
  project,
  index,
  total,
  progress,
  reduced,
}: {
  project: ProjectType;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const isLast = index === total - 1;
  const denom = Math.max(total - 1, 1);
  // window of container progress during which the NEXT card slides over this one
  const rangeStart = Math.min(index / denom + 0.05, 0.98);
  const rangeEnd = Math.max(Math.min((index + 1) / denom, 1), rangeStart + 0.01);

  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, 0.96]);
  const brightness = useTransform(progress, [rangeStart, rangeEnd], [1, 0.6]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <div
      className={`sticky ${index > 0 ? "mt-10" : ""}`}
      style={{ top: `calc(96px + ${index * 28}px)` }}
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 36 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={
          reduced || isLast
            ? undefined
            : { scale, filter, transformOrigin: "top center" }
        }
        className="group sheen relative flex min-h-[68vh] flex-col border border-line bg-panel font-mono transition-colors duration-300 hover:border-acc/50"
      >
        <CardInner project={project} index={index} />
      </motion.article>
    </div>
  );
}

function DesktopStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={stackRef} className="relative hidden lg:block">
      {projects.map((project, i) => (
        <StackedCard
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          progress={scrollYProgress}
          reduced={!!reduced}
        />
      ))}
      {/* scroll runway so the last card reaches its stick offset and the stack rests */}
      <div aria-hidden className="h-[20vh]" />
    </div>
  );
}

/* ------------------------------------------------------------- section */

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-bg2 border-y border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 font-mono">
          <TypeOnView text="git log --oneline --featured" />
          <ScrambleText
            text="SELECTED WORK"
            as="h2"
            className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-ink"
          />
        </div>

        {/* mobile / tablet: simple stacked cards */}
        <div className="space-y-5 lg:hidden">
          {projects.map((project, i) => (
            <MobileCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* desktop: cinematic sticky-stacked showcase */}
        <DesktopStack />

        <motion.a
          href="https://github.com/danielml1003"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2 border border-dashed border-line2 py-4 font-mono text-[13px] text-dim hover:text-acc hover:border-acc/50 transition-colors"
        >
          $ git remote show origin — everything else lives on GitHub
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
