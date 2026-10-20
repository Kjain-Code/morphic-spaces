import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesOverview } from "@/components/services/services-overview";
import { ServicesApproach } from "@/components/services/services-approach";
import { WhatWeCreate } from "@/components/services/what-we-create";
import { TailoredForYou } from "@/components/services/tailored-for-you";
import { MorphicApproach } from "@/components/services/morphic-approach";
import { ServiceProjectConnection } from "@/components/services/service-project-connection";
import { ServicesClosing } from "@/components/services/services-closing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Architecture, Interior Design & 3D Visualization Services",
  description:
    "Architecture, interior design, 3D visualization, landscape, consultancy and renovation for homes and commercial spaces in Chandigarh, Panchkula, Mohali and Karnal.",
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
        <WhatWeCreate />
        <TailoredForYou />
        <MorphicApproach />
        <ServiceProjectConnection />
        <ServicesClosing />
      </main>
      <Footer />
    </>
  );
}
