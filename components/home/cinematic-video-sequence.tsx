"use client";

import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import { VIDEO_SEGMENTS } from "@/lib/cinematic-journey";
import { CinematicVideoLayer } from "@/components/home/cinematic-video-layer";

export interface CinematicVideoSequenceProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * Stacks all seven journey clips in the same box, each cross-fading in/out
 * on its own scroll-driven opacity (see CinematicVideoLayer). Only the
 * active clip and its immediate neighbors are fully preloaded — the rest sit
 * at "metadata" until scroll brings them into range, so the browser is never
 * asked to buffer all seven at once.
 */
export function CinematicVideoSequence({ scrollYProgress }: CinematicVideoSequenceProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(VIDEO_SEGMENTS.length - 1, Math.floor(latest * VIDEO_SEGMENTS.length));
    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  return (
    <div className="absolute inset-0 bg-[var(--stage)]">
      {VIDEO_SEGMENTS.map((segment, index) => (
        <CinematicVideoLayer
          key={segment.src}
          segment={segment}
          scrollYProgress={scrollYProgress}
          preload={Math.abs(index - activeIndex) <= 1}
        />
      ))}

      {/* The source footage runs slightly warm — a faint cool-neutral wash
          holds stone/wood/glass true instead of amber. Intentionally subtle. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0a1012]/10" />

      {/* Legibility scrims for the navbar above and the editorial UI below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55"
      />
    </div>
  );
}
