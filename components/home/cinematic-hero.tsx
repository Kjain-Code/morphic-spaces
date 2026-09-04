"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CinematicMasterVideo } from "@/components/home/cinematic-master-video";
import { JourneyProgress } from "@/components/home/journey-progress";
import { JOURNEY_SCROLL_VH } from "@/lib/cinematic-journey";
import { HERO_CONTENT } from "@/lib/hero-content";

/**
 * The homepage's cinematic centerpiece: one continuous scroll-driven camera
 * move through the house, played from a single master video (see
 * CinematicMasterVideo / lib/cinematic-journey.ts). The section stays pinned
 * for JOURNEY_SCROLL_VH of scroll while the video's currentTime and
 * JourneyProgress's stage label both read off the same scroll-progress
 * MotionValue, so they never fall out of sync.
 *
 * Scrolling down moves forward through the house; scrolling up moves back.
 * Nothing here autoplays independently of scroll.
 */
export function CinematicHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Intro UI (statement + scroll hint) only makes sense before the journey
  // gets underway, so it clears out of the way within the first few percent
  // of scroll and leaves the house unobstructed for the rest of the pin.
  const introOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.08], [0, -18]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.035], [1, 0]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${JOURNEY_SCROLL_VH}vh` }}>
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[var(--stage)]">
        <CinematicMasterVideo scrollYProgress={scrollYProgress} />

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
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base">
              {HERO_CONTENT.statement}
            </p>
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
        <JourneyProgress scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
