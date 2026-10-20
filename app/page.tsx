import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  // Absolute: the homepage leads with the brand, so the "| Morphic Spaces"
  // template would only repeat it.
  title: "Morphic Spaces | Architecture & Interior Design Studio, Chandigarh Tricity",
  absoluteTitle: true,
  description:
    "Architecture and interior design studio shaping residential, commercial and bespoke spaces across Chandigarh, Panchkula, Mohali, Karnal and Gurugram.",
  path: "/",
  imageAlt: "Morphic Spaces architectural residence at dusk",
});

export default function Home() {
  return <HomePage />;
}
