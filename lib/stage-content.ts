/**
 * The editorial content shown over the cinematic video. This is Morphic
 * Spaces' studio website — the video is atmospheric footage of one house,
 * not a listing for it, so the copy is about the studio (its positioning,
 * introduction, philosophy), never a room-by-room narration of the footage.
 *
 * Only real client-provided copy is used, in three beats spread across the
 * scroll range (`start`–`end`, both 0–1). `position` varies per beat — side
 * (left/right) and height (top/center/bottom) — so the block doesn't read
 * as pinned to one spot for the whole journey.
 */
export type StagePosition = "bottom-left" | "bottom-right" | "top-left" | "top-right" | "center-left" | "center-right";

export interface StageContent {
  start: number;
  end: number;
  position: StagePosition;
  label: string;
  headlineLines: string[];
  supportingText: string;
}

export const STAGE_CONTENT: StageContent[] = [
  {
    // Hero
    start: 0,
    end: 2 / 8,
    position: "bottom-left",
    label: "Morphic Spaces",
    headlineLines: ["BEYOND SPACE.", "SHAPING EXPERIENCE."],
    // Positioning
    supportingText:
      "A premium spatial design studio focused on contemporary residential, commercial and hospitality spaces.",
  },
  {
    // Studio introduction
    start: 2 / 8,
    end: 5 / 8,
    position: "center-right",
    label: "Studio",
    headlineLines: ["DESIGNING SPACES", "WITH INTENTION."],
    supportingText:
      "Morphic Spaces is a contemporary spatial design studio creating thoughtful environments for living, working and experiencing. We focus on functional planning, refined materiality and attention to detail to give every space its own character.",
  },
  {
    // Design philosophy / approach
    start: 5 / 8,
    end: 1,
    position: "top-left",
    label: "Design Philosophy",
    headlineLines: ["CONSIDERED.", "DISTINCTIVE. TIMELESS."],
    supportingText:
      "We believe good design begins with understanding the people, purpose and context of a space. Our approach combines functionality, proportion, materiality and detail to create spaces that feel considered, distinctive and timeless.",
  },
];
