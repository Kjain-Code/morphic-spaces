/**
 * Centralized data for /services and its six individual service pages
 * (/services/[slug]). Copy is generic-editorial, matching the register
 * already used in components/projects/project-data.ts — no invented
 * clients, awards or numbers. Each service owns one image folder,
 * public/images/projects/<slug>/ (see lib/service-images.ts) — its detail page
 * shows the images from that folder, and heroImage / overviewImage below
 * must be files inside the same folder. A service whose folder holds few
 * images simply shows fewer — never invented ones.
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
  projectCategory?: "Residential" | "Interiors" | "Commercial";
  philosophyHeading: string;
  philosophyBody: string;
  heroImage: string;
  overviewImage: string;
}

export const SERVICES: Service[] = [
  {
    slug: "architecture",
    number: "01",
    title: "Architecture & Planning",
    shortTitle: "Architecture",
    tagline: "Thoughtful architecture, shaped around people and place.",
    description:
      "We create architectural environments that balance functionality, context and visual identity. Every project begins with a thorough understanding of the site, brief and intended user experience.",
    subServices: [
      "Residential Architecture",
      "Villas & Luxury Residences",
      "Farmhouses",
      "Commercial Architecture",
      "Institutional Spaces",
      "Site Planning",
      "Master Planning",
      "Concept Development",
      "Building Planning",
      "Municipal & Approval Drawings",
      "Working Drawings",
      "Construction Documentation",
      "Consultant Coordination",
    ],
    projectCategory: "Residential",
    philosophyHeading: "Architecture as response.",
    philosophyBody:
      "We believe architecture begins with listening — to the site, the climate, the context and the people who will inhabit it. Every decision follows from that understanding, not from a fixed style imposed on it.",
    heroImage: "/images/projects/architecture/residence-mohali.jpg",
    overviewImage: "/images/services/service-render-3.png",
  },
  {
    slug: "interior-design",
    number: "02",
    title: "Interior Architecture & Design",
    shortTitle: "Interior Design",
    tagline: "Interiors that are considered down to the smallest detail.",
    description:
      "We design interiors as an extension of architecture, integrating spatial planning, proportions, materials, lighting and detailing to create cohesive and refined environments.",
    subServices: [
      "Residential Interiors",
      "Luxury Homes & Villas",
      "Farmhouse Interiors",
      "Office & Workplace Interiors",
      "Retail & Commercial Interiors",
      "Hospitality Interiors",
      "Space Planning",
      "Furniture Layout & Design",
      "Material & Finish Selection",
      "Lighting Design",
      "False Ceiling & Flooring Design",
      "Custom Furniture & Joinery",
      "Detailed Interior Drawings",
      "Styling & Design Development",
    ],
    projectCategory: "Interiors",
    philosophyHeading: "Interiors as experience.",
    philosophyBody:
      "A room is more than its furniture. We shape interiors through proportion, material, light and texture, so a space feels considered the moment you enter it and only reveals more the longer you stay.",
    heroImage: "/images/projects/interior-design/residence-banur-interior.jpg",
    overviewImage: "/images/projects/interior-design/interior-panchkula.jpg",
  },
  {
    slug: "visualization",
    number: "03",
    title: "3D Visualization",
    shortTitle: "Visualization",
    tagline: "See the space before it exists.",
    description:
      "We transform architectural and interior concepts into immersive visual experiences. Our visualizations communicate scale, materials, lighting, atmosphere and overall design intent with clarity before construction begins.",
    subServices: [
      "Architectural 3D Visualization",
      "Interior 3D Visualization",
      "Exterior Renderings",
      "Photorealistic 3D Renders",
      "Product & Furniture Visualization",
      "Material & Finish Visualization",
      "Lighting Studies",
      "3D Walkthroughs",
      "Architectural Animation",
      "Flythrough Videos",
      "Virtual Staging",
      "Concept Visualization",
      "Design Presentation Renders",
    ],
    philosophyHeading: "Visualization as clarity.",
    philosophyBody:
      "Long before a wall goes up, a rendering lets everyone in the room see the same idea. We build every visualization on the same material and lighting decisions the finished space will actually carry, so what you approve is what gets built.",
    heroImage: "/images/projects/visualization/karnal-modern-concept.jpg",
    overviewImage: "/images/projects/visualization/karnal-stone-concept.jpg",
  },
  {
    slug: "landscape",
    number: "04",
    title: "Landscape & Outdoor Design",
    shortTitle: "Landscape",
    tagline: "Extending the design beyond the built form.",
    description:
      "We create outdoor environments that complement the architecture and enhance the way people experience the site. From intimate courtyards to expansive landscapes, every element is considered as part of the overall spatial composition.",
    subServices: [
      "Landscape Design",
      "Garden Design",
      "Courtyard Design",
      "Terrace & Rooftop Spaces",
      "Outdoor Living Areas",
      "Hardscape Design",
      "Softscape Planning",
      "Plantation & Greenery Planning",
      "Pathways & Outdoor Elements",
      "Landscape Lighting Concepts",
    ],
    philosophyHeading: "Landscape as continuation.",
    philosophyBody:
      "A building doesn't end at its walls. We treat the ground around it — courtyards, planting, hardscape — as part of the same design conversation, so architecture and landscape read as one composition.",
    heroImage: "/images/projects/landscape/landscaping.jpg",
    overviewImage: "/images/projects/landscape/landscaping-2.jpg",
  },
  {
    slug: "design-consultancy",
    number: "05",
    title: "Design Consultancy",
    shortTitle: "Consultancy",
    tagline: "Focused design expertise when you need it.",
    description:
      "For clients with an ongoing project or a specific design requirement, our consultancy services provide focused expertise, informed recommendations and practical guidance at key stages of the process.",
    subServices: [
      "Design Consultation",
      "Concept Review",
      "Design Development",
      "Space Planning Consultation",
      "Material & Finish Consultation",
      "Interior Design Consultation",
      "Renovation & Transformation Consultation",
      "Design Audits & Reviews",
      "Design Direction",
      "Project Design Advisory",
    ],
    philosophyHeading: "Guidance without taking over.",
    philosophyBody:
      "Not every project needs a studio full-time. Sometimes the most useful thing we can offer is a second opinion at the right moment — on a plan, a material choice or a stalled decision — held to the same rigor as our full projects.",
    heroImage: "/images/projects/design-consultancy/gurugram-commercial.jpg",
    overviewImage: "/images/projects/design-consultancy/kaushik-clinic-kaithal.jpg",
  },
  {
    slug: "renovation",
    number: "06",
    title: "Renovation & Transformation",
    shortTitle: "Renovation",
    tagline: "Reimagining existing spaces.",
    description:
      "We work with existing structures to unlock their potential through thoughtful planning, architectural interventions and interior transformation. Our approach focuses on improving functionality while establishing a renewed and cohesive identity.",
    subServices: [
      "Residential Renovation",
      "Interior Renovation",
      "Commercial Renovation",
      "Space Transformation",
      "Façade Upgradation",
      "Interior Refurbishment",
      "Layout Replanning",
      "Material & Finish Upgradation",
      "Adaptive Reuse",
      "Design & Documentation",
    ],
    philosophyHeading: "Respecting what's already there.",
    philosophyBody:
      "An existing structure carries its own logic — its bones, its constraints, its history. We work with that logic rather than against it, finding where a space can be opened up, reorganized or refreshed without erasing what already works.",
    heroImage: "/images/projects/renovation/renovation-before.jpg",
    overviewImage: "/images/projects/renovation/147p-panchkula.jpg",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    description: "We begin by understanding the site, requirements, lifestyle, aspirations and opportunities associated with the project.",
    image: "/images/services/approach/01-understand.jpg",
    tag: "Site Study",
  },
  {
    number: "02",
    title: "Conceptualize",
    description: "Ideas are developed through concepts, spatial studies, material palettes and visual references.",
    image: "/images/services/approach/02-conceptualize.jpg",
    tag: "Concept Ideas",
  },
  {
    number: "03",
    title: "Develop",
    description: "The selected direction is refined through detailed design, drawings, material specifications, lighting and technical coordination.",
    image: "/images/services/approach/03-develop.jpg",
    tag: "Planning & Details",
  },
  {
    number: "04",
    title: "Visualize",
    description: "3D visualizations communicate the design clearly and enable informed review before execution.",
    image: "/images/services/approach/04-visualize.jpg",
    tag: "3D Visualization",
  },
  {
    number: "05",
    title: "Deliver",
    description: "The design is translated into comprehensive documentation and coordinated information for execution.",
    image: "/images/services/approach/05-deliver.jpg",
    tag: "Under Construction → Final Result",
  },
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

/** "What We Create" — the building types the studio designs across, shown on /services between the process and the studio's four principles. */
export const WHAT_WE_CREATE = [
  {
    number: "01",
    title: "Residential",
    description: "Homes, villas, farmhouses and private residences designed around the people who inhabit them.",
  },
  {
    number: "02",
    title: "Commercial",
    description:
      "Workspaces, retail environments and commercial spaces designed to establish a strong identity and meaningful user experience.",
  },
  {
    number: "03",
    title: "Hospitality",
    description: "Spaces that integrate atmosphere, functionality and a considered guest experience.",
  },
  {
    number: "04",
    title: "Institutional",
    description: "Purpose-driven environments designed around usability, efficiency and human interaction.",
  },
  {
    number: "05",
    title: "Landscape",
    description: "Outdoor environments that connect architecture with nature and extend the experience of the built space.",
  },
  {
    number: "06",
    title: "Visualization",
    description: "High-quality architectural and interior visualizations that communicate design with clarity and impact.",
  },
] as const;
