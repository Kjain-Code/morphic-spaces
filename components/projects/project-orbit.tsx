"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { MotionValue } from "motion/react";
import { animate, motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import type { Project } from "@/components/projects/project-data";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Card box, in px. Fixed pixel sizing (not vh/%) keeps the curve math exact at every viewport. */
const CARD_WIDTH = 272;
const CARD_HEIGHT = 360;
const GAP = 52;
const SLOT = CARD_WIDTH + GAP;

/** Base drift speed, in px/second — slow enough to read every frame, never idle. */
const BASE_SPEED = 40;
/** How long, in ms, a hover/focus pause lingers before the drift eases back in. */
const RESUME_DELAY = 300;
/** How long, in ms, the eased ramp back to full speed takes once resuming starts. */
const RESUME_RAMP = 900;
/**
 * Vertical rise, in px, at the far edge of the row (the row's "smile" depth).
 * Deliberately no rotation here — a rotated card's corners grow past its own
 * footprint and can nick a neighbour's edge even with a healthy gap; a pure
 * vertical curve reads just as intentional and never risks that.
 */
const CURVE_DEPTH = 26;
/** Scale at the far edge of the row — 1 at dead center. */
const EDGE_SCALE = 0.93;
/** Opacity at the far edge of the row — 1 at dead center. */
const EDGE_OPACITY = 0.85;
/** Repeated tile copies rendered per project so the strip always covers the viewport, however wide. */
const COPY_OFFSETS = [-1, 0, 1] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} className="h-4 w-4" aria-hidden="true">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** Normalized position of a card across the visible row, in [-1, 1] — 0 is dead center. */
function curveT(cardLeftX: number, containerWidth: number) {
  const half = containerWidth / 2 || 1;
  const center = cardLeftX + CARD_WIDTH / 2;
  const raw = (center - half) / half;
  return Math.max(-1, Math.min(1, raw));
}

interface MarqueeCardProps {
  project: Project;
  baseLeft: number;
  copyOffset: number;
  trackWidth: number;
  progress: MotionValue<number>;
  sizeRef: RefObject<{ width: number; height: number }>;
  isHovered: boolean;
  isSelected: boolean;
  isAnySelected: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: () => void;
  priority?: boolean;
}

/**
 * One project image, riding a shared horizontal strip that loops forever.
 * The strip's raw scroll offset lives in one shared `progress` MotionValue
 * (advanced every frame via `useAnimationFrame` on the parent); each card
 * derives its own left position from that value plus its fixed slot, wraps
 * it into view with simple modulo arithmetic, and then derives a gentle
 * "smile" curve — a small rise, scale-down and fade, no rotation — purely
 * from where that position sits across the visible row. None of this
 * touches React state, so a full pass down the row never triggers a
 * re-render.
 */
