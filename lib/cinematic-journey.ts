/**
 * Configuration for the homepage's cinematic house journey — the one pinned
 * hero sequence that scrubs through seven transition clips as the visitor
 * scrolls. Everything about the sequence (which clips play, in what order,
 * over what scroll window, connecting which named stages) lives here, so the
 * clips can be replaced or re-timed later without touching any component.
 */

/** Named stages the camera passes through. 8 stages, connected by 7 clips. */
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

export interface VideoSegment {
  src: string;
  /** Index into JOURNEY_STAGES this clip departs from. */
  fromStage: number;
  /** Index into JOURNEY_STAGES this clip arrives at. */
  toStage: number;
  /** Normalized scroll-progress window (0–1) during which this clip is active. */
  start: number;
  end: number;
}

const SEGMENT_COUNT = JOURNEY_STAGES.length - 1; // 7 clips connect 8 stages

/**
 * VID1–VID7 as found in public/videos, each covering an equal ~1/7 slice of
 * the journey's scroll range:
 *   VID1  Exterior  → Entrance
 *   VID2  Entrance  → Living
 *   VID3  Living    → Kitchen
 *   VID4  Kitchen   → Staircase
 *   VID5  Staircase → Bedroom
 *   VID6  Bedroom   → Terrace
 *   VID7  Terrace   → Reveal (final exterior)
 */
export const VIDEO_SEGMENTS: VideoSegment[] = Array.from({ length: SEGMENT_COUNT }, (_, i) => ({
  src: `/videos/VID${i + 1}.mp4`,
  fromStage: i,
  toStage: i + 1,
  start: i / SEGMENT_COUNT,
  end: (i + 1) / SEGMENT_COUNT,
}));

/** How many viewport-heights of scroll the pinned cinematic section spans. */
export const JOURNEY_SCROLL_VH = 700;

/**
 * Fractional overlap (in scroll-progress units) used to cross-fade between
 * adjacent clips, so the cut between them reads as one continuous move
 * rather than a hard swap.
 */
export const JOURNEY_CROSSFADE = 0.035;
