"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { MASTER_VIDEO_POSTER, MASTER_VIDEO_SRC } from "@/lib/cinematic-journey";

export interface CinematicMasterVideoProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * The hero's entire visual: ONE continuous video element, playing nothing on
 * its own. A single requestAnimationFrame loop reads `scrollYProgress` once
 * per frame and writes `currentTime` straight onto the video via a ref — no
 * React state on the hot path, no `.play()` call anywhere, nothing else ever
 * moves this video. Scrolling down plays it forward, scrolling up plays it
 * back, and stopping freezes it exactly where it is.
 *
 * The native `poster` attribute (a still frame extracted from the video's
 * own opening moment) paints immediately so there's never a black hero while
 * the video buffers — the browser swaps it out on its own once the video has
 * a decoded frame to show.
 */
export function CinematicMasterVideo({ scrollYProgress }: CinematicMasterVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const [isPlayable, setIsPlayable] = useState(false);

  // Media events (loadedmetadata, canplay, ...) don't bubble, and for an
  // already-cached video the browser can fire them before a React prop's
  // listener even attaches — that race silently drops the event and leaves
  // durationRef at 0 forever. Checking readyState directly first (and only
  // falling back to a listener when metadata genuinely isn't ready yet)
  // sidesteps the race entirely.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyDuration = () => {
      if (Number.isFinite(video.duration)) {
        durationRef.current = video.duration;
        return;
      }
      // A handful of MP4 encodes (and some Chrome builds) report duration as
      // Infinity until the browser is forced to compute it — the standard
      // workaround is a large seek, then reset to start.
      const resolveDuration = () => {
        video.removeEventListener("timeupdate", resolveDuration);
        video.currentTime = 0;
        durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      };
      video.addEventListener("timeupdate", resolveDuration);
      video.currentTime = 1e7;
    };
    const markPlayable = () => setIsPlayable(true);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) applyDuration();
    else video.addEventListener("loadedmetadata", applyDuration, { once: true });

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) markPlayable();
    else video.addEventListener("canplay", markPlayable, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", applyDuration);
      video.removeEventListener("canplay", markPlayable);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const video = videoRef.current;
      const duration = durationRef.current;
      if (video && duration > 0) {
        const progress = Math.min(1, Math.max(0, scrollYProgress.get()));
        const target = progress * duration;
        if (Math.abs(video.currentTime - target) > 0.02) {
          video.currentTime = target;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scrollYProgress]);

  return (
    <div className="absolute inset-0 bg-[var(--stage)]">
      <video
        ref={videoRef}
        src={MASTER_VIDEO_SRC}
        poster={MASTER_VIDEO_POSTER}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isPlayable ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
        tabIndex={-1}
      />

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
