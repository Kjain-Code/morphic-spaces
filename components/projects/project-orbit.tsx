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

/** One full orbit revolution, in seconds — slow enough to read the work, fast enough to feel alive. */
const FULL_CYCLE_SECONDS = 32;
/** How long, in ms, a hover/focus pause lingers before motion eases back in. */
const RESUME_DELAY = 350;
/** How long, in ms, the eased ramp back to full speed takes once resuming starts. */
const RESUME_RAMP = 900;
/** Card box, in px, at the orbit's nearest point (depth 1). Scales down toward the far side. */
const CARD_WIDTH = 232;
const CARD_HEIGHT = 306;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} className="h-4 w-4" aria-hidden="true">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

interface OrbitCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  dim: MotionValue<number>;
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
 * One project, positioned on a shared elliptical orbit. The outer wrapper's
 * x/y/scale/opacity/zIndex are pure functions of the shared `progress` angle
 * (plus this card's own fixed phase) and the shared `dim`/expand state — all
 * MotionValues, so a full lap never triggers a React re-render. Hover/focus
 * layer a small extra lift on top via ordinary Motion variants on the inner
 * element, which is the only part that owns real interactive state.
 */
function OrbitCard({
  project,
  index,
  total,
  progress,
  dim,
  sizeRef,
  isHovered,
  isSelected,
  isAnySelected,
  onHoverStart,
  onHoverEnd,
  onSelect,
  priority,
}: OrbitCardProps) {
  const baseAngle = (index / total) * Math.PI * 2;
  const expand = useMotionValue(0);

  useEffect(() => {
    const controls = animate(expand, isSelected ? 1 : 0, {
      duration: isSelected ? 0.7 : 0.4,
      ease: EASE,
    });
    return () => controls.stop();
  }, [isSelected, expand]);

  const angle = useTransform(progress, (p) => p + baseAngle);
  const depth = useTransform(angle, (a) => Math.sin(a)); // -1 (far) .. 1 (near)

  const orbitX = useTransform(angle, (a) => {
    const { width } = sizeRef.current;
    return Math.cos(a) * width * 0.36;
  });
  const orbitY = useTransform(depth, (d) => {
    const { height } = sizeRef.current;
    return d * height * 0.3;
  });
  const orbitScale = useTransform(depth, [-1, 1], [0.7, 1.1]);
  const orbitOpacity = useTransform(depth, [-1, 1], [0.5, 1]);
  const zIndex = useTransform(depth, [-1, 1], [1, 40]);

  // Blend the ambient orbit position with the click-triggered "expand toward
  // center" — plain motion-value arithmetic rather than Framer's `layout`/
  // `layoutId` system, which fights with hand-driven x/y transforms like
  // these. `expand` runs 0 -> 1 on select; at 1 the card sits dead-center,
  // scaled up, regardless of where its orbit slot currently is.
  const EXPANDED_SCALE = 2.3;
  const x = useTransform([orbitX, expand], ([ox, e]) => (ox as number) * (1 - (e as number)));
  const y = useTransform([orbitY, expand], ([oy, e]) => (oy as number) * (1 - (e as number)));
  const scale = useTransform(
    [orbitScale, expand],
    ([os, e]) => (os as number) + (EXPANDED_SCALE - (os as number)) * (e as number),
  );
  const opacity = useTransform([orbitOpacity, dim, expand], ([oo, d, e]) => {
    if ((e as number) > 0) return 1;
    return (oo as number) * (1 - (d as number) * 0.85);
  });
  const finalZIndex = useTransform([zIndex, expand], ([z, e]) => ((e as number) > 0.01 ? 100 : (z as number)));

  return (
    <motion.div
      style={{ position: "absolute", left: "50%", top: "50%", x, y, scale, opacity, zIndex: finalZIndex }}
      className={isAnySelected && !isSelected ? "pointer-events-none" : ""}
    >
      <motion.div
        role="link"
        tabIndex={0}
        aria-label={`${project.title} — ${project.category}, ${project.location}, ${project.year}`}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.1 } }}
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
        style={{ x: "-50%", y: "-50%", width: CARD_WIDTH, height: CARD_HEIGHT }}
        className="group relative cursor-pointer overflow-hidden bg-[var(--graphite)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bronze)]"
      >
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt=""
            fill
            sizes={`${CARD_WIDTH}px`}
            priority={priority}
            className="object-cover"
          />
        </div>

        {/* A light gradient confined to where text sits — the architecture stays legible, not darkened wholesale. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        <motion.div
          aria-hidden="true"
          variants={{
            rest: { opacity: 0, scale: 0.7, rotate: -35 },
            hover: { opacity: 1, scale: 1, rotate: 0, backgroundColor: "var(--ivory)", color: "var(--charcoal)" },
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ivory-45)] text-[var(--ivory-90)]"
        >
          <ArrowIcon />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <motion.p
            variants={{ rest: { opacity: 0.65 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.35 }}
            className="text-[9px] uppercase tracking-[0.22em] text-[var(--ivory-70)]"
          >
            {project.number} — {project.category}
          </motion.p>
          <motion.h3
            variants={{ rest: { opacity: 0.7, y: 0 }, hover: { opacity: 1, y: -3 } }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-1.5 font-serif text-base font-light leading-tight text-[var(--ivory-90)]"
          >
            {project.title}
          </motion.h3>
          <motion.p
            variants={{ rest: { opacity: 0.5 }, hover: { opacity: 1 } }}
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
 * The Projects page's main gallery — project images travelling along a
 * shared, gently tilted elliptical orbit (not a carousel, not a marquee):
 * one shared `progress` MotionValue advances the angle every frame via
 * `useAnimationFrame`, and each card derives its own x/y/scale/opacity/
 * z-index from that single value plus its fixed phase offset, so a full
 * revolution never touches React state. Hover pauses the shared angle in
 * place (no reset, no jump) and brings that card forward; a click blends
 * the same card toward the stage's center and, once settled, navigates to
 * its detail route.
 */
export function ProjectOrbit({ projects }: ProjectOrbitProps) {
  // See lib/use-reduced-motion.ts — not Motion's own useReducedMotion(),
  // which mismatches at hydration whenever reduced motion is on.
  const prefersReducedMotion = useIsReducedMotion();
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef({ width: 1200, height: 620 });
  const isVisibleRef = useRef(true);

  const progress = useMotionValue(0);
  const dim = useMotionValue(0);
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

  useEffect(() => {
    const controls = animate(dim, selectedId ? 1 : 0, { duration: 0.5, ease: EASE });
    return () => controls.stop();
  }, [selectedId, dim]);

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
    const angularSpeedPerMs = (Math.PI * 2) / (FULL_CYCLE_SECONDS * 1000);
    progress.set(progress.get() + angularSpeedPerMs * delta * ramp);
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
    window.setTimeout(() => router.push(`/projects/${id}`), 650);
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
      <div ref={stageRef} className="relative hidden h-[74vh] w-full overflow-hidden lg:block">
        {projects.map((project, index) => (
          <OrbitCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            progress={progress}
            dim={dim}
            sizeRef={sizeRef}
            priority={index === 0}
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
        ))}
      </div>

      {/* Mobile / small tablet — calm static sequence, alternating offset, tap to open */}
      <div className="flex flex-col gap-8 px-6 sm:px-10 lg:hidden">
        {projects.map((project, index) => (
          <StaticCard
            key={project.id}
            project={project}
            priority={index === 0}
            className={index % 2 === 0 ? "self-start" : "self-end"}
          />
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
      className={`group relative block aspect-[3/4] w-full max-w-sm overflow-hidden bg-[var(--graphite)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bronze)] ${className}`}
    >
      <Image src={project.image} alt="" fill sizes="(min-width: 640px) 340px, 82vw" priority={priority} className="object-cover" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--ivory-70)]">
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
