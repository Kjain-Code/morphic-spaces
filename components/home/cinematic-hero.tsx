"use client";

import { Fragment, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { VideoScrubber } from "@/components/home/video-scrubber";
import { JourneyProgress } from "@/components/home/journey-progress";
import { HERO_CONTENT } from "@/lib/hero-content";

/**
 * The homepage's cinematic centerpiece: one continuous scroll-driven camera
 * move through the house, played from a single master video (see
 * VideoScrubber / lib/cinematic-journey.ts). GSAP ScrollTrigger pins this
 * section and drives a shared `progress` MotionValue (0–1) — the one source
 * of truth for both the video's target time and every piece of hero UI, so
 * they never fall out of sync. Lenis (mounted at the root layout) smooths
 * the underlying document scroll that ScrollTrigger reads.
 *
 * Scrolling down moves forward through the house; scrolling up moves back.
 * Nothing here autoplays independently of scroll.
 */
export function CinematicHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const progress = useMotionValue(0);

  // Intro UI (statement + scroll hint) only makes sense before the journey
  // gets underway, so it clears out of the way within the first few percent
  // of scroll and leaves the house unobstructed for the rest of the pin.
  const introOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  const introY = useTransform(progress, [0, 0.08], [0, -18]);
  const scrollHintOpacity = useTransform(progress, [0, 0.035], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-dvh w-full overflow-hidden bg-[var(--stage)]">
      <VideoScrubber containerRef={sectionRef} progress={progress} />

      {/* TOP LEFT / LEFT-CENTER — studio identifier + editorial headline */}
      <motion.div
        style={{ opacity: introOpacity, y: prefersReducedMotion ? 0 : introY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-10 pr-24 sm:px-10 sm:pb-14 sm:pr-0 lg:pb-16"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">{HERO_CONTENT.identifier}</p>
          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-light uppercase leading-[1.05] text-white/90 sm:text-6xl lg:text-7xl">
            {HERO_CONTENT.headlineLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base">{HERO_CONTENT.statement}</p>
        </div>
      </motion.div>

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
