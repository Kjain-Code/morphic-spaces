import type { Metadata } from "next";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectOrbit } from "@/components/projects/project-orbit";
import { ProjectsClosing } from "@/components/projects/projects-closing";
import { Footer } from "@/components/layout/footer";
import { PROJECTS } from "@/components/projects/project-data";

export const metadata: Metadata = {
  title: "Projects — Morphic Spaces",
  description: "A curated selection of spaces shaped through architecture, interior design, materiality and detail.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-[var(--charcoal)]">
      <ProjectsHero />
      <section className="bg-[var(--charcoal)] pb-32 sm:pb-40">
        <ProjectOrbit projects={PROJECTS} />
      </section>
      <ProjectsClosing />
      <Footer />
    </main>
  );
}
