import type { Metadata } from "next";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectFilmstrip } from "@/components/projects/project-filmstrip";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { FeaturedProject } from "@/components/projects/featured-project";
import { OurPerspective } from "@/components/projects/our-perspective";
import { ProjectsClosing } from "@/components/projects/projects-closing";
import { Footer } from "@/components/layout/footer";
import { PROJECTS } from "@/components/projects/project-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Architecture & Interior Design Projects",
  description: "Explore Morphic Spaces residential, commercial and interior projects shaped through architecture, materiality and detail.",
  path: "/projects",
  imageAlt: "Selected Morphic Spaces residential architecture project",
});

// Matches the client's reference structure (hero, drag-to-explore film
// strip, filterable grid, closing CTA), extended with the Featured Project
// and Our Perspective moments from the fuller spec — added on request even
// though the reference screenshot's visible fold didn't show them. The
// previous auto-drifting marquee (components/projects/project-orbit.tsx) is
// retired from this page in favor of the film strip + grid; the file is
// left in place, just unused, in case it's wanted elsewhere later.
export default function ProjectsPage() {
  return (
    <main className="bg-[var(--charcoal)]">
      <ProjectsHero />
      <ProjectFilmstrip projects={PROJECTS} />
      <ProjectsGallery projects={PROJECTS} />
      <FeaturedProject project={PROJECTS[0]} />
      <OurPerspective />
      <ProjectsClosing />
      <Footer />
    </main>
  );
}
