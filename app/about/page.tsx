import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { StudioPillars } from "@/components/about/studio-pillars";
import { ArchitecturalAssembly } from "@/components/about/architectural-assembly";
import { AboutPhilosophy } from "@/components/about/about-philosophy";
import { FounderStory } from "@/components/about/founder-story";
import { StudioInfo } from "@/components/about/studio-info";
import { AboutClosing } from "@/components/about/about-closing";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "About — Morphic Spaces",
  description:
    "Morphic Spaces is an architecture and interior design studio founded by Kunal, creating distinctive, thoughtful and enduring spaces across residential, commercial and bespoke environments.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <StudioPillars />
      <ArchitecturalAssembly />
      <AboutPhilosophy />
      <FounderStory />
      <StudioInfo />
      <AboutClosing />
      <Footer />
    </main>
  );
}
