"use client";

import { useRef } from "react";
import type { MotionValue } from "motion/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";

interface Mass {
  /** Final resting position/size, as a percentage box within the stage. */
  left: number;
  top: number;
  width: number;
  height: number;
  /** Direction each mass arrives from, and how far, in px. */
  from: { x?: number; y?: number; rotate?: number };
  /** Portion of the section's scroll progress this mass animates across. */
  range: [number, number];
  fill: "ivory" | "stone" | "outline";
}

// A small abstract composition — floor plates and vertical volumes, not a
// model of any real building — assembled in three loose waves rather than
// all at once, each mass given its own arrival direction and timing window
// within the section's total scroll range.
const MASSES: Mass[] = [
  { left: 8, top: 58, width: 26, height: 8, from: { x: -60 }, range: [0.32, 0.5], fill: "outline" },
  { left: 10, top: 40, width: 18, height: 26, from: { y: 50 }, range: [0.38, 0.58], fill: "ivory" },
  { left: 30, top: 30, width: 12, height: 36, from: { y: 70, rotate: -4 }, range: [0.46, 0.64], fill: "stone" },
  { left: 44, top: 50, width: 30, height: 6, from: { x: 70 }, range: [0.5, 0.68], fill: "outline" },
  { left: 46, top: 20, width: 16, height: 34, from: { y: -60, rotate: 3 }, range: [0.56, 0.74], fill: "ivory" },
  { left: 64, top: 44, width: 20, height: 22, from: { x: 50, rotate: -3 }, range: [0.62, 0.8], fill: "stone" },
];

/**
 * The About page's scroll-driven "building assembly" — an abstract massing
 * study that appears to construct itself as the section is pinned and
 * scrolled through: faint linework first, then a handful of rectangular
 * masses sliding/rising/rotating into a settled composition, holding for a
 * beat before the page continues. Deliberately 2D and flat (divs, not
 * three.js) — a blueprint abstraction, not the 3D ambient scene already used
 * in AboutHero.
 *
 * Pinned via plain CSS `position: sticky` and read with `useScroll`'s
 * element-relative offset — not GSAP `pin: true` — for the same reason
 * documented at length in components/home/video-scrubber.tsx: pinning that
 * reparents the DOM has previously crashed React's unmount on client-side
 * navigation away from the page. Nothing here touches the DOM outside
 * React's own render, so there's nothing left to conflict with.
 */
export function ArchitecturalAssembly() {
  // See lib/use-reduced-motion.ts — not Motion's own useReducedMotion(),
  // which mismatches at hydration whenever reduced motion is on.
  const prefersReducedMotion = useIsReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Each ends with an explicit keyframe at progress 1 — see the comment in
  // MassBlock below for why a narrower final breakpoint isn't safe here.
  const lineworkOpacity = useTransform(scrollYProgress, [0.08, 0.28, 1], [0, 1, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.78, 0.9, 1], [0, 1, 1]);
  const captionY = useTransform(scrollYProgress, [0.78, 0.9, 1], [12, 0, 0]);

  if (prefersReducedMotion) {
    return (
      <section className="relative w-full overflow-hidden bg-[var(--graphite)] px-6 py-24 sm:px-10 sm:py-32">
        <StaticComposition />
        <div className="relative z-10 mx-auto mt-16 max-w-6xl">
          <Caption />
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapperRef} className="relative h-[240vh] w-full sm:h-[280vh]">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[var(--graphite)]">
        <LineworkGrid opacity={lineworkOpacity} />

        <div className="absolute inset-6 sm:inset-16">
          {MASSES.map((mass, index) => (
            <MassBlock key={index} mass={mass} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="pointer-events-none absolute inset-x-0 bottom-14 z-10 px-6 sm:bottom-20 sm:px-10"
        >
          <div className="mx-auto max-w-6xl">
            <Caption />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Caption() {
  return (
    <>
      <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--bronze)]">Process</span>
      <p className="mt-4 max-w-md font-serif text-2xl font-light leading-snug text-[var(--ivory-90)] sm:text-3xl">
        Every composition begins as mass, before it becomes a room.
      </p>
    </>
  );
}

function LineworkGrid({ opacity }: { opacity: MotionValue<number> }) {
  const verticals = [12, 30, 48, 66, 84];
  const horizontals = [25, 50, 75];
  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      {verticals.map((x) => (
        <line key={`v-${x}`} x1={x} y1={0} x2={x} y2={100} stroke="var(--ivory-10)" strokeWidth={0.15} />
      ))}
      {horizontals.map((y) => (
        <line key={`h-${y}`} x1={0} y1={y} x2={100} y2={y} stroke="var(--ivory-10)" strokeWidth={0.15} />
      ))}
    </motion.svg>
  );
}

function MassBlock({ mass, scrollYProgress }: { mass: Mass; scrollYProgress: MotionValue<number> }) {
  const [start, end] = mass.range;
  // Every keyframe list ends exactly at progress 1 (not just at this mass's
  // own `end`) — with a narrower final breakpoint, values past it fall to
  // extrapolation/timeline edge-case behavior rather than a clean clamp,
  // which measurably left masses fading back down (confirmed via computed
  // style at progress 0.9-1.0, both in dev and a production build) instead
  // of holding at their settled state through the rest of the pin.
  const x = useTransform(scrollYProgress, [start, end, 1], [mass.from.x ?? 0, 0, 0]);
  const y = useTransform(scrollYProgress, [start, end, 1], [mass.from.y ?? 0, 0, 0]);
  const rotate = useTransform(scrollYProgress, [start, end, 1], [mass.from.rotate ?? 0, 0, 0]);
  const opacity = useTransform(scrollYProgress, [start, start + (end - start) * 0.4, 1], [0, 1, 1]);

  const fillStyle =
    mass.fill === "ivory"
      ? { background: "var(--ivory)" }
      : mass.fill === "stone"
        ? { background: "var(--stone-warm)" }
        : { background: "transparent", border: "1px solid var(--ivory-45)" };

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: `${mass.left}%`,
        top: `${mass.top}%`,
        width: `${mass.width}%`,
        height: `${mass.height}%`,
        x,
        y,
        rotate,
        opacity,
        ...fillStyle,
      }}
    />
  );
}

/** Reduced-motion / no-JS-scroll-math fallback: the settled composition, held static. */
function StaticComposition() {
  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl">
      {MASSES.map((mass, index) => {
        const fillStyle =
          mass.fill === "ivory"
            ? { background: "var(--ivory)" }
            : mass.fill === "stone"
              ? { background: "var(--stone-warm)" }
              : { background: "transparent", border: "1px solid var(--ivory-45)" };
        return (
          <div
            key={index}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${mass.left}%`,
              top: `${mass.top}%`,
              width: `${mass.width}%`,
              height: `${mass.height}%`,
              ...fillStyle,
            }}
          />
        );
      })}
    </div>
  );
}
