"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { JOURNEY_CROSSFADE, type VideoSegment } from "@/lib/cinematic-journey";

export interface CinematicVideoLayerProps {
  segment: VideoSegment;
  /** Shared 0–1 progress for the whole cinematic section. */
  scrollYProgress: MotionValue<number>;
  /** Current clip + its immediate neighbors get full preload; the rest stay light. */
  preload: boolean;
}

/**
 * One clip in the cinematic house journey. It never autoplays or loops on
 * its own — scroll position is the only thing that moves it forward or
 * backward. Its `currentTime` is set directly from the shared scroll
 * progress value (clamped and normalized to this clip's window), so
 * scrolling up scrubs it backwards just as naturally as scrolling down plays
 * it forwards. Opacity cross-fades against its neighbors over a small
 * overlap window so the cut between clips reads as one continuous move.
 */
export function CinematicVideoLayer({ segment, scrollYProgress, preload }: CinematicVideoLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const { start, end } = segment;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - JOURNEY_CROSSFADE), start, end, Math.min(1, end + JOURNEY_CROSSFADE)],
    [0, 1, 1, 0]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    const duration = durationRef.current;
    if (!video || !duration) return;
    // Outside this clip's active-plus-overlap window there's nothing to gain
    // from seeking an invisible video, so skip the work entirely.
    if (latest < start - JOURNEY_CROSSFADE || latest > end + JOURNEY_CROSSFADE) return;

    const local = Math.min(1, Math.max(0, (latest - start) / (end - start)));
    const target = local * duration;
    if (Math.abs(video.currentTime - target) > 0.02) {
      video.currentTime = target;
    }
  });

  return (
    <motion.video
      ref={videoRef}
      src={segment.src}
      muted
      playsInline
      preload={preload ? "auto" : "metadata"}
      onLoadedMetadata={(event) => {
        durationRef.current = event.currentTarget.duration || 0;
      }}
      style={{ opacity }}
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
