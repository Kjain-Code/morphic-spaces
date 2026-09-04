"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { VideoScrubber } from "@/components/home/video-scrubber";
import { StageContent } from "@/components/home/stage-content";
import { JourneyProgress } from "@/components/home/journey-progress";

/**
 * The homepage's cinematic centerpiece: one continuous scroll-driven camera
 * move through the house, played from a single master video (see
 * VideoScrubber / lib/cinematic-journey.ts). GSAP ScrollTrigger pins this
 * section and drives a shared `progress` MotionValue (0–1) — the one source
 * of truth for the video's target time, the editorial content over it
 * (StageContent), and the HUD (JourneyProgress) — so none of them ever fall
 * out of sync. Lenis (mounted at the root layout) smooths the underlying
 * document scroll that ScrollTrigger reads.
 *
 * Scrolling down moves forward through the house; scrolling up moves back.
 * Nothing here autoplays independently of scroll. Only once this pinned
 * section's scroll runway is exhausted does the page continue into Studio.
 */
export function CinematicHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const progress = useMotionValue(0);

  // The "scroll" hint only makes sense before the journey gets underway.
  const scrollHintOpacity = useTransform(progress, [0, 0.035], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-dvh w-full overflow-hidden bg-[var(--stage)]">
      <VideoScrubber containerRef={sectionRef} progress={progress} />

      {/* LOWER LEFT — editorial content, changes with every stage */}
      <StageContent progress={progress} />

      {/* BOTTOM RIGHT — scroll indicator, present only at the very top */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="pointer-events-none absolute bottom-10 right-6 z-10 flex flex-col items-center gap-3 text-white/50 sm:right-10"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-white/70"
          />
        </span>
      </motion.div>

      {/* CENTER/RIGHT — journey progress, visible for the whole sequence */}
      <JourneyProgress scrollYProgress={progress} />
    </section>
  );
}
