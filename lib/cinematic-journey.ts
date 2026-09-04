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
 *        ffmpeg -i morphic-spaces-hero.mp4 -an -c:v libx264 -preset medium \
 *          -crf 18 -pix_fmt yuv420p -g 12 -keyint_min 12 -sc_threshold 0 \
 *          -movflags +faststart morphic-spaces-master.mp4
 *
 * One video element, one `currentTime`, no clip-switching logic. If the
 * source footage is ever regenerated, redo both passes and swap the file at
 * MASTER_VIDEO_SRC — nothing else needs to change.
 */

export const MASTER_VIDEO_SRC = "/videos/morphic-spaces-master.mp4";
export const MASTER_VIDEO_POSTER = "/images/hero/journey-poster.jpg";
