/**
 * Centralized data for /services and its four individual service pages
 * (/services/[slug]). Copy is generic-editorial, matching the register
 * already used in components/projects/project-data.ts — no invented
 * clients, awards or numbers. Featured work links back to the studio's
 * real projects (components/projects/project-data.ts) by category; a
 * service with no matching real projects yet (Landscape, Furniture &
 * Decor) simply shows fewer or none — never invented ones.
 */
export interface Service {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  subServices: string[];
  /** Maps to Project["category"] in project-data.ts, for the Featured Work section. Undefined = no matching real projects yet. */
  projectCategory?: "Residential" | "Interiors";
  philosophyHeading: string;
  philosophyBody: string;
  heroImage: string;
  overviewImage: string;
}

export const SERVICES: Service[] = [
  {
    slug: "architecture",
    number: "01",
    title: "Architecture",
    shortTitle: "Architecture",
    tagline: "We shape spaces with purpose.",
    description:
      "We design buildings that respond to their site, climate, context and the people who inhabit them.",
    subServices: [
      "Concept & Planning",
      "Residential Architecture",
      "Site Planning",
      "Facade & Material Development",
      "Working Drawings",
      "Execution Coordination",
    ],
    projectCategory: "Residential",
    philosophyHeading: "Architecture as response.",
    philosophyBody:
      "We believe architecture begins with listening — to the site, the climate, the context and the people who will inhabit it. Every decision follows from that understanding, not from a fixed style imposed on it.",
    heroImage: "/images/projects/residence-mohali.jpg",
    overviewImage: "/images/services/service-render-2.png",
  },
  {
    slug: "interior-design",
    number: "02",
    title: "Interior Design",
    shortTitle: "Interior Design",
    tagline: "Spaces shaped by how you live.",
    description:
      "Interiors built around material, light and the rhythm of everyday life — proportion and texture doing more than ornament ever could.",
    subServices: [
      "Space Planning",
      "Residential Interiors",
      "Material Selection",
      "Lighting Design",
      "Custom Detailing",
      "Styling & Art Direction",
    ],
    projectCategory: "Interiors",
    philosophyHeading: "Interiors as experience.",
    philosophyBody:
      "A room is more than its furniture. We shape interiors through proportion, material, light and texture, so a space feels considered the moment you enter it and only reveals more the longer you stay.",
    heroImage: "/images/projects/147p-panchkula-interior.jpg",
    overviewImage: "/images/projects/interior-panchkula.jpg",
  },
  {
    slug: "landscape",
    number: "03",
    title: "Landscape",
    shortTitle: "Landscape",
    tagline: "Architecture, extended outward.",
    description:
      "Outdoor environments designed to extend the architecture and create a stronger relationship with nature.",
    subServices: [
      "Landscape Planning",
      "Planting Strategy",
      "Hardscape Design",
      "Courtyards & Gardens",
      "Outdoor Living",
      "Lighting",
    ],
    philosophyHeading: "Landscape as continuation.",
    philosophyBody:
      "A building doesn't end at its walls. We treat the ground around it — courtyards, planting, hardscape — as part of the same design conversation, so architecture and landscape read as one composition.",
    heroImage: "/images/services/landscaping.jpg",
    overviewImage: "/images/services/landscaping-2.jpg",
  },
  {
    slug: "furniture-decor",
    number: "04",
    title: "Furniture & Decor",
    shortTitle: "Furniture & Decor",
    tagline: "The final layer of a space.",
    description: "Objects and details chosen to complete the character of a space, not simply fill it.",
    subServices: ["Custom Furniture", "Loose Furniture", "Decor Curation", "Art & Objects", "Material Details", "Styling"],
    philosophyHeading: "Objects with intention.",
    philosophyBody:
      "Furniture and decor are the layer people touch every day. We choose and design pieces the same way we design a room — for proportion, material honesty and how they age, not for trend.",
    heroImage: "/images/projects/interior-panchkula.jpg",
    overviewImage: "/images/projects/147p-panchkula-interior.jpg",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export const PROCESS_STEPS = [
  { number: "01", title: "Discover", description: "Understanding your vision, site and aspirations." },
  { number: "02", title: "Design", description: "Creating thoughtful spatial and material solutions." },
  { number: "03", title: "Develop", description: "Refining every decision with clarity and detail." },
  { number: "04", title: "Deliver", description: "Bringing the vision into the real world." },
] as const;

export const MORPHIC_APPROACH_POINTS = [
  {
    number: "01",
    title: "Context Before Form",
    description: "Every design begins with understanding the place.",
  },
  {
    number: "02",
    title: "Material With Intention",
    description: "Materials are selected for how they age, feel and belong.",
  },
  {
    number: "03",
    title: "Detail That Endures",
    description: "The smallest decisions shape the experience of the whole.",
  },
  {
    number: "04",
    title: "Designing For Life",
    description: "A beautiful space must also work beautifully.",
  },
] as const;
