import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { ProjectDetail } from "@/components/projects/project-detail";
import { PROJECTS, type Project } from "@/components/projects/project-data";
import { JsonLd } from "@/components/seo/json-ld";
import { getServiceForImage } from "@/lib/services-data";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, ORGANIZATION_ID, SITE_URL, toMetaDescription } from "@/lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

// Only real project ids exist; anything else is a real 404.
export const dynamicParams = false;

const CATEGORY_LABEL: Record<Project["category"], string> = {
  Residential: "Residential Architecture",
  Interiors: "Interior Design",
  Commercial: "Commercial Architecture",
};

/**
 * "<Project> — <discipline>[ in <place>]". The place is only appended when
 * it isn't already in the project's own name and is an actual town (several
 * concept projects are listed with the generic location "India").
 */
function projectSeoTitle(project: Project) {
  const label = CATEGORY_LABEL[project.category];
  const hasPlace = project.location !== "India" && !project.title.includes(project.location);
  const separator = project.title.includes("—") ? " | " : " — ";
  return `${project.title}${separator}${label}${hasPlace ? ` in ${project.location}` : ""}`;
}

export async function generateMetadata({ params }: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((candidate) => candidate.id === id);
  if (!project) return {};

  return createPageMetadata({
    title: projectSeoTitle(project),
    description: toMetaDescription(project.description),
    path: `/projects/${project.id}`,
    image: project.image,
    imageAlt: `${project.title} — ${CATEGORY_LABEL[project.category].toLowerCase()} by Morphic Spaces`,
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
  const service = getServiceForImage(project.image);

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
          image: [project.image, ...(project.gallery ?? [])].map((src) => absoluteUrl(src)),
          url: absoluteUrl(`/projects/${project.id}`),
          creator: { "@id": ORGANIZATION_ID },
          genre: CATEGORY_LABEL[project.category],
          ...(project.location !== "India" ? { spatialCoverage: { "@type": "Place", name: project.location } } : {}),
          dateCreated: project.year,
          ...(service ? { about: { "@id": `${SITE_URL}/services/${service.slug}#service` } } : {}),
        }}
      />
      <JsonLd
        id={`project-breadcrumb-${project.id}`}
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.id}` },
        ])}
      />
      <ProjectDetail
        project={project}
        previous={previous}
        next={next}
        service={service ? { slug: service.slug, title: service.title } : undefined}
      />
      <Footer />
    </main>
  );
}
