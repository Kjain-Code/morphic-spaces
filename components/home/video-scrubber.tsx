"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MotionValue } from "motion/react";
import { MASTER_VIDEO_POSTER, MASTER_VIDEO_SRC } from "@/lib/cinematic-journey";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface VideoScrubberProps {
  /** The tall wrapper CinematicHero sizes and measures scroll distance against (see that file for why this replaced GSAP's `pin: true`). */
  wrapperRef: RefObject<HTMLElement | null>;
  /** Fed with raw scroll progress (0–1) each frame, for UI to read off. */
  progress: MotionValue<number>;
}

/** currentTime eases toward targetTime by this fraction per frame — the "scrub feel." Tuned within the requested 0.08–0.18 range. */
const DAMPING = 0.12;
/** How many viewport-heights of extra scroll the sticky section holds for. CinematicHero's wrapper height (700dvh = (1 + this) × 100dvh) must be kept in sync with this if it ever changes. */
const PIN_DISTANCE_VH = 6;

/**
 * The actual scroll-scrubbed video engine: ONE master video, pinned via GSAP
 * ScrollTrigger, its currentTime eased toward a scroll-derived target inside
 * a dedicated requestAnimationFrame loop (not React state, not ScrollTrigger's
 * own scrub number — a manual lerp, per spec, decoupled from ScrollTrigger's
 * pin/progress tracking). The video never plays on its own; scroll position,
 * smoothed by Lenis upstream, is the only thing that moves it.
 */
export function VideoScrubber({ wrapperRef, progress }: VideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);

  // Duration detection: read readyState directly rather than relying solely
  // on the (non-bubbling) loadedmetadata event, which can fire before a
  // React-attached listener exists for an already-cached video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyDuration = () => {
      if (Number.isFinite(video.duration)) {
        durationRef.current = video.duration;
        return;
      }
      const resolveDuration = () => {
        video.removeEventListener("timeupdate", resolveDuration);
        video.currentTime = 0;
        durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      };
      video.addEventListener("timeupdate", resolveDuration);
      video.currentTime = 1e7;
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) applyDuration();
    else video.addEventListener("loadedmetadata", applyDuration, { once: true });

    return () => video.removeEventListener("loadedmetadata", applyDuration);
  }, []);

  // Scroll progress: tracks the wrapper's position against the viewport —
  // NOT GSAP's `pin: true`, which was the previous approach here. Pinning
  // has GSAP insert a "pin-spacer" wrapper and reparent the section into
  // it, outside React's knowledge; on a client-side route navigation away
  // from "/", React's own unmount then tried to remove nodes based on its
  // now-stale fiber tree and crashed with "Failed to execute 'removeChild'
  // on 'Node': the node to be removed is not a child of this node" —
  // breaking the whole destination page, confirmed in both dev and a
  // production build, on every route away from home. The section is
  // pinned with plain CSS `position: sticky` instead (see CinematicHero,
  // which sizes this wrapper so the sticky section holds for exactly
  // PIN_DISTANCE_VH viewport-heights) — GSAP here only *reads* scroll
  // position via `onUpdate`, never touches the DOM, so there's nothing
  // left for React to conflict with.
  //
  // Reduced motion: skip the scroll-tracking entirely — CinematicHero
  // collapses the wrapper to a single viewport-height for that case, so
  // there's no extra scroll distance to track anyway.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * PIN_DISTANCE_VH)}`,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progress.set(self.progress);
        if (durationRef.current > 0) {
          targetTimeRef.current = self.progress * durationRef.current;
        }
      },
    });

    return () => trigger.kill();
  }, [wrapperRef, progress]);

  // The lerp loop: eases currentTime toward targetTime every frame. Fully
  // imperative — refs only, no React state, so this never triggers a render.
  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const video = videoRef.current;
      if (video && durationRef.current > 0) {
        currentTimeRef.current += (targetTimeRef.current - currentTimeRef.current) * DAMPING;
        if (Math.abs(video.currentTime - currentTimeRef.current) > 0.01) {
          video.currentTime = currentTimeRef.current;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute inset-0 bg-[var(--stage)]">
      <video
        ref={videoRef}
        src={MASTER_VIDEO_SRC}
        poster={MASTER_VIDEO_POSTER}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* The source footage runs slightly warm — a faint cool-neutral wash
          holds stone/wood/glass true instead of amber. Intentionally subtle. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0a1012]/10" />

      {/* Legibility scrim for the editorial UI at the base of the frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55"
      />
    </div>
  );
}
