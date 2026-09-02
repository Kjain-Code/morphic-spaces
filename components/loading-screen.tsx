"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ImageTrail } from "@/components/ui/image-trail";
import { LogoMark } from "@/components/ui/logo-mark";
import { LOADING_IMAGES } from "@/lib/loading-images";

/** Deterministic target duration — the sequence completes on this timer, not on pointer activity. */
const TARGET_DURATION_MS = 5000;
/** Hard ceiling in case images are unusually slow to settle — never wait indefinitely. */
const SAFETY_TIMEOUT_MS = 8000;
/** Logo/overlay reveal transition — kept inside the requested 800-1200ms window. */
const EXIT_TRANSITION = { duration: 0.95, ease: [0.76, 0, 0.24, 1] as const };

const TRAIL_IMAGES = [...LOADING_IMAGES];

export interface LoadingScreenProps {
  /** Called once the exit reveal has fully played out. */
  onComplete?: () => void;
}

/**
 * Full-viewport cinematic preloader for the studio site: a dark charcoal
 * stage with the logo centered, a cursor-driven architectural image trail
 * as a secondary layer, and a minimal progress line. Runs on a deterministic
 * ~5s clock (not dependent on the pointer), then the logo punches outward
 * while a circular reveal centered on it opens onto the page underneath.
 *
 * Self-contained and reusable — mount it, pass `onComplete`, and swap it out
 * once that fires.
 */
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [forceReveal, setForceReveal] = useState(false);
  const [percent, setPercent] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const hasCompletedRef = useRef(false);
  const total = LOADING_IMAGES.length as number;

  // Derived, not synced: reveal once the clock has run and assets are ready,
  // or unconditionally once the safety timeout fires. Monotonic in both
  // directions, so it's safe to compute straight from render.
  const isRevealing = (minTimeElapsed && loadedCount >= total) || forceReveal;

  // Preload every trail image so the reveal never exposes a half-loaded one.
  useEffect(() => {
    let cancelled = false;
    const onSettled = () => {
      if (!cancelled) setLoadedCount((count) => count + 1);
    };
    TRAIL_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.onload = onSettled;
      img.onerror = onSettled;
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // The ~5s deterministic clock.
  useEffect(() => {
    const timer = window.setTimeout(() => setMinTimeElapsed(true), TARGET_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Safety net: never let the user wait indefinitely on a slow/failed asset.
  useEffect(() => {
    const timer = window.setTimeout(() => setForceReveal(true), SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Cosmetic percent readout, ticking on its own light interval — independent
  // of the completion logic above so a slow load never stalls the display.
  // Once revealing, the interval simply isn't (re)started; the render below
  // clamps the displayed value to 100 for that case.
  useEffect(() => {
    if (isRevealing) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      setPercent(Math.min(100, Math.round(((performance.now() - start) / TARGET_DURATION_MS) * 100)));
    }, 100);
    return () => window.clearInterval(id);
  }, [isRevealing]);

  const displayedPercent = isRevealing ? 100 : percent;

  const handleRevealComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  return (
    <motion.div
      initial={false}
      animate={
        prefersReducedMotion
          ? { opacity: isRevealing ? 0 : 1 }
          : { clipPath: isRevealing ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)" }
      }
      transition={EXIT_TRANSITION}
      onAnimationComplete={() => {
        if (isRevealing) handleRevealComplete();
      }}
      className="fixed inset-0 z-50 overflow-hidden bg-[#0d0c0b]"
    >
      {/* Cinematic vignette: warm charcoal, darker at the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, #17140f 0%, #0d0c0b 55%, #080706 100%)",
        }}
      />
      {/* Faint architectural facets, almost imperceptible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.02) 35%, transparent 55%), linear-gradient(245deg, transparent 40%, rgba(255,255,255,0.015) 60%, transparent 80%)",
        }}
      />
      {/* Subtle film grain. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <ImageTrail
        images={TRAIL_IMAGES}
        active={!isRevealing}
        className="absolute inset-0 z-10"
        imageClassName="rounded-[3px] object-cover shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
      />

      <div className="pointer-events-none relative z-20 flex h-full w-full flex-col items-center justify-center gap-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={
            isRevealing
              ? prefersReducedMotion
                ? { opacity: 0 }
                : { scale: [1, 1.08, 16], opacity: [1, 1, 0], y: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={isRevealing ? EXIT_TRANSITION : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <LogoMark priority className="h-auto w-[150px] sm:w-[175px] lg:w-[200px] xl:w-[220px]" />
        </motion.div>

        <motion.div
          animate={{ opacity: isRevealing ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex w-[110px] flex-col items-center gap-2"
        >
          <div className="h-px w-full overflow-hidden bg-white/10">
            <motion.div
              className="h-full origin-left bg-white/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: TARGET_DURATION_MS / 1000, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <span className="text-[10px] font-light tracking-[0.3em] text-white/35">
            {String(displayedPercent).padStart(2, "0")}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
