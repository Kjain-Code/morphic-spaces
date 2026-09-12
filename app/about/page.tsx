import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutPhilosophy } from "@/components/about/about-philosophy";
import { StudioInfo } from "@/components/about/studio-info";
import { OurApproach } from "@/components/about/our-approach";
import { WhyChooseUs } from "@/components/about/why-choose-us";
import { ArchitecturalAssembly } from "@/components/about/architectural-assembly";
import { FounderStory } from "@/components/about/founder-story";
import { AboutClosing } from "@/components/about/about-closing";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About — Morphic Spaces",
  description:
    "Morphic Spaces is an architecture and interior design studio founded by Kunal, creating distinctive, thoughtful and enduring spaces across residential, commercial and bespoke environments.",
};

// Section order follows the client's reference layout: hero, philosophy (with
// its four pillars merged in), journey stats, the new Our Approach and Why
// Choose Us sections, then the deeper process/story chapters (massing study,
// founder story) before the closing CTA.
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutPhilosophy />
      <StudioInfo />
      <OurApproach />
      <WhyChooseUs />
      <ArchitecturalAssembly />
      <FounderStory />
      <AboutClosing />
      <Footer />
    </main>
  );
}
