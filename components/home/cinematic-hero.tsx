"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { VideoScrubber } from "@/components/home/video-scrubber";
import { StageContent } from "@/components/home/stage-content";

/**
 * The entire homepage: one continuous scroll-driven camera move through the
 * house, played from a single master video (see VideoScrubber /
 * lib/cinematic-journey.ts). The section holding it is pinned with plain
 * CSS `position: sticky` inside a tall wrapper (sized to hold for
 * PIN_DISTANCE_VH viewport-heights) rather than GSAP's `pin: true` — see
 * VideoScrubber's comment for why: pinning had GSAP reparent the section
 * into a spacer div it created, which crashed React's unmount on a
 * client-side route change away from "/". GSAP (via VideoScrubber) only
 * reads scroll progress against this wrapper now; it never touches the
 * DOM, so there's nothing left to conflict with.
 *
 * `progress` (0–1) is the one shared source of truth for both the video's
 * target time and the editorial content over it (StageContent), so they
 * never fall out of sync. Lenis (mounted at the root layout) smooths the
 * underlying document scroll that GSAP reads.
 *
 * Scrolling down moves forward through the house; scrolling up moves back.
 * Nothing here autoplays independently of scroll. The studio story is told
 * as the journey's final stage rather than in a separate section — this
 * pinned experience is the entire homepage.
 */
export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const progress = useMotionValue(0);

  // The "scroll" hint only makes sense before the journey gets underway.
  const scrollHintOpacity = useTransform(progress, [0, 0.035], [1, 0]);

  return (
    // Sized for the full scroll-scrubbed journey (700dvh = (1 + PIN_DISTANCE_VH)
    // × 100dvh — update both together if that constant changes), collapsing
    // to a single viewport-height via Tailwind's motion-reduce: variant for
    // a reduced-motion device (which VideoScrubber also stops tracking
    // scroll for), leaving one stable frame instead of a scroll-scrubbed
    // one. Pure CSS, deliberately not React state driven by
    // prefersReducedMotion — that hook resolves differently between the
    // server and the client's first render, which fails hydration (see
    // AnimatedQuote's note on /about for the same lesson learned there).
    <div ref={wrapperRef} className="relative h-[700dvh] motion-reduce:h-dvh">
      <section className="sticky top-0 h-dvh w-full overflow-hidden bg-[var(--hero-deep)]">
        <VideoScrubber wrapperRef={wrapperRef} progress={progress} />

        {/* Editorial content — position and copy both change with every stage */}
        <StageContent progress={progress} />

        {/* BOTTOM RIGHT — scroll indicator, present only at the very top */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute bottom-10 right-6 z-10 flex flex-col items-center gap-3 text-[var(--hero-cream-55)] sm:right-10"
        >
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-[var(--hero-cream-20)]">
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-[var(--hero-cream-70)]"
            />
          </span>
        </motion.div>
      </section>
    </div>
  );
}
