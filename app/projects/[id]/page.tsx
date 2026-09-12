import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { ProjectDetail } from "@/components/projects/project-detail";
import { PROJECTS } from "@/components/projects/project-data";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((candidate) => candidate.id === id);
  if (!project) return {};

  return createPageMetadata({
    title: `${project.title} | ${project.category} Project`,
    description: project.description,
    path: `/projects/${project.id}`,
    image: project.image,
    imageAlt: `${project.title} — ${project.category} project in ${project.location}`,
    type: "article",
  });
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
      <JsonLd
        id={`project-schema-${project.id}`}
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${SITE_URL}/projects/${project.id}#project`,
          name: project.title,
          description: project.description,
          image: absoluteUrl(project.image),
          url: absoluteUrl(`/projects/${project.id}`),
          creator: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
          genre: project.category,
          spatialCoverage: { "@type": "Place", name: project.location },
          dateCreated: project.year,
        }}
      />
      <JsonLd
        id={`project-breadcrumb-${project.id}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
            { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(`/projects/${project.id}`) },
          ],
        }}
      />
      <ProjectDetail project={project} previous={previous} next={next} />
      <Footer />
    </main>
  );
}
