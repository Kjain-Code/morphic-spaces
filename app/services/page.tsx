import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesOverview } from "@/components/services/services-overview";
import { ServicesApproach } from "@/components/services/services-approach";
import { TailoredForYou } from "@/components/services/tailored-for-you";
import { MorphicApproach } from "@/components/services/morphic-approach";
import { ServiceProjectConnection } from "@/components/services/service-project-connection";
import { ServicesClosing } from "@/components/services/services-closing";

export const metadata: Metadata = {
  title: "Services — Morphic Spaces",
  description:
    "Architecture, interior design, landscape and furniture & decor services from Morphic Spaces — residential and bespoke projects across Chandigarh, Panchkula, Mohali and Gurugram.",
};

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
