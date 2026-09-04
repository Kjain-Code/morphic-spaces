"use client";

import { PROJECTS } from "@/components/projects/project-data";

export interface ProjectIndexProps {
  activeNumber: string;
}

/** A minimal "01 — 02 — 03 — 04 — 05 — 06" index; the active number reads darker/heavier. */
export function ProjectIndex({ activeNumber }: ProjectIndexProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1" aria-hidden="true">
      {PROJECTS.map((project, index) => (
        <span key={project.number} className="flex items-center gap-3">
          <span
            className={`text-xs tabular-nums tracking-[0.15em] transition-colors duration-300 ${
              project.number === activeNumber ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"
            }`}
          >
            {project.number}
          </span>
          {index < PROJECTS.length - 1 && <span className="h-px w-3 bg-[var(--ink-10)]" />}
        </span>
      ))}
    </div>
  );
}
