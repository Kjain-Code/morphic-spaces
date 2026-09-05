import type { Metadata } from "next";
import { RoutePlaceholder } from "@/components/ui/route-placeholder";

export const metadata: Metadata = {
  title: "Services — Morphic Spaces",
  description: "Architecture and interior design services from Morphic Spaces — residential, commercial and bespoke projects across Chandigarh, Panchkula, Mohali and Gurugram.",
};

export default function ServicesPage() {
  return <RoutePlaceholder title="Services" />;
}
