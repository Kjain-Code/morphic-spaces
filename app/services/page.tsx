import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesOverview } from "@/components/services/services-overview";
import { ServicesApproach } from "@/components/services/services-approach";
import { TailoredForYou } from "@/components/services/tailored-for-you";
import { MorphicApproach } from "@/components/services/morphic-approach";
import { ServiceProjectConnection } from "@/components/services/service-project-connection";
import { ServicesClosing } from "@/components/services/services-closing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Architecture, Interiors & Spatial Design Services",
  description:
    "Discover Morphic Spaces services in architecture, interior design, landscape and furniture & decor for residential and bespoke spaces across Chandigarh, Panchkula, Mohali and Gurugram.",
  path: "/services",
  imageAlt: "Morphic Spaces architectural facade and service studio imagery",
});

export default function ServicesPage() {
  return (
    <>
      <main>
        <ServicesHero />
        <ServicesOverview />
        <ServicesApproach />
        <TailoredForYou />
        <MorphicApproach />
        <ServiceProjectConnection />
        <ServicesClosing />
      </main>
      <Footer />
    </>
  );
}
