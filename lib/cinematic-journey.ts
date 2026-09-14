/**
 * Configuration for the homepage's cinematic house journey — one continuous
 * master video, scrubbed by scroll position via GSAP ScrollTrigger (see
 * components/home/video-scrubber.tsx). Everything about which video plays
 * and which named stages it passes through lives here.
 *
 * public/videos/morphic-spaces-master.mp4 is built from the seven Google
 * Flow clips (VID1–VID7, formerly in public/videos/) in two ffmpeg passes:
 *
 *   1. Concatenate in order via the concat demuxer (stream copy):
 *        ffmpeg -f concat -safe 0 -i concat_list.txt -an -c:v copy \
 *          -movflags +faststart morphic-spaces-hero.mp4
 *   2. Re-encode with a tight GOP for responsive scroll-seeking. The
 *      concat's stream copy inherited each source clip's own keyframe
 *      spacing — one keyframe roughly every 8s (a whole clip) — so seeking
 *      mid-clip forced the browser to decode up to ~190 frames forward from
 *      the last keyframe on every scrub. A keyframe every 0.5s (12 frames
 *      at 24fps) fixes that at the source:
 *        ffmpeg -i morphic-spaces-hero.mp4 -an -c:v libx264 -preset slow \
 *          -crf 27 -maxrate 2500k -bufsize 5000k -pix_fmt yuv420p -g 12 \
 *          -keyint_min 12 -sc_threshold 0 -movflags +faststart \
 *          morphic-spaces-master.mp4
 *
 *      `-crf 18` originally shipped here produced an 84MB/56s file (~12
 *      Mbps at 1280x720) that reliably stalled scroll-scrubbing on real
 *      connections — confirmed on the deployed site: the video never got
 *      past HAVE_NOTHING/duration=NaN because the browser couldn't keep
 *      up buffering it, leaving the poster frame frozen for the entire
 *      scroll journey no matter how far the user scrolled. `-crf 27
 *      -maxrate 2500k` brings that to ~14MB (~2 Mbps) at visually
 *      identical quality once the text/gradient overlays sit on top —
 *      verified by extracting matching frames from both encodes.
 *      Server-side range support and the faststart moov placement were
 *      already correct; file size was the actual bottleneck. Re-verify
 *      with the same frame-comparison + live-scroll test (see PR/commit
 *      history) before shipping any future re-encode with a lower CRF.
 *
 * One video element, one `currentTime`, no clip-switching logic. If the
 * source footage is ever regenerated, redo both passes and swap the file at
 * MASTER_VIDEO_SRC — nothing else needs to change. See next.config.ts for
 * the long-lived Cache-Control header applied to /videos/*; bump the
 * filename (not just the bytes) if you ever swap this file, so caches
 * already holding the old one don't keep serving it.
 */

export const MASTER_VIDEO_SRC = "/videos/morphic-spaces-master.mp4";
export const MASTER_VIDEO_POSTER = "/images/hero/journey-poster.jpg";
