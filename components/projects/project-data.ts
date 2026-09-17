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
  /**
   * Optional extra photos shown only on this project's own detail page
   * (app/projects/[id]) — the main /projects grid and film strip keep
   * showing just `image`, so that listing stays visual-forward. Populated
   * only where the client's supplied photography actually offered more
   * than one good angle of the same project; several projects intentionally
   * have no gallery because no further usable photo existed for them.
   */
  gallery?: string[];
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
      "A three-storey Panchkula residence composed in charcoal stone and warm timber, its balconies stepping back in a quiet rhythm to soften the street-facing elevation. A projecting timber-lined roof canopy shades the top floor, while a planted forecourt and low boundary fencing keep the ground level open and welcoming. Seen lit up after dark, the home's stacked volumes read as a single, calm silhouette against the neighbourhood around it.",
    image: "/images/projects/147p-panchkula.jpg",
    gallery: ["/images/projects/panchkula-gallery-2.jpg", "/images/projects/panchkula-gallery-3.jpg"],
  },
  {
    id: "147p-panchkula-interior",
    number: "02",
    category: "Interiors",
    title: "147-P Residence, Interior",
    location: "Panchkula",
    year: "2024",
    description:
      "A double-height living room finished in walnut panelling and marble, its faceted timber ceiling drawing the eye up and toward the stair beyond. The open living and dining area is anchored by a textured feature wall behind the television, with a floating console and a curated mix of warm lighting keeping the marble floor from feeling cold. It is a space built for a family that entertains, with the dining table only a few steps from the main seating.",
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
      "A contemporary living space built around a sculpted staircase and dark timber panelling, its patterned rug and stone floor holding the room together. The open plan carries through to a dining area and a second lounge with a large framed artwork as its focal point, all lit by a mix of recessed and accent lighting. A private lift beside the stair rounds out a layout built for easy movement between floors.",
    image: "/images/projects/interior-panchkula.jpg",
    gallery: [
      "/images/projects/interior-panchkula-gallery-1.jpg",
      "/images/projects/interior-panchkula-gallery-2.jpg",
      "/images/projects/interior-panchkula-gallery-3.jpg",
    ],
  },
  {
    id: "residence-at-karnal",
    number: "04",
    category: "Residential",
    title: "Residence at Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A classical residence taking shape on a Karnal plot, its cream stone facade and arched loggias designed for a family home of quiet formality. A tiled corner turret and decorative cornice lines mark out the top floor, while wrought-iron balcony railings and a gated forecourt carry the classical language down to street level. The design favours symmetry and restraint over ornament, keeping the formal tone consistent from the entrance gate to the roofline.",
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
      "A compact three-storey home in Yamuna Nagar, its textured stone base and timber-clad upper volume built for a family that wanted warmth without excess. A diagonal timber lattice screen wraps the front corner for shade and privacy, while glass balcony railings and a brick garden wall keep the street-facing side open and unfussy. The result is a small footprint made to feel generous, with every material chosen to age well rather than simply look new.",
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
      "A modern villa taking shape in Kaithal, organized around clean stone-and-timber volumes, deep overhangs and a planted forecourt. A cantilevered top-floor box shelters a covered balcony below, its timber-lined ceiling and glass railings opening the first floor up to the street. At ground level, a wide driveway and a landscaped bed of flowering shrubs soften the arrival to the home's timber-and-wood front door.",
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
      "A Mohali residence composed of stacked glass balconies and warm stone cladding, its planted forecourt framing a sculptural entrance. Inside, the living areas continue the same material language: a brick accent wall and a timber-slat ceiling frame an open lounge and dining area, with a sunken sofa, a wet bar and a floating staircase built for entertaining as much as everyday living. Large glazing throughout keeps every level connected to the greenery outside.",
    image: "/images/projects/residence-mohali.jpg",
    gallery: ["/images/projects/mohali-interior-1.jpg", "/images/projects/mohali-interior-2.jpg"],
  },
  {
    id: "96-20-gurugram",
    number: "08",
    category: "Commercial",
    title: "96/20, Gurugram",
    location: "Gurugram",
    year: "2025",
    description:
      "A commercial residential building in Gurugram, its brick and stone facade organized in a formal, symmetrical rhythm around a central entrance. Wrought-iron balconies repeat across every floor behind a grid of tall glazing, framed by a dark cornice at the roofline and a matching balustrade above the ground-floor shops. Seen from the street corner, the composition holds its symmetry from any angle, giving the building a consistent, formal presence.",
    image: "/images/projects/gurugram-commercial.jpg",
    gallery: ["/images/projects/gurugram-gallery-1.jpg"],
  },
  {
    id: "kaushik-clinic-kaithal",
    number: "09",
    category: "Commercial",
    title: "Kaushik Homeo Clinic, Kaithal",
    location: "Kaithal",
    year: "2025",
    description:
      "A small healthcare and retail complex in Kaithal, bringing a clinic, pharmacy and café together around a shared courtyard and fountain. The pharmacy building announces itself with a perforated screen and backlit signage after dark, while a separate reception pavilion opens onto the courtyard through full-height glazing. Brick paving and clipped hedges tie the cafe, clinic signage and reception together into one walkable complex rather than a row of separate shopfronts.",
    image: "/images/projects/kaushik-clinic-kaithal.jpg",
    gallery: [
      "/images/projects/kaushik-clinic-gallery-1.jpg",
      "/images/projects/kaushik-clinic-gallery-2.jpg",
      "/images/projects/kaushik-clinic-gallery-3.jpg",
    ],
  },
  {
    id: "karnal-classical-concept",
    number: "10",
    category: "Residential",
    title: "Classical Residence Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A design study for a Karnal client, composed around arched colonnades, wrought-iron balconies and a restrained cream stone palette. A tiled corner tower with its own small balcony rises above the main roofline, giving the elevation a vertical accent against the arched loggias below. Seen head-on, the symmetrical arrangement of arches and balconies gives the design a settled, formal presence even at concept stage.",
    image: "/images/projects/karnal-classical-concept.jpg",
    gallery: ["/images/projects/karnal-classical-gallery-1.jpg"],
  },
  {
    id: "karnal-modern-concept",
    number: "11",
    category: "Residential",
    title: "Modern Residence Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A contemporary Karnal residence concept balancing a textured stone volume against a warm timber lattice and a fully glazed entrance bay. A sculptural cluster of angled steel columns supports the covered balcony above the entrance, with a decorative timber screen wrapping the stairwell beside it. Rendered in both daylight and evening light, the design reads equally well as a bright family home by day and a warmly lit one after dark.",
    image: "/images/projects/karnal-modern-concept.jpg",
    gallery: ["/images/projects/karnal-modern-gallery-1.jpg"],
  },
  {
    id: "karnal-contemporary-concept",
    number: "12",
    category: "Residential",
    title: "Contemporary Residence Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A design study for a Karnal client, its charcoal stone and warm timber volume framed by a full-height glowing light strip at dusk. A perforated timber jali screen shades one bedroom's balcony, while a plain white volume on the opposite side keeps the composition from feeling too heavy. Together, the stone, timber and white render give the home three distinct textures without losing a coherent overall form.",
    image: "/images/projects/karnal-contemporary-concept.jpg",
    gallery: ["/images/projects/karnal-contemporary-gallery-1.jpg"],
  },
  {
    id: "karnal-stone-concept",
    number: "13",
    category: "Residential",
    title: "Stone Residence Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A design study for a larger Karnal residence, its stone facade rising three storeys to a rooftop terrace screened in timber lattice. A deep, timber-lined roof overhang shades a full-width covered balcony on the first floor, while a colonnaded ground-floor porch and a jali screen at the entrance carry the same warm materials down to street level. The scale reads as a family home built for a large plot, with balconies on every side.",
    image: "/images/projects/karnal-stone-concept.jpg",
    gallery: ["/images/projects/karnal-stone-gallery-1.jpg"],
  },
  {
    id: "karnal-commercial-concept",
    number: "14",
    category: "Commercial",
    title: "Commercial Complex Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A design study for a mixed-use Karnal building, ground-floor retail shutters set beneath two storeys of residential balconies above. A dark stone-clad column and a wood-lined canopy mark the residential entrance beside the row of shops, keeping the two uses visually distinct while sharing one facade. The design keeps the shutters and balconies in a simple, repeating grid so the building can read clearly from a moving car.",
    image: "/images/projects/karnal-commercial-concept.jpg",
  },
  {
    id: "karnal-corner-concept",
    number: "15",
    category: "Commercial",
    title: "Corner Building Concept, Karnal",
    location: "Karnal",
    year: "2025",
    description:
      "A second mixed-use design study for a Karnal corner plot, its ground floor of shops wrapping the street corner beneath three storeys of stone-and-marble residential floors above. A perforated stone screen and a tall vertical signage panel mark the main entrance, while wrought-iron balcony railings repeat around both street-facing sides. The corner massing gives the building frontage on two roads, doubling its visibility for the shops below.",
    image: "/images/projects/karnal-corner-concept.jpg",
    gallery: ["/images/projects/karnal-corner-gallery-1.jpg"],
  },
];

export const PROJECT_COUNT = PROJECTS.length;
