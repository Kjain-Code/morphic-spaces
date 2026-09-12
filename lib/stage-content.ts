/**
 * The editorial content shown over the cinematic video. This is Morphic
 * Spaces' studio website — the video is atmospheric footage of one house,
 * not a listing for it, so the copy is about the studio (its positioning,
 * introduction, philosophy), never a room-by-room narration of the footage.
 *
 * Only real client-provided copy is used, in four beats spread evenly across
 * the scroll range (`start`–`end`, both 0–1, each a clean 1/4 slice after the
 * opening beat). `position` varies per beat — side (left/right) and height
 * (top/center/bottom) — so the block doesn't read as pinned to one spot for
 * the whole journey. The final beat closes the journey with an invitation
 * rather than more description, since the homepage has nothing after it —
 * this pinned section IS the entire page.
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
    end: 4 / 8,
    position: "center-right",
    label: "Studio",
    headlineLines: ["DESIGNING SPACES", "WITH INTENTION."],
    supportingText:
      "Morphic Spaces is a contemporary spatial design studio creating thoughtful environments for living, working and experiencing. We focus on functional planning, refined materiality and attention to detail to give every space its own character.",
  },
  {
    // Design philosophy / approach
    start: 4 / 8,
    end: 6 / 8,
    position: "top-left",
    label: "Design Philosophy",
    headlineLines: ["CONSIDERED.", "DISTINCTIVE. TIMELESS."],
    supportingText:
      "We believe good design begins with understanding the people, purpose and context of a space. Our approach combines functionality, proportion, materiality and detail to create spaces that feel considered, distinctive and timeless.",
  },
  {
    // Closing invitation — the journey's final beat and the homepage's only
    // call to action, since nothing renders below this pinned section.
    start: 6 / 8,
    end: 1,
    position: "bottom-right",
    label: "Begin",
    headlineLines: ["EVERY SPACE", "STARTS SOMEWHERE."],
    supportingText:
      "Ours begin with a conversation — about your site, your life within it, and the space you want it to become.",
  },
];
