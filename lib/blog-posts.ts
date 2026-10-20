/**
 * The studio journal (/blog). One article per service, each written as a
 * genuinely useful guide for someone planning a project in the Tricity, and
 * illustrated only with the studio's own project imagery. No invented
 * statistics, clients, costs or awards — where a project is referenced, it
 * is one of the real entries in components/projects/project-data.ts.
 *
 * Paragraph text supports inline links written as [label](/path).
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string; caption: string; projectId?: string }
  | { type: "callout"; title: string; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  /** Search-facing title (the "| Morphic Spaces" suffix is added by the layout template). */
  seoTitle: string;
  /** Meta description and card excerpt — kept under ~160 characters. */
  excerpt: string;
  /** The service this article belongs to (lib/services-data.ts slug). */
  serviceSlug: string;
  /** Short label shown on cards. */
  category: string;
  /** ISO date the article was published on the site. */
  publishedAt: string;
  heroImage: string;
  heroAlt: string;
  /** Real projects (project-data.ts ids) shown under "From our work". */
  relatedProjectIds: string[];
  body: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "designing-a-home-for-chandigarh-climate",
    title: "Designing a Home for the Tricity Climate",
    seoTitle: "Designing a Home for Chandigarh's Climate",
    excerpt:
      "How orientation, overhangs, jaalis and the right materials make a Chandigarh, Panchkula or Mohali home comfortable through hot summers and heavy monsoons.",
    serviceSlug: "architecture",
    category: "Architecture",
    publishedAt: "2026-10-20",
    heroImage: "/images/projects/architecture/residence-mohali.jpg",
    heroAlt: "Residence at Mohali by Morphic Spaces — stone cladding, glass balconies and a planted forecourt",
    relatedProjectIds: ["residence-at-mohali", "arora-residence-panchkula", "residence-at-banur"],
    body: [
      {
        type: "p",
        text: "Few places in India test a house as honestly as the Tricity. Summers are long, bright and dry, the monsoon arrives in heavy bursts, and winter mornings are colder than most people expect. A home that looks striking in a render but ignores this cycle ends up relying on air-conditioning for half the year and heaters for the rest.",
      },
      {
        type: "p",
        text: "Good residential architecture here does not start with a style. It starts with the plot, the sun and the way a family actually lives. These are the decisions we look at first on every [residential project](/services/architecture).",
      },
      { type: "h2", id: "orientation", text: "Start with orientation, not elevation" },
      {
        type: "p",
        text: "Most plots in Chandigarh, Panchkula and Mohali are rectangular and fixed to a road, so the front of the house is decided before design begins. Orientation still matters. It decides which rooms get gentle morning light and which ones take the harsh afternoon sun from the west.",
      },
      {
        type: "list",
        items: [
          "Living areas and bedrooms work best on the north and east, where light is softer and heat gain is lower.",
          "Staircases, stores, toilets and utility spaces make good buffers on the west and south-west.",
          "If the main facade has to face west, deep balconies, screens or a double skin protect the rooms behind it.",
        ],
      },
      { type: "h2", id: "shade", text: "Shade is the most valuable element on the facade" },
      {
        type: "p",
        text: "Deep overhangs, projecting canopies and recessed balconies do more for comfort than any glass specification. A slab that projects a little further keeps the high summer sun off the glass and still lets the low winter sun in. The section of a house matters as much as its plan.",
      },
      {
        type: "image",
        src: "/images/projects/architecture/residence-arora-panchkula.jpg",
        alt: "Arora Residence, Panchkula — glazed stair bay with a perforated jaali screen and timber canopy",
        caption: "Arora Residence, Panchkula — a perforated screen and projecting canopy shade the glazed stair bay.",
        projectId: "arora-residence-panchkula",
      },
      {
        type: "p",
        text: "Perforated jaali screens are one of the oldest ways to do this, and they still work. They cut glare, give privacy from the street and let air move through. In brick, stone, terracotta or metal, they can also become the strongest part of a contemporary elevation.",
      },
      { type: "h2", id: "materials", text: "Choose materials that age well" },
      {
        type: "p",
        text: "Painted plaster looks crisp on the day of handover and tired after two monsoons. Natural stone, exposed brick, good-quality timber cladding and textured finishes weather far more gracefully. They also hide dust, which in this region is not a small consideration.",
      },
      {
        type: "list",
        items: [
          "Stone and brick on the lower floors take splashback and wear without staining.",
          "Timber or timber-look cladding brings warmth, but should be placed where it is protected from direct rain.",
          "Light-coloured roofs and terraces reflect heat instead of storing it in the slab above your bedrooms.",
        ],
      },
      {
        type: "quote",
        text: "A house should feel right in May and in January, not only on the day it is photographed.",
      },
      { type: "h2", id: "monsoon", text: "Design for the monsoon from day one" },
      {
        type: "p",
        text: "Heavy rain exposes every weak detail. Terrace slopes, drain positions, parapet copings, window sills and the junction between cladding and plaster all need to be drawn, not left to the site. A well-detailed house stays dry and keeps its finish for years.",
      },
      { type: "h2", id: "approvals", text: "Know the rules before you fall in love with a design" },
      {
        type: "p",
        text: "Chandigarh, Panchkula and Mohali each follow their own building rules for setbacks, ground coverage, height and basements. Two plots of the same size in different sectors can allow very different houses. Checking this at concept stage avoids redesigning a plan you have already grown attached to.",
      },
      {
        type: "callout",
        title: "Planning a new home?",
        text: "Share your plot size, location and the way your family lives. We will tell you what the site allows and how we would approach it.",
      },
    ],
  },
  {
    slug: "designing-double-height-living-rooms",
    title: "Double-Height Living Rooms That Feel Warm, Not Empty",
    seoTitle: "Double-Height Living Room Design Ideas",
    excerpt:
      "Double-height spaces can feel grand or cold. How proportion, wall panelling, lighting layers and the staircase make them warm and liveable.",
    serviceSlug: "interior-design",
    category: "Interior Design",
    publishedAt: "2026-10-20",
    heroImage: "/images/projects/interior-design/panchkula-duplex-interior.jpg",
    heroAlt: "A Panchkula duplex interior by Morphic Spaces — double-height living room in walnut and marble",
    relatedProjectIds: ["panchkula-duplex-interior", "147p-panchkula-interior", "residence-at-banur-interior"],
    body: [
      {
        type: "p",
        text: "A double-height living room is often the most-requested feature in a new home, and also the one most often regretted. Done well, it becomes the heart of the house. Done badly, it echoes, is hard to heat and cool, and makes the furniture look lost.",
      },
      {
        type: "p",
        text: "We have designed several of these spaces in Panchkula and Banur. The difference almost always comes down to a few [interior design](/services/interior-design) decisions made early.",
      },
      { type: "h2", id: "anchor-wall", text: "Give the tall wall a purpose" },
      {
        type: "p",
        text: "The tallest wall is what everyone sees first. Left as plain plaster, it makes the room feel unfinished. Treated as a single, continuous surface it gives the volume a focus and brings the scale back to human level.",
      },
      {
        type: "list",
        items: [
          "Full-height timber panelling, such as walnut or oak veneer, adds warmth and helps absorb sound.",
          "A textured stone or fluted feature wall behind the TV or seating creates a natural anchor.",
          "Large artwork works only if it is truly large. Small frames on a six-metre wall disappear.",
        ],
      },
      {
        type: "image",
        src: "/images/projects/interior-design/147p-panchkula-interior.jpg",
        alt: "147-P Residence interior, Panchkula — double-height living room with walnut panelling and faceted timber ceiling",
        caption: "147-P Residence, Panchkula — walnut panelling and a faceted timber ceiling draw the eye upward.",
        projectId: "147p-panchkula-interior",
      },
      { type: "h2", id: "lighting", text: "Light it in layers" },
      {
        type: "p",
        text: "A single chandelier cannot light a double-height room. The room needs light at three levels: ambient light from the ceiling or coves, task light where people sit and read, and accent light that picks out the wall, artwork and staircase.",
      },
      {
        type: "p",
        text: "A statement pendant or chandelier should hang low enough to belong to the living area, not float near the ceiling. Wall washers and concealed linear lights on the tall wall make the space feel warm in the evening rather than cavernous.",
      },
      {
        type: "quote",
        text: "The volume makes the first impression. The lighting decides whether people want to stay in the room.",
      },
      { type: "h2", id: "staircase", text: "Treat the staircase as part of the room" },
      {
        type: "p",
        text: "In most double-height layouts the staircase sits inside or beside the living space, so it cannot be an afterthought. Marble or timber treads, a glass balustrade and a warm handrail let the stair read as furniture. A skylight above the stairwell can bring daylight deep into the home.",
      },
      { type: "h2", id: "comfort", text: "Plan for sound and temperature" },
      {
        type: "list",
        items: [
          "Soft surfaces such as rugs, upholstery, curtains and panelling reduce echo.",
          "Ceiling fans or high-level returns help move warm air that collects at the top in summer.",
          "Full-height glazing needs shading, otherwise the room overheats in the afternoon.",
        ],
      },
      { type: "h2", id: "furniture", text: "Scale the furniture to the room" },
      {
        type: "p",
        text: "Standard sofas look small under a six-metre ceiling. Lower, deeper and longer seating, a generous rug that holds the group together and a floating console under the TV help the furniture claim the space without crowding it.",
      },
      {
        type: "callout",
        title: "Designing a tall living space?",
        text: "Send us your floor plan and section. We will suggest how to make the volume feel generous and comfortable.",
      },
    ],
  },
  {
    slug: "why-3d-visualization-before-construction",
    title: "Why 3D Visualization Before Construction Is Worth It",
    seoTitle: "Why 3D Visualization Before Construction Matters",
    excerpt:
      "What 3D renders and walkthroughs actually show, which decisions they help you make, and what to ask for before construction starts on site.",
    serviceSlug: "visualization",
    category: "3D Visualization",
    publishedAt: "2026-10-20",
    heroImage: "/images/projects/visualization/karnal-modern-concept.jpg",
    heroAlt: "Modern Residence Concept, Karnal — 3D visualization by Morphic Spaces",
    relatedProjectIds: ["karnal-modern-concept", "karnal-contemporary-concept", "group-housing-concept"],
    body: [
      {
        type: "p",
        text: "Most homeowners are asked to approve a building from a set of 2D drawings. Architects read plans and elevations fluently. Clients, contractors and families usually do not. That gap is where expensive changes on site begin.",
      },
      {
        type: "p",
        text: "[3D visualization](/services/visualization) closes that gap. It shows the design the way you will actually experience it, with real materials, real light and real proportions, before a single brick is laid.",
      },
      { type: "h2", id: "what-it-shows", text: "What a good render actually shows" },
      {
        type: "list",
        items: [
          "Proportion: whether the facade feels balanced and the rooms feel the size you expect.",
          "Materials: how stone, timber, metal and paint look together under daylight and at night.",
          "Light: where the sun falls, how deep the shade is and how the house glows after dark.",
          "Context: how the building sits against its plot, the street and the neighbouring houses.",
        ],
      },
      {
        type: "image",
        src: "/images/projects/visualization/karnal-modern-gallery-1.jpg",
        alt: "Modern Residence Concept, Karnal — evening render showing warm lighting and timber lattice",
        caption: "Modern Residence Concept, Karnal — the same design rendered at dusk to test the lighting.",
        projectId: "karnal-modern-concept",
      },
      { type: "h2", id: "decisions", text: "The decisions it makes easier" },
      {
        type: "p",
        text: "Most of the value of visualization is in the conversations it settles early. Whether the cladding should run the full height, whether the jaali feels too heavy, whether a balcony railing should be glass or metal: these are easy to decide on screen and expensive to change on site.",
      },
      {
        type: "quote",
        text: "It is far cheaper to change a material in a render than to replace it on a finished wall.",
      },
      { type: "h2", id: "day-and-night", text: "Ask for both day and evening views" },
      {
        type: "p",
        text: "A house is seen most often in two moments: arriving in daylight and returning home in the evening. Daylight views test materials and shade. Evening views test the lighting design, the glow of interiors through the glass and how facade lights read from the street. We usually prepare both for residential projects.",
      },
      { type: "h2", id: "walkthroughs", text: "When a walkthrough is worth it" },
      {
        type: "p",
        text: "Still renders are enough for most homes. Walkthroughs and flythroughs are most useful for larger projects such as group housing, commercial buildings and complexes, where the experience of moving through courtyards, podiums and entrances matters, or where the design has to be presented to many people at once.",
      },
      {
        type: "image",
        src: "/images/projects/visualization/group-housing-3.jpg",
        alt: "Group Housing Concept — aerial 3D view of residential towers and landscaped courtyards",
        caption: "Group Housing Concept — aerial views help explain how towers, courtyards and amenities connect.",
        projectId: "group-housing-concept",
      },
      { type: "h2", id: "accuracy", text: "Make sure the render matches what will be built" },
      {
        type: "p",
        text: "A render is only useful if it is honest. It should be built on the actual drawings, the actual material choices and realistic lighting, not on stock textures picked to make it look impressive. That way, what you approve is what your contractor builds.",
      },
      {
        type: "callout",
        title: "Want to see your design before it is built?",
        text: "Share your drawings or concept. We will tell you which views and walkthroughs would help your project most.",
      },
    ],
  },
  {
    slug: "planning-courtyards-terraces-and-forecourts",
    title: "Courtyards, Terraces and Forecourts: Outdoor Space That Works",
    seoTitle: "Courtyard, Terrace & Garden Design Ideas",
    excerpt:
      "How to plan courtyards, terraces and front gardens that stay usable through North Indian summers and monsoons, from planting to paving and lighting.",
    serviceSlug: "landscape",
    category: "Landscape",
    publishedAt: "2026-10-20",
    heroImage: "/images/projects/landscape/landscaping.jpg",
    heroAlt: "Landscape design by Morphic Spaces — planted outdoor space with paving and greenery",
    relatedProjectIds: ["residence-at-kaithal", "karnal-jali-concept", "group-housing-concept"],
    body: [
      {
        type: "p",
        text: "Outdoor space is often planned last, after the house is designed and the budget is stretched. That is a missed opportunity. A well-planned courtyard, terrace or forecourt extends the living area of a home and changes how the whole house feels.",
      },
      {
        type: "p",
        text: "In the North Indian climate, outdoor space has to work through intense heat, heavy rain and cold evenings. These are the principles behind our [landscape and outdoor design](/services/landscape) work.",
      },
      { type: "h2", id: "forecourt", text: "The forecourt sets the first impression" },
      {
        type: "p",
        text: "The space between the gate and the front door is the first thing every visitor experiences. A planted bed, a change in paving and a few well-placed lights make the arrival feel considered, even on a compact plot where most of the forecourt is needed for parking.",
      },
      {
        type: "image",
        src: "/images/projects/architecture/residence-kaithal.jpg",
        alt: "Residence at Kaithal — wide driveway with a landscaped bed of flowering shrubs",
        caption: "Residence at Kaithal — a landscaped bed softens a wide driveway and frames the entrance.",
        projectId: "residence-at-kaithal",
      },
      { type: "h2", id: "courtyard", text: "Courtyards bring light and air into the house" },
      {
        type: "p",
        text: "A courtyard, even a small one, brings daylight and cross-ventilation into the middle of a deep plan. With a tree or tall planting for shade, a water feature and a surface that does not store heat, it can stay several degrees cooler than the street outside.",
      },
      { type: "h2", id: "terraces", text: "Make terraces usable, not leftover" },
      {
        type: "list",
        items: [
          "Shade first: a pergola, canopy or projecting roof makes a terrace usable in summer afternoons.",
          "Planters along the edge give privacy from neighbours and soften the parapet line.",
          "Waterproofing and drainage must be designed before planting, especially above bedrooms.",
          "Light-coloured, heat-reflective paving keeps the terrace and the rooms below cooler.",
        ],
      },
      {
        type: "quote",
        text: "The best outdoor spaces feel like rooms without a ceiling, not like the space left over after the house.",
      },
      { type: "h2", id: "planting", text: "Choose planting for the climate" },
      {
        type: "p",
        text: "Plants that suit the region need less water and less maintenance, and they survive the summer. A mix of hardy shrubs, seasonal flowering plants and a few trees for shade gives a garden structure all year round. Group plants by their water needs so irrigation stays simple.",
      },
      { type: "h2", id: "hardscape", text: "Balance hardscape and softscape" },
      {
        type: "p",
        text: "Too much paving makes a space hot and hard. Too much lawn becomes difficult to maintain. Stone pathways, brick or textured paving and gravel beds combined with planting give a durable, low-maintenance layout that still feels green.",
      },
      { type: "h2", id: "lighting", text: "Light the garden for the evenings" },
      {
        type: "p",
        text: "In much of the year the garden is used most after sunset. Uplighting trees, low path lights and warm lighting on walls make outdoor spaces usable and safe at night without glare into neighbouring homes.",
      },
      {
        type: "callout",
        title: "Planning a garden, terrace or courtyard?",
        text: "Tell us about your plot and how you want to use the space. We will plan the landscape together with the architecture.",
      },
    ],
  },
  {
    slug: "when-to-hire-a-design-consultant",
    title: "When to Bring in a Design Consultant",
    seoTitle: "When to Hire a Design Consultant for Your Home",
    excerpt:
      "Already have a contractor or a plan? How a focused design review at the right stage can prevent costly mistakes, and what a consultation should cover.",
    serviceSlug: "design-consultancy",
    category: "Design Consultancy",
    publishedAt: "2026-10-20",
    heroImage: "/images/projects/design-consultancy/kaushik-clinic-kaithal.jpg",
    heroAlt: "Kaushik Homeo Clinic, Kaithal — healthcare and retail complex by Morphic Spaces",
    relatedProjectIds: ["kaushik-clinic-kaithal", "96-20-gurugram", "commercial-building-concept"],
    body: [
      {
        type: "p",
        text: "Not every project needs an architecture firm from the first sketch to the last fitting. Many people already have a plot, a plan from a draughtsman or a contractor ready to build. What they need is focused expertise at the right moment.",
      },
      {
        type: "p",
        text: "That is what [design consultancy](/services/design-consultancy) is for: a clear, experienced review of decisions that are expensive to undo, without handing over the entire project.",
      },
      { type: "h2", id: "signs", text: "Signs you would benefit from a consultation" },
      {
        type: "list",
        items: [
          "You have a plan, but something about the layout feels wrong and you cannot say what.",
          "The elevation looks like every other house on the street and you want it to have character.",
          "You are choosing between several materials, finishes or contractors' suggestions and need an independent view.",
          "A decision has stalled and the project cannot move forward until it is settled.",
          "You are renovating and want to know what can change before committing to the work.",
        ],
      },
      { type: "h2", id: "timing", text: "The stages where advice matters most" },
      { type: "h3", text: "Before the plan is frozen" },
      {
        type: "p",
        text: "Room sizes, circulation, staircase position and how the house opens to light are almost free to change on paper and very costly to change later. A review at this stage has the biggest impact.",
      },
      { type: "h3", text: "Before the facade is finalised" },
      {
        type: "p",
        text: "The elevation is what the street sees for decades. Proportions, materials and shading can turn a standard design into a distinctive one, often without adding much to the cost.",
      },
      { type: "h3", text: "Before materials are ordered" },
      {
        type: "p",
        text: "Stone, tiles, cladding and finishes are a large part of the budget. A material and finish consultation makes sure they work together and suit the climate before they arrive on site.",
      },
      {
        type: "image",
        src: "/images/projects/design-consultancy/kaushik-clinic-gallery-1.jpg",
        alt: "Kaushik Homeo Clinic, Kaithal — courtyard connecting the clinic, pharmacy and café",
        caption: "Kaushik Homeo Clinic, Kaithal — a shared courtyard ties a clinic, pharmacy and café into one complex.",
        projectId: "kaushik-clinic-kaithal",
      },
      {
        type: "quote",
        text: "The most valuable advice is usually given before anything is built, not after.",
      },
      { type: "h2", id: "what-to-expect", text: "What a good consultation includes" },
      {
        type: "list",
        items: [
          "A review of your existing drawings, site and brief.",
          "Clear, practical recommendations rather than a complete redesign.",
          "Sketches or references where a change is easier to see than to describe.",
          "A short list of priorities, so you know what matters most and what can wait.",
        ],
      },
      {
        type: "p",
        text: "Consultancy works for commercial projects as well as homes. Clinics, shops and mixed-use buildings benefit from a review of planning, frontage and how customers move through the space.",
      },
      {
        type: "callout",
        title: "Need a second opinion on your project?",
        text: "Share your drawings and the question you are stuck on. We will tell you how a consultation could help.",
      },
    ],
  },
  {
    slug: "renovating-an-older-home-in-the-tricity",
    title: "Renovating an Older Home: What to Plan First",
    seoTitle: "Renovating an Older Home in Chandigarh & Panchkula",
    excerpt:
      "Planning to renovate an older house in Chandigarh, Panchkula or Mohali? What to assess before you break a wall, from structure and services to layout and facade.",
    serviceSlug: "renovation",
    category: "Renovation",
    publishedAt: "2026-10-20",
    heroImage: "/images/projects/renovation/147p-panchkula.jpg",
    heroAlt: "147-P, Sector 26, Panchkula — residence by Morphic Spaces in charcoal stone and warm timber",
    relatedProjectIds: ["147p-panchkula", "147p-panchkula-interior", "interior-at-panchkula"],
    body: [
      {
        type: "p",
        text: "Many of the Tricity's houses were built twenty, thirty or forty years ago. Their locations are excellent and their plots are generous, but their layouts, services and facades no longer suit the way families live today.",
      },
      {
        type: "p",
        text: "Renovation can give an older house a second life. It also carries more unknowns than building new. The key is to understand what you have before deciding what to change. This is how we approach [renovation and transformation](/services/renovation) projects.",
      },
      { type: "h2", id: "assess", text: "Assess the structure first" },
      {
        type: "p",
        text: "Before any design, the existing structure needs a proper look. Which walls are load-bearing, the condition of slabs and beams, signs of dampness or cracks, and whether the building can take an extra floor all decide what is possible.",
      },
      {
        type: "callout",
        title: "Before you break a wall",
        text: "Never remove or cut a wall until it has been confirmed that it is not load-bearing. A structural engineer's assessment is the first step of a safe renovation.",
      },
      { type: "h2", id: "services", text: "Replace the services you cannot see" },
      {
        type: "p",
        text: "Old plumbing, wiring and drainage are the most common hidden problems in older homes. If walls and floors are being opened anyway, it is the right moment to replace them. Doing it later means breaking new finishes.",
      },
      {
        type: "list",
        items: [
          "Electrical wiring and the distribution board, sized for modern appliances and air-conditioning.",
          "Water supply and drainage lines, including concealed pipes in bathrooms and kitchens.",
          "Waterproofing for terraces, bathrooms and any wet areas above living rooms.",
        ],
      },
      { type: "h2", id: "layout", text: "Rethink the layout, not just the finishes" },
      {
        type: "p",
        text: "The biggest improvement in a renovation usually comes from the plan. Combining small rooms into an open living and dining space, moving the kitchen closer to the family area or adding a skylight over a dark stair can transform an older house more than any new flooring.",
      },
      {
        type: "image",
        src: "/images/projects/interior-design/interior-panchkula.jpg",
        alt: "A Panchkula interior — open living space built around a sculpted staircase",
        caption: "A Panchkula interior — an open plan organised around the staircase.",
        projectId: "interior-at-panchkula",
      },
      { type: "h2", id: "facade", text: "Upgrade the facade" },
      {
        type: "p",
        text: "A facade upgrade changes how the whole house is perceived. New cladding in stone or timber, deeper balconies, screens and a better entrance can make an older house look contemporary, and improve shading and privacy at the same time.",
      },
      {
        type: "quote",
        text: "A good renovation keeps what already works and changes only what is holding the house back.",
      },
      { type: "h2", id: "phasing", text: "Plan the phases and keep a contingency" },
      {
        type: "p",
        text: "Decide early whether the family will move out during the work or stay in part of the house, because this changes the sequence. Keep part of the budget aside for surprises, since opening up old walls and floors almost always reveals something unexpected.",
      },
      {
        type: "callout",
        title: "Thinking of renovating?",
        text: "Send us a few photographs and the existing plan if you have it. We will help you understand what the house can become.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Approximate reading time at ~200 words per minute. */
export function readingMinutes(post: BlogPost): number {
  const words = post.body
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "image") return block.caption;
      if (block.type === "callout") return `${block.title} ${block.text}`;
      return block.text;
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
