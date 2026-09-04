/**
 * Centralized project data for /projects. Every image below is a local
 * temporary visual (public/images/loading/*) standing in for real client
 * photography — swap the `image` paths (and copy) here once that arrives;
 * nothing in the components needs to change. Copy is deliberately generic
 * editorial placeholder, not factual claims (no invented locations, years,
 * clients, awards, or square footage).
 */
export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    number: "01",
    category: "Contemporary Residence",
    title: "The Quiet Residence",
    description:
      "A contemporary home shaped around natural light, refined materiality and a calm relationship between interior and landscape.",
    image: "/images/loading/1st.png",
  },
  {
    id: "02",
    number: "02",
    category: "Interior",
    title: "Material in Balance",
    description:
      "A considered interior where proportion, texture and light create a warm but restrained sense of place.",
    image: "/images/loading/8th.png",
  },
  {
    id: "03",
    number: "03",
    category: "Residential",
    title: "Living in Between",
    description:
      "A residential environment designed around connected spaces, natural movement and carefully resolved details.",
    image: "/images/loading/3rd.png",
  },
  {
    id: "04",
    number: "04",
    category: "Interior",
    title: "Light / Form / Detail",
    description:
      "A refined composition where material surfaces and natural illumination define the character of everyday spaces.",
    image: "/images/loading/7th.png",
  },
  {
    id: "05",
    number: "05",
    category: "Architecture",
    title: "An Open Horizon",
    description: "Architecture conceived as a continuous relationship between enclosed space, landscape and sky.",
    image: "/images/loading/9th.png",
  },
  {
    id: "06",
    number: "06",
    category: "Private Residence",
    title: "A Quiet Expression",
    description:
      "A restrained residential language built through proportion, texture, light and material continuity.",
    image: "/images/loading/6th.png",
  },
];

export const PROJECT_COUNT = PROJECTS.length;
