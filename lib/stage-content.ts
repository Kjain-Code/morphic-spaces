/**
 * The editorial content shown over the cinematic video, one entry per stage
 * of the house journey (see JOURNEY_STAGES in cinematic-journey.ts for the
 * short HUD labels — this is the richer copy for the main content block).
 * All placeholder pending final client copy except stage 1 (hero) and
 * stage 8 (studio teaser), which use real client-provided copy.
 */
export interface StageContent {
  label: string;
  headlineLines: string[];
  supportingText: string;
}

export const STAGE_CONTENT: StageContent[] = [
  {
    // 01 — Exterior
    label: "Morphic Spaces",
    headlineLines: ["BEYOND SPACE.", "SHAPING EXPERIENCE."],
    supportingText:
      "A premium spatial design studio focused on contemporary residential, commercial and hospitality spaces.",
  },
  {
    // 02 — Entrance
    label: "The Arrival",
    headlineLines: ["DESIGNED TO WELCOME."],
    supportingText: "A considered threshold where architecture, material and light begin the experience.",
  },
  {
    // 03 — Living
    label: "The Living Space",
    headlineLines: ["SPACE SHAPES EXPERIENCE."],
    supportingText:
      "Proportion, materiality and natural light come together to create spaces with their own character.",
  },
  {
    // 04 — Kitchen
    label: "The Kitchen",
    headlineLines: ["FUNCTION, REFINED."],
    supportingText: "Thoughtful planning and material detail create a kitchen designed around everyday living.",
  },
  {
    // 05 — Staircase
    label: "The Staircase",
    headlineLines: ["A JOURNEY BETWEEN SPACES."],
    supportingText: "Circulation becomes architecture through proportion, light and carefully resolved detail.",
  },
  {
    // 06 — Bedroom
    label: "The Bedroom",
    headlineLines: ["QUIET, BY DESIGN."],
    supportingText:
      "A calm private environment shaped by natural materials, soft light and considered proportions.",
  },
  {
    // 07 — Terrace
    label: "The Terrace",
    headlineLines: ["WHERE SPACE MEETS OPEN AIR."],
    supportingText: "Architecture extends beyond the walls, connecting interior life with landscape and sky.",
  },
  {
    // 08 — Reveal
    label: "Morphic Spaces",
    headlineLines: ["DESIGNING SPACES", "WITH INTENTION."],
    supportingText:
      "Morphic Spaces is a contemporary spatial design studio creating thoughtful environments for living, working and experiencing.",
  },
];
