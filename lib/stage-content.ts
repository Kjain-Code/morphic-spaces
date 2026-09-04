/**
 * The editorial content shown over the cinematic video, one entry per stage
 * of the house journey. All placeholder pending final client copy except
 * stage 1 (hero) and stage 8 (the studio story, told as the journey's
 * resolution rather than a separate section below it).
 *
 * `position` varies where each stage's content sits (and which direction it
 * animates in from) so the block doesn't read as pinned to one corner for
 * the whole journey.
 */
export type StagePosition = "bottom-left" | "top-left" | "center-left";

export interface StageContent {
  position: StagePosition;
  label: string;
  headlineLines: string[];
  supportingText: string;
  /** Stage 8 only: the studio story gets a second, labeled block. */
  secondaryLabel?: string;
  secondaryText?: string;
}

export const STAGE_CONTENT: StageContent[] = [
  {
    // 01 — Exterior
    position: "bottom-left",
    label: "Morphic Spaces",
    headlineLines: ["BEYOND SPACE.", "SHAPING EXPERIENCE."],
    supportingText:
      "A premium spatial design studio focused on contemporary residential, commercial and hospitality spaces.",
  },
  {
    // 02 — Entrance
    position: "top-left",
    label: "The Arrival",
    headlineLines: ["DESIGNED TO WELCOME."],
    supportingText: "A considered threshold where architecture, material and light begin the experience.",
  },
  {
    // 03 — Living
    position: "center-left",
    label: "The Living Space",
    headlineLines: ["SPACE SHAPES EXPERIENCE."],
    supportingText:
      "Proportion, materiality and natural light come together to create spaces with their own character.",
  },
  {
    // 04 — Kitchen
    position: "bottom-left",
    label: "The Kitchen",
    headlineLines: ["FUNCTION, REFINED."],
    supportingText: "Thoughtful planning and material detail create a kitchen designed around everyday living.",
  },
  {
    // 05 — Staircase
    position: "top-left",
    label: "The Staircase",
    headlineLines: ["A JOURNEY BETWEEN SPACES."],
    supportingText: "Circulation becomes architecture through proportion, light and carefully resolved detail.",
  },
  {
    // 06 — Bedroom
    position: "center-left",
    label: "The Bedroom",
    headlineLines: ["QUIET, BY DESIGN."],
    supportingText:
      "A calm private environment shaped by natural materials, soft light and considered proportions.",
  },
  {
    // 07 — Terrace
    position: "bottom-left",
    label: "The Terrace",
    headlineLines: ["WHERE SPACE MEETS OPEN AIR."],
    supportingText: "Architecture extends beyond the walls, connecting interior life with landscape and sky.",
  },
  {
    // 08 — Reveal: the studio story, told here rather than in a section below.
    position: "center-left",
    label: "Studio",
    headlineLines: ["DESIGNING SPACES", "WITH INTENTION."],
    supportingText:
      "Morphic Spaces is a contemporary spatial design studio creating thoughtful environments for living, working and experiencing. We focus on functional planning, refined materiality and attention to detail to give every space its own character.",
    secondaryLabel: "Design Philosophy",
    secondaryText:
      "We believe good design begins with understanding the people, purpose and context of a space. Our approach combines functionality, proportion, materiality and detail to create spaces that feel considered, distinctive and timeless.",
  },
];
