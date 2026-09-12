"use client";

import { ServiceDetailPages } from "@/components/services/service-detail-pages";
import type { Service } from "@/lib/services-data";

/** Route-preserving adapter for the four service-specific editorial page experiences. */
export function ServicePageTemplate({ service }: { service: Service }) {
  return <ServiceDetailPages service={service} />;
}