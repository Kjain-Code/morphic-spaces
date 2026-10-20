import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/ui/route-placeholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Recognition & Features",
    description: "Recognition and features for Morphic Spaces, an architecture and interior design studio based in Chandigarh.",
    path: "/recognition",
    imageAlt: "Morphic Spaces architecture and interior design studio",
  }),
  // Placeholder page with no real content yet. robots.ts deliberately does
  // NOT block crawling it (a crawl block would hide this noindex), and it is
  // excluded from sitemap.xml. Links are still followed so equity from any
  // stray inbound link flows to the rest of the site. Switch back to
  // createPageMetadata's default (index) once real recognition content exists.
  robots: { index: false, follow: true },
};

export default function RecognitionPage() {
  return <RoutePlaceholder title="Recognition" />;
}
