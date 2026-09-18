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
  // Placeholder page with no real content yet — robots.ts already disallows
  // crawling it, but that alone doesn't guarantee it stays out of search
  // results if linked externally, so this explicitly overrides the
  // index:true that createPageMetadata sets by default.
  robots: { index: false, follow: false },
};

export default function RecognitionPage() {
  return <RoutePlaceholder title="Recognition" />;
}
