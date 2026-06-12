import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, ArrowUpRight, Lock } from "lucide-react";
import ScrambleText from "./ScrambleText";
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

function RepoCard({ project, index }: { project: ProjectType; index: number }) {
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
      className="group relative flex flex-col border border-line bg-panel hover:border-acc/50 hover:-translate-y-1 transition-all duration-300 font-mono"
    >
      {/* header */}
      <div className="flex items-center gap-2.5 px-5 pt-5">
        {project.visibility === "private" ? (
          <Lock className="w-4 h-4 text-amber shrink-0" />
        ) : (
          <FolderGit2 className="w-4 h-4 text-acc shrink-0" />
        )}
        <h3 className="text-ink font-semibold text-[15px] truncate">
          {project.name}
        </h3>
        <span
          className={`ml-auto shrink-0 text-[10px] uppercase tracking-wider border px-1.5 py-0.5 ${
            project.visibility === "private"
              ? "border-amber/40 text-amber"
              : "border-line2 text-dim"
          }`}
        >
          {project.visibility === "private" ? "private" : "public"}
        </span>
      </div>

      {project.tagline && (
        <p className="px-5 pt-1 text-[12px] text-faint">— {project.tagline}</p>
      )}

      <p className="px-5 pt-3 text-[13px] leading-6 text-dim flex-1">
        {project.description}
      </p>

      {/* topics */}
      <div className="px-5 pt-4 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-[11px] text-cyan/90 bg-cyan/5 border border-cyan/15 px-2 py-0.5"
          >
            {tech.toLowerCase()}
          </span>
        ))}
      </div>

      {/* language bar */}
      {project.languages && (
        <div className="px-5 pt-4">
          <div className="flex h-1.5 overflow-hidden bg-raise">
            {project.languages.map((lang) => (
              <span
                key={lang.name}
                style={{ width: `${lang.pct}%`, background: lang.color }}
                title={`${lang.name} ${lang.pct}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2.5">
            {project.languages.map((lang) => (
              <span
                key={lang.name}
                className="flex items-center gap-1.5 text-[11px] text-dim"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: lang.color }}
                />
                {lang.name}{" "}
                <span className="text-faint">{lang.pct}%</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* footer */}
      <div className="mt-5 flex items-center border-t border-line text-[12px]">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-3 text-dim hover:text-acc hover:bg-raise transition-colors"
          >
            git clone <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-5 py-3 text-dim hover:text-acc hover:bg-raise transition-colors ${
              project.github_url ? "border-l border-line" : ""
            }`}
          >
            live demo <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        {!project.github_url && !project.demo_url && (
          <span className="flex items-center gap-1.5 px-5 py-3 text-faint">
            <Lock className="w-3.5 h-3.5" />
            source: client-owned
          </span>
        )}
        <span className="ml-auto pr-5 flex items-center gap-2 text-faint">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              project.status === "active" ? "bg-mint" : "bg-amber"
            }`}
          />
          {project.status}
          {project.year ? ` · ${project.year}` : ""}
        </span>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-bg2 border-y border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 font-mono">
          <p className="text-[13px] text-dim mb-2">
            <span className="text-acc">$</span> git log --oneline --featured
          </p>
          <ScrambleText
            text="SELECTED WORK"
            as="h2"
            className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-ink"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <RepoCard key={project.id} project={project} index={i} />
          ))}
        </div>

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
