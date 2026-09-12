import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/ui/route-placeholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Recognition & Features",
  description: "Recognition and features for Morphic Spaces, an architecture and interior design studio based in Chandigarh.",
  path: "/recognition",
  imageAlt: "Morphic Spaces architecture and interior design studio",
});

export default function RecognitionPage() {
  return <RoutePlaceholder title="Recognition" />;
}
