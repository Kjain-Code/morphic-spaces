"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Project } from "@/components/projects/project-data";

const EASE = [0.22, 1, 0.36, 1] as const;

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} className={className} aria-hidden="true">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function FilterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} className={className} aria-hidden="true">
      <path stroke="currentColor" strokeLinecap="round" d="M4 7h16M7 12h10M10 17h4" />
    </svg>
  );
}

/** One card in the grid below the filter row — an image that unfolds open as it scrolls into view, then scales gently on hover. */
function ProjectCard({ project, aspect, priority }: { project: Project; aspect: string; priority?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 20 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <Link
        href={`/projects/${project.id}`}
        className={`group relative block w-full overflow-hidden rounded-xl bg-[var(--graphite)] ${aspect} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]`}
      >
        <motion.div
          initial={{ clipPath: "inset(14% 0 0 0)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          >
            <Image
              src={project.image}
              alt={`${project.title} — ${project.category} project in ${project.location}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={priority}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/25" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.7, rotate: -35 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ivory-45)] text-[var(--ivory-90)] transition-colors duration-300 group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--charcoal)]"
        >
          <ArrowIcon />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-2">
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="h-px w-6 bg-[var(--gold)]"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]"
            >
              {project.number} — {project.category}
            </motion.p>
          </div>
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.22 }}
            className="mt-2 font-serif text-xl font-light leading-tight text-[var(--ivory-90)] transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl"
          >
            {project.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ivory-45)]"
          >
            {project.location} · {project.year}
          </motion.p>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * The filter tabs + main project grid — the page's central experience.
 * Categories are derived from the real project data (not invented — this
 * studio's work only spans Residential and Interiors so far, so that's all
 * the filter offers); "All" always leads. Filtering swaps the grid with an
 * exit/pause/enter sequence rather than an instant cut. The grid itself
 * mirrors the client's reference rhythm — an opening row of three larger
 * cards, the rest following in an even row — rather than a single uniform
 * 3-column grid.
 */
export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = ["All"];
    for (const project of projects) {
      if (!seen.has(project.category)) {
        seen.add(project.category);
        list.push(project.category);
      }
    }
    return list;
  }, [projects]);

  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.category === active)),
    [active, projects],
  );

  const firstRow = filtered.slice(0, 3);
  const restRow = filtered.slice(3);

  return (
    <div id="gallery" className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)]">
      {/* Filter tabs */}
      <div className="border-b border-[var(--charcoal-10)] bg-[var(--ivory)] px-6 py-6 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {categories.map((category, index) => {
              const isActive = active === category;
              return (
                <motion.button
                  key={category}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
                  onClick={() => setActive(category)}
                  className={`relative pb-1.5 text-sm font-semibold uppercase tracking-[0.18em] transition-colors sm:text-base ${
                    isActive ? "text-[var(--charcoal)]" : "text-[var(--charcoal-70)] hover:text-[var(--charcoal)]"
                  }`}
                >
                  {category}
                  {isActive && (
                    <motion.span
                      layoutId="filter-underline"
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[var(--gold-dark)]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--charcoal-70)]">
            <FilterIcon className="h-4 w-4" />
            Filter
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        <AnimatePresence mode="wait">
          <motion.div key={active} className="flex flex-col gap-5">
            {firstRow.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {firstRow.map((project, index) => (
                  <ProjectCard key={project.id} project={project} aspect="aspect-[4/3]" priority={index === 0} />
                ))}
              </div>
            )}
            {restRow.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {restRow.map((project) => (
                  <ProjectCard key={project.id} project={project} aspect="aspect-[3/4]" />
                ))}
              </div>
            )}
            {filtered.length === 0 && (
              <p className="py-16 text-center text-sm text-[var(--ivory-45)]">No projects in this category yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
