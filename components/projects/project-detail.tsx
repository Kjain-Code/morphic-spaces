"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/components/projects/project-data";
import { PROJECT_COUNT } from "@/components/projects/project-data";

export interface ProjectDetailProps {
  project: Project;
  previous: Project;
  next: Project;
}

/**
 * Single project's detail page — a full-bleed hero (the same image used in
 * the /projects crossfade) followed by its existing copy laid out as an
 * editorial spread, then previous/next navigation between the six projects.
 * Deliberately reuses only the fields already in project-data.ts; no new
 * facts (location, year, client) are introduced here.
 */
export function ProjectDetail({ project, previous, next }: ProjectDetailProps) {
  return (
    <>
      <section className="relative h-[85svh] w-full overflow-hidden bg-[var(--stage)] sm:h-dvh">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 sm:pb-20">
          <div className="mx-auto max-w-7xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[0.3em] text-white/60"
            >
              {project.number} / {String(PROJECT_COUNT).padStart(2, "0")} — {project.category}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mt-5 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-white/95 sm:text-6xl lg:text-7xl"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-6 py-24 sm:px-10 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--stone)]"
          >
            <motion.span aria-hidden="true" className="inline-block" whileHover={{ x: -4 }} transition={{ duration: 0.25 }}>
              ←
            </motion.span>
            All Projects
          </Link>

          <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-[var(--ink-muted)]">
            Architecture / {project.category}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--ink)] sm:text-xl">{project.description}</p>
        </motion.div>
      </section>

      <section className="border-t border-white/10 bg-[var(--stage)] px-6 sm:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2">
          <ProjectNavLink label="Previous" project={previous} className="sm:border-r sm:border-white/10" />
          <ProjectNavLink label="Next" project={next} align="right" />
        </div>
      </section>
    </>
  );
}

function ProjectNavLink({
  label,
  project,
  align = "left",
  className = "",
}: {
  label: string;
  project: Project;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={`group flex flex-col gap-6 py-14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--stone)] sm:py-20 ${
        align === "right" ? "items-end text-right" : "items-start text-left"
      } ${className}`}
    >
      <span className="text-[11px] uppercase tracking-[0.3em] text-white/45">{label}</span>
      <span className="font-serif text-2xl font-light text-white/90 transition-colors group-hover:text-white sm:text-3xl">
        {project.title}
      </span>
      <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">
        {project.number} — {project.category}
      </span>
    </Link>
  );
}
