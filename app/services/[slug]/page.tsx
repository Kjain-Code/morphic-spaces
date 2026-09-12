import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { JsonLd } from "@/components/seo/json-ld";
import { SERVICES, getService } from "@/lib/services-data";
import { absoluteUrl, createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return createPageMetadata({
    title: `${service.title} Services in Chandigarh & Tricity`,
    description: service.description,
    path: `/services/${service.slug}`,
    image: service.heroImage,
    imageAlt: `${service.title} service by Morphic Spaces`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

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
            description: service.description,
            url: absoluteUrl(`/services/${service.slug}`),
            image: absoluteUrl(service.heroImage),
            provider: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
            areaServed: ["Chandigarh", "Panchkula", "Mohali", "Gurugram"].map((name) => ({
              "@type": "City",
              name,
            })),
            serviceType: service.title,
          }}
        />
        <JsonLd
          id={`service-breadcrumb-${service.slug}`}
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
              { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(`/services/${service.slug}`) },
            ],
          }}
        />
        <ServicePageTemplate service={service} />
      </main>
      <Footer />
    </>
  );
}
