import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { ProjectDetail } from "@/components/projects/project-detail";
import { PROJECTS } from "@/components/projects/project-data";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((candidate) => candidate.id === id);
  if (!project) return {};

  return {
    title: `${project.title} — Morphic Spaces`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const index = PROJECTS.findIndex((candidate) => candidate.id === id);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <main>
      <ProjectDetail project={project} previous={previous} next={next} />
      <Footer />
    </main>
  );
}
