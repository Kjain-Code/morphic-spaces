"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { JOURNEY_STAGES } from "@/lib/cinematic-journey";

export interface JourneyProgressProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * Minimal stage counter ("01 / 08"), current-stage label, and a thin
 * vertical progress line for the cinematic hero. Desktop/tablet only — the
 * spec calls for hiding this on mobile in favor of the simpler hero content.
 * The line's fill is the one place this component reaches for `useSpring`;
 * the stage label itself switches directly off scroll progress, no easing,
 * so it never lags behind the video.
 */
export function JourneyProgress({ scrollYProgress }: JourneyProgressProps) {
  const [activeStage, setActiveStage] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(
    scrollYProgress,
    prefersReducedMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 120, damping: 26, mass: 0.4 }
  );
  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stage = Math.min(JOURNEY_STAGES.length - 1, Math.round(latest * (JOURNEY_STAGES.length - 1)));
    setActiveStage((prev) => (prev === stage ? prev : stage));
  });

  return (
    <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-5 sm:right-10 md:flex">
      <div className="flex items-baseline gap-[6px] font-sans text-white/45">
        <span className="text-xs tabular-nums tracking-[0.15em] text-white/80">
          {String(activeStage + 1).padStart(2, "0")}
        </span>
        <span className="text-[10px] tracking-[0.15em]">/ {String(JOURNEY_STAGES.length).padStart(2, "0")}</span>
      </div>

      <motion.span
        key={activeStage}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-sans text-[11px] uppercase tracking-[0.3em] text-white/85"
      >
        {JOURNEY_STAGES[activeStage]}
      </motion.span>

      <div className="relative h-36 w-px bg-white/15">
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute inset-x-0 top-0 h-full origin-top bg-[var(--moss)]"
        />
      </div>
    </div>
  );
}
