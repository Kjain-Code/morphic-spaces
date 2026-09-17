/**
 * Centralized project data for /projects. Every entry below is one of the
 * studio's own real, client-supplied projects (public/images/projects/*),
 * replacing the earlier placeholder set that stood in for real photography
 * (fictional titles like "Bajaj Hospital" or "Indus School", local loading
 * images as stand-ins). Locations, categories and descriptions are drawn
 * only from what the supplied photography and renders actually show — no
 * invented clients, awards or square footage. A few projects are still
 * under construction; those are presented through their design/visualization
 * imagery rather than site-progress photos, without claiming completion.
 */
export interface Project {
  id: string;
  number: string;
  category: "Residential" | "Interiors" | "Commercial";
  title: string;
  location: string;
  year: string;
  description: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "147p-panchkula",
    number: "01",
    category: "Residential",
    title: "147-P, Sector 26 — Panchkula",
    location: "Panchkula",
    year: "2024",
    description:
      "A three-storey Panchkula residence composed in charcoal stone and warm timber, its balconies stepping back in a quiet rhythm to soften the street-facing elevation.",
    image: "/images/projects/147p-panchkula.jpg",
  },
  {
    id: "147p-panchkula-interior",
    number: "02",
    category: "Interiors",
    title: "147-P Residence, Interior",
    location: "Panchkula",
    year: "2024",
    description:
      "A double-height living room finished in walnut panelling and marble, its faceted timber ceiling drawing the eye up and toward the stair beyond.",
    image: "/images/projects/147p-panchkula-interior.jpg",
  },
  {
    id: "interior-at-panchkula",
    number: "03",
    category: "Interiors",
    title: "A Panchkula Interior",
    location: "Panchkula",
    year: "2024",
    description:
      "A contemporary living space built around a sculpted staircase and dark timber panelling, its patterned rug and stone floor holding the room together.",
    image: "/images/projects/interior-panchkula.jpg",
  },
  {
    id: "residence-at-karnal",
    number: "04",
    category: "Residential",
    title: "Residence at Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A classical residence taking shape on a Karnal plot, its cream stone facade and arched loggias designed for a family home of quiet formality.",
    image: "/images/projects/residence-karnal.jpg",
  },
  {
    id: "residence-at-yamuna-nagar",
    number: "05",
    category: "Residential",
    title: "Residence at Yamuna Nagar",
    location: "Yamuna Nagar",
    year: "2024",
    description:
      "A compact three-storey home in Yamuna Nagar, its textured stone base and timber-clad upper volume built for a family that wanted warmth without excess.",
    image: "/images/projects/residence-yamuna-nagar.jpg",
  },
  {
    id: "residence-at-kaithal",
    number: "06",
    category: "Residential",
    title: "Residence at Kaithal",
    location: "Kaithal",
    year: "2025",
    description:
      "A modern villa taking shape in Kaithal, organized around clean stone-and-timber volumes, deep overhangs and a planted forecourt.",
    image: "/images/projects/residence-kaithal.jpg",
  },
  {
    id: "residence-at-mohali",
    number: "07",
    category: "Residential",
    title: "Residence at Mohali",
    location: "Mohali",
    year: "2025",
    description:
      "A Mohali residence composed of stacked glass balconies and warm stone cladding, its planted forecourt framing a sculptural entrance.",
    image: "/images/projects/residence-mohali.jpg",
  },
  {
    id: "96-20-gurugram",
    number: "08",
    category: "Commercial",
    title: "96/20, Gurugram",
    location: "Gurugram",
    year: "2025",
    description:
      "A commercial residential building in Gurugram, its brick and stone facade organized in a formal, symmetrical rhythm around a central entrance.",
    image: "/images/projects/gurugram-commercial.jpg",
  },
  {
    id: "kaushik-clinic-kaithal",
    number: "09",
    category: "Commercial",
    title: "Kaushik Homeo Clinic, Kaithal",
    location: "Kaithal",
    year: "2025",
    description:
      "A small healthcare and retail complex in Kaithal, bringing a clinic, pharmacy and café together around a shared courtyard and fountain.",
    image: "/images/projects/kaushik-clinic-kaithal.jpg",
  },
  {
    id: "karnal-classical-concept",
    number: "10",
    category: "Residential",
    title: "Classical Residence Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A design study for a Karnal client, composed around arched colonnades, wrought-iron balconies and a restrained cream stone palette.",
    image: "/images/projects/karnal-classical-concept.jpg",
  },
  {
    id: "karnal-modern-concept",
    number: "11",
    category: "Residential",
    title: "Modern Residence Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A contemporary Karnal residence concept balancing a textured stone volume against a warm timber lattice and a fully glazed entrance bay.",
    image: "/images/projects/karnal-modern-concept.jpg",
  },
  {
    id: "karnal-contemporary-concept",
    number: "12",
    category: "Residential",
    title: "Contemporary Residence Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A design study for a Karnal client, its charcoal stone and warm timber volume framed by a full-height glowing light strip at dusk.",
    image: "/images/projects/karnal-contemporary-concept.jpg",
  },
  {
    id: "karnal-stone-concept",
    number: "13",
    category: "Residential",
    title: "Stone Residence Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A design study for a larger Karnal residence, its stone facade rising three storeys to a rooftop terrace screened in timber lattice.",
    image: "/images/projects/karnal-stone-concept.jpg",
  },
  {
    id: "karnal-commercial-concept",
    number: "14",
    category: "Commercial",
    title: "Commercial Complex Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A design study for a mixed-use Karnal building, ground-floor retail shutters set beneath two storeys of residential balconies above.",
    image: "/images/projects/karnal-commercial-concept.jpg",
  },
];

export const PROJECT_COUNT = PROJECTS.length;
