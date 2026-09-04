"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { Project } from "@/components/projects/project-data";
import { PROJECT_COUNT } from "@/components/projects/project-data";
import { ProjectIndex } from "@/components/projects/project-index";

export interface ProjectExperienceProps {
  projects: readonly [Project, Project];
  priorityFirstImage?: boolean;
}

/** The crossfade window, centered on the group's local scroll midpoint. */
const CROSSFADE_START = 0.4;
const CROSSFADE_END = 0.6;

/**
 * One "group" of two projects: a sticky two-column editorial spread on
 * desktop, where scrolling crossfades the left image and swaps the right
 * copy between the two projects (no image-swap/slideshow — both images stay
 * mounted, only opacity/scale/y move). Below `lg`, this collapses to a
 * simple stacked flow per the spec — no scroll-jacking, no pin, just image
 * then copy then the next project in normal document flow.
 */
export function ProjectExperience({ projects, priorityFirstImage = false }: ProjectExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = latest < 0.5 ? 0 : 1;
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const opacityA = useTransform(scrollYProgress, [0, CROSSFADE_START, CROSSFADE_END], [1, 1, 0]);
  const opacityB = useTransform(scrollYProgress, [CROSSFADE_START, CROSSFADE_END, 1], [0, 1, 1]);
  const scaleA = useTransform(scrollYProgress, [0, CROSSFADE_END], [1.03, 1]);
  const scaleB = useTransform(scrollYProgress, [CROSSFADE_START, 1], [1.03, 1]);
  const yA = useTransform(scrollYProgress, [0, CROSSFADE_END], [10, -10]);
  const yB = useTransform(scrollYProgress, [CROSSFADE_START, 1], [10, -10]);

  const [projectA, projectB] = projects;
  const active = projects[activeIndex];

  return (
    <>
      {/* Desktop / large tablet — sticky scroll-driven crossfade */}
      <section ref={containerRef} className="relative hidden lg:block" style={{ height: "220vh" }}>
        <div className="sticky top-0 flex h-dvh w-full">
          {/* LEFT — image, 60% */}
          <div className="relative h-full w-[60%] overflow-hidden bg-[var(--stage)]">
            <motion.div
              style={prefersReducedMotion ? { opacity: opacityA } : { opacity: opacityA, scale: scaleA, y: yA }}
              className="absolute inset-0"
            >
              <Image
                src={projectA.image}
                alt={`${projectA.title} — ${projectA.category}`}
                fill
                sizes="60vw"
                priority={priorityFirstImage}
                className="object-cover"
              />
            </motion.div>
            <motion.div
              style={prefersReducedMotion ? { opacity: opacityB } : { opacity: opacityB, scale: scaleB, y: yB }}
              className="absolute inset-0"
            >
              <Image src={projectB.image} alt={`${projectB.title} — ${projectB.category}`} fill sizes="60vw" className="object-cover" />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

            <div className="absolute bottom-8 left-8 text-[11px] tabular-nums tracking-[0.2em] text-white/60">
              {active.number} / {String(PROJECT_COUNT).padStart(2, "0")}
            </div>
          </div>

          {/* RIGHT — content, 40%, on the "paper" surface (editorial-spread contrast against the dark image) */}
          <div className="flex w-[40%] items-center bg-[var(--surface)] px-12 xl:px-16">
            <div className="w-full max-w-md">
              {/* popLayout (not "wait"): the outgoing block animates out
                  positioned absolute while the incoming one is already laid
                  out and animating in, so the two cross-fade with no blank
                  gap between them. */}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-serif text-3xl font-light text-[var(--stone)]">{active.number}</span>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[var(--ink-muted)]">{active.category}</p>
                  <h2 className="mt-4 font-serif text-3xl font-light leading-[1.15] text-[var(--ink)] xl:text-4xl">
                    {active.title}
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-[var(--ink-muted)]">{active.description}</p>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[var(--ink-muted)]">
                    Architecture / {active.category}
                  </p>

                  <Link
                    href={`/projects/${active.id}`}
                    className="group mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--stone)]"
                  >
                    View Project
                    <motion.span
                      aria-hidden="true"
                      className="inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="mt-16">
                <ProjectIndex activeNumber={active.number} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile / tablet — simple stacked flow, no pin, no scroll-jacking */}
      <div className="lg:hidden">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="relative h-[70svh] w-full sm:h-[80svh]">
              <Image
                src={project.image}
                alt={`${project.title} — ${project.category}`}
                fill
                sizes="100vw"
                priority={priorityFirstImage && index === 0}
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div className="bg-[var(--surface)] px-6 py-10 sm:px-10">
              <span className="font-serif text-2xl font-light text-[var(--stone)]">{project.number}</span>
              <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ink-muted)]">{project.category}</p>
              <h2 className="mt-3 font-serif text-3xl font-light leading-[1.15] text-[var(--ink)]">{project.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">{project.description}</p>
              <Link
                href={`/projects/${project.id}`}
                className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--stone)]"
              >
                View Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
