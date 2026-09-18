"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { Project } from "@/components/projects/project-data";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function ExploreIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={props.className} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="0.75" />
      <path d="M10 20h20m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * "Drag to Explore" — a horizontal strip of narrow project tiles that
 * expands the hovered (or tapped, on tablets) one into a wide preview,
 * adapted from the client's own supplied Skiper "HoverExpand" reference:
 * kept the concept (narrow rests, one wide active tile, image + caption)
 * but rebuilt on next/image, this codebase's own EASE/color tokens, and a
 * slower power-out-style transition so it reads as considered rather than
 * snappy. The track is independently draggable; the page itself never takes
 * on the horizontal overflow. It also drifts on its own — a slow, reversing
 * auto-scroll that pauses the moment a visitor hovers or drags — so the
 * collection reveals itself without requiring a first interaction.
 */
export function ProjectFilmstrip({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(projects[0]?.id ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, moved: false, startX: 0, startScrollLeft: 0 });
  const suppressClick = useRef(false);
  const autoScrollState = useRef({ direction: 1 as 1 | -1, paused: false });
  const prefersReducedMotion = useIsReducedMotion();
  const activeIndex = Math.max(
    0,
    projects.findIndex((project) => project.id === activeId),
  );
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    if (!activeProject) return;
    const gallery = galleryRef.current;
    if (!gallery) return;

    const updateActiveProject = () => {
      const galleryCenter = gallery.getBoundingClientRect().left + gallery.clientWidth / 2;
      let closestProject = activeProject;
      let closestDistance = Number.POSITIVE_INFINITY;

      gallery.querySelectorAll<HTMLElement>("[data-project-index]").forEach((tile) => {
        const rect = tile.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - galleryCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestProject = projects[Number(tile.dataset.projectIndex)] ?? closestProject;
        }
      });

      setActiveId((currentId) => (currentId === closestProject.id ? currentId : closestProject.id));
    };

    // The strip fires 'scroll' continuously — every drag pointermove and
    // every auto-drift animation frame both set scrollLeft directly, which
    // can raise far more than one 'scroll' event per frame. Recomputing the
    // closest tile (an 18-element querySelectorAll + getBoundingClientRect,
    // which forces layout) on every single one of those was the source of
    // the reported scroll/drag lag. Gate it behind requestAnimationFrame so
    // it runs at most once per rendered frame no matter how many 'scroll'
    // events land in between.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveProject();
        ticking = false;
      });
    };

    gallery.addEventListener("scroll", onScroll, { passive: true });
    return () => gallery.removeEventListener("scroll", onScroll);
  }, [activeProject, projects]);

  // A very slow, continuous drift across the strip — so the collection
  // "shows itself" even before anyone touches it — pausing the instant a
  // visitor hovers or drags, and reversing direction at either end rather
  // than snapping back to the start. Skipped entirely for reduced motion.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const gallery = galleryRef.current;
    if (!gallery) return;

    const SPEED = 0.35; // px per frame — gentle, not a marquee
    let rafId = 0;

    function step() {
      const maxScroll = gallery!.scrollWidth - gallery!.clientWidth;
      if (!autoScrollState.current.paused && !dragState.current.active && maxScroll > 0) {
        let next = gallery!.scrollLeft + SPEED * autoScrollState.current.direction;
        if (next >= maxScroll) {
          next = maxScroll;
          autoScrollState.current.direction = -1;
        } else if (next <= 0) {
          next = 0;
          autoScrollState.current.direction = 1;
        }
        gallery!.scrollLeft = next;
      }
      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const gallery = galleryRef.current;
    if (!gallery) return;

    dragState.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startScrollLeft: gallery.scrollLeft,
    };
    suppressClick.current = false;
    setIsDragging(false);
    gallery.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const gallery = galleryRef.current;
    if (!gallery || !dragState.current.active) return;

    const distance = event.clientX - dragState.current.startX;
    if (Math.abs(distance) < 5 && !dragState.current.moved) return;

    dragState.current.moved = true;
    suppressClick.current = true;
    setIsDragging(true);
    gallery.scrollLeft = dragState.current.startScrollLeft - distance;
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const gallery = galleryRef.current;
    if (gallery?.hasPointerCapture(event.pointerId)) gallery.releasePointerCapture(event.pointerId);
    dragState.current.active = false;
    setIsDragging(false);
  }

  function handleTileClick(event: React.MouseEvent<HTMLAnchorElement>, project: Project) {
    if (suppressClick.current) {
      event.preventDefault();
      suppressClick.current = false;
      return;
    }
    // Tap-to-expand, not hover-to-expand: the first tap on a tile just
    // widens it into preview (never navigates); tapping the tile again,
    // now that it's already the active/expanded one, follows the link.
    if (activeId !== project.id) {
      event.preventDefault();
      setActiveId(project.id);
    }
  }

  return (
    <section className="border-t border-[var(--charcoal-10)] bg-[var(--ivory)] py-16 sm:py-20" aria-label="Selected work">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col gap-4 border-b border-[var(--charcoal-15)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--gold-dark)]">Selected Work</p>
            <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-[var(--charcoal-70)] sm:text-base">
              Eighteen completed projects across architecture, interiors and commercial work — drag to move
              through the collection.
            </p>
          </div>
          <div className="flex items-center gap-4 self-start text-[10px] uppercase tracking-[0.2em] text-[var(--charcoal-70)] sm:self-end">
            <motion.span
              animate={prefersReducedMotion ? undefined : { x: [0, 4, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              Drag to explore
            </motion.span>
            <ExploreIcon className="h-11 w-11 text-[var(--gold-dark)]" />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">
          <span>Move across the collection</span>
          <span className="relative flex h-6 min-w-16 items-center justify-end overflow-hidden text-[var(--charcoal-70)]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeProject?.number}
                initial={{ y: prefersReducedMotion ? 0 : 12, opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: prefersReducedMotion ? 0 : -12, opacity: prefersReducedMotion ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: EASE }}
              >
                {activeProject?.number} / {String(projects.length).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <div className="relative mt-3 -mx-6 sm:-mx-10">
          <div
            ref={galleryRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => { autoScrollState.current.paused = true; }}
            onMouseLeave={() => { autoScrollState.current.paused = false; }}
            className={`flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-6 pb-3 scrollbar-none sm:gap-2 sm:px-10 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ touchAction: "pan-y" }}
            aria-label="Selected projects. Drag horizontally to explore."
          >
            <div className="flex min-w-[calc(100%+6rem)] snap-x snap-mandatory justify-start gap-1.5 sm:gap-2 md:justify-center">
              {projects.map((project, index) => {
              const isActive = activeId === project.id;

              return (
                <motion.a
                  key={project.id}
                  href={`/projects/${project.id}`}
                  data-project-index={index}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    width: isActive ? "min(20rem, 58vw)" : "5rem",
                  }}
                  transition={{
                    opacity: { duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.04 },
                    y: { duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.04, ease: EASE },
                    width: { duration: prefersReducedMotion ? 0 : 0.7, ease: EASE },
                  }}
                  onFocus={() => setActiveId(project.id)}
                  onClick={(event) => handleTileClick(event, project)}
                  aria-label={`${project.title} — ${project.category}, ${project.location}, ${project.year}`}
                  className={`relative h-[21rem] shrink-0 snap-center overflow-hidden rounded-xl bg-[var(--charcoal)] transition-[box-shadow] duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] sm:h-[25rem] ${
                    isActive ? "ring-1 ring-[var(--gold-40)] ring-offset-2 ring-offset-[var(--ivory)]" : ""
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category} project in ${project.location}`}
                    fill
                    sizes="(min-width: 640px) 320px, 80vw"
                    className="object-cover transition-[filter,transform] duration-700"
                    style={{ filter: isActive ? "brightness(0.96)" : "brightness(0.66)", transform: isActive ? "scale(1.03)" : "scale(1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">{project.number} — {project.category}</span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: EASE }}
                        >
                          <p className="mt-2 font-serif text-xl font-light leading-tight text-[var(--ivory-90)] sm:text-2xl">{project.title}</p>
                          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--ivory-55)]">{project.location} · {project.year}</p>
                          <span className="mt-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                            View Project
                            <span aria-hidden="true">→</span>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.a>
                );
              })}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--ivory)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--ivory)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
