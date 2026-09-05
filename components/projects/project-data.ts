/**
 * Centralized project data for /projects. Every image below is a local
 * temporary visual (public/images/loading/*) standing in for real client
 * photography — swap the `image` paths (and copy) here once that arrives;
 * nothing in the components needs to change. Copy is deliberately generic
 * editorial placeholder, not factual claims (no invented clients, awards or
 * square footage). Locations are drawn from the same tricity footprint named
 * in components/about/studio-info.tsx; years fall within the studio's own
 * stated founding year (2022) through the present.
 *
 * `2nd.png` and `4th.png` are deliberately excluded from this set — see
 * lib/loading-images.ts — they carry a real third-party name baked into the
 * render and shouldn't be reassigned to an invented project here.
 */
export interface Project {
  id: string;
  number: string;
  category: "Residential" | "Interiors";
  title: string;
  location: string;
  year: string;
  description: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "the-courtyard-house",
    number: "01",
    category: "Residential",
    title: "The Courtyard House",
    location: "Mohali",
    year: "2024",
    description:
      "A residence organized around a sequence of thresholds — gate, garden, veranda — each calibrated to slow the approach and frame the arrival.",
    image: "/images/loading/1st.png",
  },
  {
    id: "a-study-in-green",
    number: "02",
    category: "Interiors",
    title: "A Study in Green",
    location: "Chandigarh",
    year: "2023",
    description:
      "An interior built on restraint — one deep, considered green anchoring the room, warm textiles and low light doing the rest of the work.",
    image: "/images/loading/10th.png",
  },
  {
    id: "the-vertical-plot",
    number: "03",
    category: "Residential",
    title: "The Vertical Plot",
    location: "Panchkula",
    year: "2025",
    description:
      "On a narrow urban plot the house turns upward — three floors stacked behind a perforated screen that filters light without giving up privacy.",
    image: "/images/loading/3rd.png",
  },
  {
    id: "the-reading-mezzanine",
    number: "04",
    category: "Interiors",
    title: "The Reading Mezzanine",
    location: "Chandigarh",
    year: "2023",
    description:
      "A library landing suspended over the stair, timber joinery and layered light making a small footprint feel considered rather than compressed.",
    image: "/images/loading/7th.png",
  },
  {
    id: "an-open-horizon",
    number: "05",
    category: "Residential",
    title: "An Open Horizon",
    location: "Gurugram",
    year: "2024",
    description:
      "Architecture conceived as a continuous relationship between enclosed space, landscape and sky — each terrace a further release toward the horizon.",
    image: "/images/loading/9th.png",
  },
  {
    id: "a-quiet-expression",
    number: "06",
    category: "Residential",
    title: "A Quiet Expression",
    location: "Mohali",
    year: "2022",
    description:
      "A restrained residential language built through proportion, texture, light and material continuity across three floors.",
    image: "/images/loading/6th.png",
  },
  {
    id: "material-in-balance",
    number: "07",
    category: "Interiors",
    title: "Material in Balance",
    location: "Panchkula",
    year: "2024",
    description:
      "A dining space where timber, stone and soft textile hold equal weight — proportion and texture doing more than ornament ever could.",
    image: "/images/loading/8th.png",
  },
  {
    id: "the-radiant-edge",
    number: "08",
    category: "Residential",
    title: "The Radiant Edge",
    location: "Chandigarh",
    year: "2025",
    description:
      "A rounded threshold traced in warm light, the facade softening at its one curved corner where the house turns to meet the street.",
    image: "/images/loading/5th.png",
  },
];

export const PROJECT_COUNT = PROJECTS.length;
