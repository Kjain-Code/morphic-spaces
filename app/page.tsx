import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Architecture & Interior Design Studio in Chandigarh",
  description:
    "Morphic Spaces shapes residential, commercial and bespoke spaces through architecture, interior design, materiality and detail across Chandigarh and the Tricity.",
  path: "/",
  imageAlt: "Morphic Spaces architectural residence at dusk",
});

export default function Home() {
  return <HomePage />;
}
