import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { JsonLd } from "@/components/seo/json-ld";
import { SERVICES, getService } from "@/lib/services-data";
import { getServiceFolderImages } from "@/lib/service-images";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, ORGANIZATION_ID, SERVICE_AREAS, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

// Only the six known service slugs exist; anything else is a real 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return createPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    image: service.heroImage,
    imageAlt: `${service.title} by Morphic Spaces`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  // Every image in public/images/projects/<slug>/ belongs to this service.
  const images = getServiceFolderImages(service.slug);
  const url = absoluteUrl(`/services/${service.slug}`);

  return (
    <>
      <main>
        <JsonLd
          id={`service-schema-${service.slug}`}
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${SITE_URL}/services/${service.slug}#service`,
            name: service.title,
            serviceType: service.title,
            description: service.description,
            url,
            image: absoluteUrl(service.heroImage),
            provider: { "@id": ORGANIZATION_ID },
            areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
            // Mirrors the visible "Our services include" list on the page.
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${service.title} services`,
              itemListElement: service.subServices.map((name) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name },
              })),
            },
          }}
        />
        <JsonLd
          id={`service-breadcrumb-${service.slug}`}
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ])}
        />
        <ServicePageTemplate service={service} images={images} />
      </main>
      <Footer />
    </>
  );
}
