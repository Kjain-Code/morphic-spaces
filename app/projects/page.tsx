import type { Metadata } from "next";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectExperience } from "@/components/projects/project-experience";
import { ProjectsClosing } from "@/components/projects/projects-closing";
import { Footer } from "@/components/layout/footer";
import { PROJECTS } from "@/components/projects/project-data";

export const metadata: Metadata = {
  title: "Projects — Morphic Spaces",
  description: "A curated selection of spaces shaped through architecture, interior design, materiality and detail.",
};

// Three groups of two — see components/projects/project-data.ts for the
// underlying data and components/projects/project-experience.tsx for how
// each group's sticky crossfade (desktop) / stacked flow (mobile) works.
const GROUPS: ReadonlyArray<readonly [(typeof PROJECTS)[number], (typeof PROJECTS)[number]]> = [
  [PROJECTS[0], PROJECTS[1]],
  [PROJECTS[2], PROJECTS[3]],
  [PROJECTS[4], PROJECTS[5]],
];

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      {GROUPS.map((group, index) => (
        <ProjectExperience key={group[0].id} projects={group} priorityFirstImage={index === 0} />
      ))}
      <ProjectsClosing />
      <Footer />
    </main>
  );
}