function MarqueeCard({
  project,
  baseLeft,
  copyOffset,
  trackWidth,
  progress,
  sizeRef,
  isHovered,
  isSelected,
  isAnySelected,
  onHoverStart,
  onHoverEnd,
  onSelect,
  priority,
}: MarqueeCardProps) {
  const expand = useMotionValue(0);

  useEffect(() => {
    const controls = animate(expand, isSelected ? 1 : 0, {
      duration: isSelected ? 0.6 : 0.3,
      ease: EASE,
    });
    return () => controls.stop();
  }, [isSelected, expand]);

  // Raw left position on an infinitely repeating strip: wrap into [0, trackWidth)
  // then shift by this node's tile copy, so three copies together always tile
  // from -trackWidth to +2×trackWidth — comfortably wider than any viewport.
  const x = useTransform(progress, (p) => {
    const wrapped = (((baseLeft - p) % trackWidth) + trackWidth) % trackWidth;
    return wrapped + copyOffset * trackWidth;
  });

  const curveY = useTransform(x, (xv) => {
    const t = curveT(xv, sizeRef.current.width);
    return CURVE_DEPTH * t * t - CURVE_DEPTH * 0.2;
  });
  const baseScale = useTransform(x, (xv) => {
    const t = Math.abs(curveT(xv, sizeRef.current.width));
    return 1 - t * (1 - EDGE_SCALE);
  });
  const baseOpacity = useTransform(x, (xv) => {
    const t = Math.abs(curveT(xv, sizeRef.current.width));
    return 1 - t * (1 - EDGE_OPACITY);
  });
  const baseZIndex = useTransform(x, (xv) => {
    const t = Math.abs(curveT(xv, sizeRef.current.width));
    return Math.round((1 - t) * 40) + 1;
  });

  const scale = useTransform([baseScale, expand], ([s, e]) => (s as number) + (1.16 - (s as number)) * (e as number));
  const opacity = useTransform([baseOpacity, expand], ([o, e]) => Math.max(o as number, e as number));
  const zIndex = useTransform([baseZIndex, expand], ([z, e]) => ((e as number) > 0.01 ? 200 : (z as number)));

  return (
    <motion.div
      style={{ position: "absolute", left: 0, top: "50%", x, y: curveY, scale, opacity, zIndex }}
      className={isAnySelected && !isSelected ? "pointer-events-none" : ""}
    >
      <motion.div
        role="link"
        tabIndex={0}
        aria-label={`${project.title} — ${project.category}, ${project.location}, ${project.year}`}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        variants={{
          rest: { y: "-50%", scale: 1, boxShadow: "0 10px 30px -18px rgba(0,0,0,0.5)" },
          hover: { y: "-52%", scale: 1.045, boxShadow: "0 34px 60px -20px rgba(0,0,0,0.65)" },
        }}
        transition={{ duration: 0.5, ease: EASE }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        onClick={onSelect}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect();
          }
        }}
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[var(--graphite)] ring-1 ring-[var(--ivory-10)] transition-[box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bronze)]"
      >
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.category} project in ${project.location}`}
            fill
            sizes={`${CARD_WIDTH}px`}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>

        {/* A light gradient confined to where text sits — the architecture stays legible, not darkened wholesale. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Bronze hairline that draws in along the top edge on hover — the same accent-underline motif used on About's pillar cards. */}
        <motion.span
          aria-hidden="true"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ transformOrigin: "left" }}
          className="absolute inset-x-0 top-0 h-[3px] bg-[var(--bronze)]"
        />

        <motion.div
          aria-hidden="true"
          variants={{
            rest: { opacity: 0, scale: 0.7, rotate: -35 },
            hover: { opacity: 1, scale: 1, rotate: 0, backgroundColor: "var(--bronze)", color: "var(--charcoal)" },
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ivory-45)] text-[var(--ivory-90)]"
        >
          <ArrowIcon />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <motion.p
            variants={{ rest: { opacity: 0.75 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.35 }}
            className="text-[9px] uppercase tracking-[0.22em] text-[var(--bronze)]"
          >
            {project.number} — {project.category}
          </motion.p>
          <motion.h3
            variants={{ rest: { opacity: 0.75, y: 0 }, hover: { opacity: 1, y: -3 } }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-1.5 font-serif text-lg font-light leading-tight text-[var(--ivory-90)]"
          >
            {project.title}
          </motion.h3>
          <motion.p
            variants={{ rest: { opacity: 0.55 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.35 }}
            className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[var(--ivory-45)]"
          >
            {project.location} · {project.year}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export interface ProjectOrbitProps {
  projects: Project[];
}

/**
 * The Projects page's main gallery — every project riding one continuous,
 * gently curved strip that drifts sideways forever (not a full orbit, not a
 * grid): one shared `progress` MotionValue advances every frame via
 * `useAnimationFrame`, and each card derives its own x/y/scale/opacity/
 * z-index from that single value plus its fixed slot, so a full pass never
 * touches React state. Hovering (or focusing) any card eases the whole
 * strip to a stop in place — no reset, no jump — and lifts that card
 * forward; moving on (or blurring) eases the drift back in. A click blends
 * the same card slightly forward and, once settled, navigates to its detail
 * route.
 */
export function ProjectOrbit({ projects }: ProjectOrbitProps) {
  // See lib/use-reduced-motion.ts — not Motion's own useReducedMotion(),
  // which mismatches at hydration whenever reduced motion is on.
  const prefersReducedMotion = useIsReducedMotion();
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef({ width: 1200, height: 580 });
  const isVisibleRef = useRef(true);

  const trackWidth = projects.length * SLOT;
  const progress = useMotionValue(0);
  const pausedRef = useRef(false);
  const resumeAtRef = useRef(0);
  const resumeStartRef = useRef(0);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      sizeRef.current = { width: stage.clientWidth, height: stage.clientHeight };
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stage);
    const intersectionObserver = new IntersectionObserver(([entry]) => (isVisibleRef.current = entry.isIntersecting), {
      threshold: 0.02,
    });
    intersectionObserver.observe(stage);
    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useAnimationFrame((time, delta) => {
    if (prefersReducedMotion || !isVisibleRef.current || selectedId) return;

    if (pausedRef.current) {
      if (resumeAtRef.current && time >= resumeAtRef.current) {
        pausedRef.current = false;
        resumeStartRef.current = time;
        resumeAtRef.current = 0;
      }
      return;
    }

    const sinceResume = resumeStartRef.current ? time - resumeStartRef.current : RESUME_RAMP;
    const ramp = resumeStartRef.current ? Math.min(1, sinceResume / RESUME_RAMP) : 1;
    const next = progress.get() + BASE_SPEED * (delta / 1000) * ramp;
    progress.set(((next % trackWidth) + trackWidth) % trackWidth);
  });

  const pause = () => {
    pausedRef.current = true;
  };
  const scheduleResume = () => {
    resumeAtRef.current = performance.now() + RESUME_DELAY;
  };

  const handleSelect = (id: string) => {
    if (selectedId) return;
    pause();
    setHoveredId(null);
    setSelectedId(id);
    window.setTimeout(() => router.push(`/projects/${id}`), 550);
  };

  if (prefersReducedMotion) {
    return (
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
        {projects.map((project, index) => (
          <StaticCard key={project.id} project={project} priority={index === 0} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div ref={stageRef} className="relative hidden h-[520px] w-full overflow-hidden lg:block xl:h-[580px]">
        {projects.map((project, index) =>
          COPY_OFFSETS.map((copyOffset) => (
            <MarqueeCard
              key={`${project.id}-${copyOffset}`}
              project={project}
              baseLeft={index * SLOT}
              copyOffset={copyOffset}
              trackWidth={trackWidth}
              progress={progress}
              sizeRef={sizeRef}
              priority={index === 0 && copyOffset === 0}
              isHovered={hoveredId === project.id}
              isSelected={selectedId === project.id}
              isAnySelected={selectedId !== null}
              onHoverStart={() => {
                setHoveredId(project.id);
                pause();
              }}
              onHoverEnd={() => {
                setHoveredId(null);
                scheduleResume();
              }}
              onSelect={() => handleSelect(project.id)}
            />
          )),
        )}
      </div>

      {/* Mobile / small tablet — calm static sequence, alternating offset, tap to open */}
      <div className="flex flex-col gap-8 px-6 sm:px-10 lg:hidden">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: (index % 2) * 0.08 }}
            className={index % 2 === 0 ? "self-start" : "self-end"}
          >
            <StaticCard project={project} priority={index === 0} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

function StaticCard({
  project,
  priority,
  className = "",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  return (
    <a
      href={`/projects/${project.id}`}
      aria-label={`${project.title} — ${project.category}, ${project.location}, ${project.year}`}
      className={`group relative block aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-[var(--graphite)] ring-1 ring-[var(--ivory-10)] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bronze)] ${className}`}
    >
      <Image
        src={project.image}
        alt={`${project.title} — ${project.category} project in ${project.location}`}
        fill
        sizes="(min-width: 640px) 340px, 82vw"
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--bronze)]">
          {project.number} — {project.category}
        </p>
        <h3 className="mt-2 font-serif text-lg font-light leading-tight text-[var(--ivory-90)] sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ivory-45)]">
          {project.location} · {project.year}
        </p>
      </div>
    </a>
  );
}
