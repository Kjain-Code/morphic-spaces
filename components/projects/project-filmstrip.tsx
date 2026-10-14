"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/components/projects/project-data";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** How long each project stays in the centre before the next one slides in. */
const SLIDE_MS = 1500;
/** Duration of the slide itself. */
const MOVE_S = 0.65;

/**
 * Per-slot layout for the coverflow. Offset 0 is the large centre card;
 * ±1 / ±2 are the smaller cards tucked behind it on either side (the
 * fpssubtitle.com "Featured Films" reference). Anything further out sits
 * just beyond ±2, fully transparent, so cards fade in from the right and
 * fade out to the left as the strip advances. `x` is a percentage of the
 * card's own width.
 */
const SLOTS: Record<number, { x: number; scale: number; opacity: number; shade: number }> = {
  0: { x: 0, scale: 1, opacity: 1, shade: 0 },
  1: { x: 72, scale: 0.74, opacity: 1, shade: 0.35 },
  2: { x: 123, scale: 0.56, opacity: 0.9, shade: 0.55 },
  3: { x: 160, scale: 0.44, opacity: 0, shade: 0.7 },
};

function slotFor(offset: number) {
  const abs = Math.min(Math.abs(offset), 3);
  const slot = SLOTS[abs];
  const sign = offset < 0 ? -1 : 1;
  return { ...slot, x: slot.x * sign };
}

/**
 * "Selected Work" — an automatic horizontal coverflow carousel. One project
 * sits large in the centre and every few seconds the next one slides in from
 * the right while the previous one steps back to the left. No dragging,
 * clicking or hovering needed — it simply keeps moving through the whole
 * collection, looping endlessly. It pauses only while it is off-screen or
 * the tab is hidden, so it never jumps ahead unseen.
 */
export function ProjectFilmstrip({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useIsReducedMotion();
  const total = projects.length;

  // Only run while the section is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance, one project at a time.
  useEffect(() => {
    if (!inView || total < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      timer = setTimeout(() => {
        if (document.visibilityState === "visible") setActive((i) => (i + 1) % total);
        tick();
      }, SLIDE_MS);
    };
    tick();
    return () => clearTimeout(timer);
  }, [inView, total, active]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-[var(--charcoal-10)] bg-[var(--ivory)] py-12 sm:py-14"
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col gap-4 border-b border-[var(--charcoal-15)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--gold-dark)]">Selected Work</p>
            <p className="mt-3 text-sm font-light uppercase tracking-[0.22em] text-[var(--charcoal-70)]">Through the collection</p>
          </div>
        </div>
      </div>

      {/* Stage — full width so the side cards can run off the edges. */}
      <div className="relative mt-8 sm:mt-10">
        <div className="relative mx-auto aspect-[3/2] w-[min(66vw,25rem)]">
          {projects.map((project, index) => {
            // Shortest signed distance from the active card, looping round.
            let offset = (index - active + total) % total;
            if (offset > total / 2) offset -= total;
            const slot = slotFor(offset);
            const isCenter = offset === 0;
            const isHidden = Math.abs(offset) > 2;

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{ x: `${slot.x}%`, scale: slot.scale, opacity: slot.opacity }}
                transition={{ duration: prefersReducedMotion ? 0 : MOVE_S, ease: EASE }}
                className="absolute inset-0 overflow-hidden rounded-xl bg-[var(--charcoal)] shadow-[0_24px_60px_-20px_rgba(23,22,20,0.45)]"
                style={{ zIndex: 10 - Math.abs(offset), pointerEvents: isCenter ? "auto" : "none" }}
                aria-hidden={!isCenter}
              >
                <Image
                  src={project.image}
                  alt={isCenter ? `${project.title} — ${project.category} project in ${project.location}` : ""}
                  fill
                  sizes="(min-width: 640px) 400px, 66vw"
                  priority={index < 3}
                  loading={index < 3 ? undefined : isHidden ? "lazy" : "eager"}
                  className="object-cover"
                />

                {/* Side cards sit slightly darker so the centre one reads first. */}
                <motion.div
                  initial={false}
                  animate={{ opacity: slot.shade }}
                  transition={{ duration: prefersReducedMotion ? 0 : MOVE_S, ease: EASE }}
                  className="absolute inset-0 bg-black"
                />

                {/* Caption — only on the centre card. */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isCenter ? 1 : 0, y: isCenter || prefersReducedMotion ? 0 : 12 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: isCenter && !prefersReducedMotion ? 0.35 : 0, ease: EASE }}
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-5 sm:p-7"
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">
                    {project.number} — {project.category}
                  </span>
                  <p className="mt-2 font-serif text-xl font-light leading-tight text-[var(--ivory-90)] sm:text-3xl">{project.title}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--ivory-55)]">
                    {project.location} · {project.year}
                  </p>
                </motion.div>

                {isCenter && (
                  <a
                    href={`/projects/${project.id}`}
                    className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                    aria-label={`${project.title} — ${project.category}, ${project.location}, ${project.year}`}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Soft fade at both edges so the outer cards melt into the page. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[var(--ivory)] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[var(--ivory)] to-transparent sm:w-32" />
      </div>

      {/* Progress line — fills while the current project is on show. */}
      <div className="mx-auto mt-8 h-px w-[min(66vw,25rem)] overflow-hidden bg-[var(--charcoal-10)]">
        <motion.div
          key={active}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: inView ? SLIDE_MS / 1000 : 0, ease: "linear" }}
          className="h-full origin-left bg-[var(--gold-dark)]"
        />
      </div>
    </section>
  );
}
