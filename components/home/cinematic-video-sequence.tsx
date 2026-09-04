"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { JOURNEY_CROSSFADE, VIDEO_SEGMENTS } from "@/lib/cinematic-journey";

export interface CinematicVideoSequenceProps {
  scrollYProgress: MotionValue<number>;
}

const SEGMENT_COUNT = VIDEO_SEGMENTS.length;

/**
 * The actual scroll-scrubbed video engine. Renders all seven journey clips
 * stacked in the same box and drives them from a single requestAnimationFrame
 * loop that reads `scrollYProgress` once per frame and writes `currentTime` +
 * `opacity` straight onto the DOM via refs — no React state per frame, no
 * per-clip subscriptions. Scroll position is the only thing that ever moves
 * these videos: nothing here calls `.play()`.
 *
 * Only the active clip and its immediate neighbors get preload="auto"; the
 * rest sit at "metadata" until scroll brings them into range.
 */
export function CinematicVideoSequence({ scrollYProgress }: CinematicVideoSequenceProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const durationsRef = useRef<number[]>(new Array(SEGMENT_COUNT).fill(0));
  const [preloadIndex, setPreloadIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const latest = scrollYProgress.get();
      const activeIndex = Math.min(SEGMENT_COUNT - 1, Math.max(0, Math.floor(latest * SEGMENT_COUNT)));

      setPreloadIndex((prev) => (prev === activeIndex ? prev : activeIndex));

      for (let index = 0; index < SEGMENT_COUNT; index++) {
        const video = videoRefs.current[index];
        if (!video) continue;

        const { start, end } = VIDEO_SEGMENTS[index];
        const fadeStart = Math.max(0, start - JOURNEY_CROSSFADE);
        const fadeEnd = Math.min(1, end + JOURNEY_CROSSFADE);

        // Opacity: 0 outside this clip's window, 1 across its active range,
        // linearly cross-fading through the small overlap at each edge.
        let opacity: number;
        if (latest <= start) {
          opacity = start > fadeStart ? clamp01((latest - fadeStart) / (start - fadeStart)) : 1;
        } else if (latest >= end) {
          opacity = fadeEnd > end ? clamp01(1 - (latest - end) / (fadeEnd - end)) : 1;
        } else {
          opacity = 1;
        }
        video.style.opacity = String(opacity);

        // Scrub currentTime only while this clip is at least partly visible
        // (its active window plus the cross-fade overlap on either side).
        const duration = durationsRef.current[index];
        if (duration > 0 && latest >= fadeStart && latest <= fadeEnd) {
          const local = clamp01((latest - start) / (end - start));
          const target = local * duration;
          if (Math.abs(video.currentTime - target) > 0.02) {
            video.currentTime = target;
          }
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scrollYProgress]);

  return (
    <div className="absolute inset-0 bg-[var(--stage)]">
      {VIDEO_SEGMENTS.map((segment, index) => (
        <video
          key={segment.src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          src={segment.src}
          muted
          playsInline
          preload={Math.abs(index - preloadIndex) <= 1 ? "auto" : "metadata"}
          onLoadedMetadata={(event) => {
            const video = event.currentTarget;
            if (Number.isFinite(video.duration)) {
              durationsRef.current[index] = video.duration;
              return;
            }
            // A small number of MP4 encoders (and some Chrome builds) report
            // duration as Infinity until the browser is forced to compute
            // it — the standard workaround is a large seek, then reset.
            const resolveDuration = () => {
              video.removeEventListener("timeupdate", resolveDuration);
              video.currentTime = 0;
              durationsRef.current[index] = Number.isFinite(video.duration) ? video.duration : 0;
            };
            video.addEventListener("timeupdate", resolveDuration);
            video.currentTime = 1e7;
          }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: index === 0 ? 1 : 0 }}
          aria-hidden="true"
          tabIndex={-1}
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

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
