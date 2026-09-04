/**
 * Configuration for the homepage's cinematic house journey — one continuous
 * master video, scrubbed by scroll position. Everything about the journey
 * (which video plays, how long the pinned section holds it, which named
 * stages it passes through) lives here.
 *
 * public/videos/morphic-spaces-hero.mp4 is the seven Google Flow clips
 * (VID1–VID7, formerly in public/videos/) losslessly concatenated in order
 * with ffmpeg's concat demuxer (stream copy, no re-encode — all seven share
 * identical codec/resolution/frame rate, so this is exact, not a re-render):
 *
 *   ffmpeg -f concat -safe 0 -i concat_list.txt -an -c:v copy \
 *     -movflags +faststart public/videos/morphic-spaces-hero.mp4
 *
 * One video element, one `currentTime`, no clip-switching logic. If the
 * source footage is ever regenerated, redo that same concat and swap the
 * file at MASTER_VIDEO_SRC — nothing else needs to change.
 */

export const MASTER_VIDEO_SRC = "/videos/morphic-spaces-hero.mp4";
export const MASTER_VIDEO_POSTER = "/images/hero/journey-poster.jpg";

/** Named stages the camera passes through, in order, evenly spaced across the video's duration. */
export const JOURNEY_STAGES = [
  "Exterior",
  "Entrance",
  "Living",
  "Kitchen",
  "Staircase",
  "Bedroom",
  "Terrace",
  "Reveal",
] as const;

/** How many viewport-heights of scroll the pinned cinematic section spans. */
export const JOURNEY_SCROLL_VH = 700;
