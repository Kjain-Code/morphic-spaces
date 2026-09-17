import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PROJECTS } from "@/components/projects/project-data";
import { SERVICES } from "@/lib/services-data";

/**
 * Generates /sitemap.xml at build/request time (Next.js App Router
 * convention — no separate library needed). This was entirely missing
 * before, which is why Google Search Console couldn't fetch a sitemap no
 * matter what URL was submitted: there was nothing being served at
 * /sitemap.xml. Every real, indexable route is listed here — the four
 * static pages, every service detail page and every project detail page —
 * generated straight from the same data files the site itself renders from,
 * so a new project or service is picked up automatically. /recognition is
 * deliberately left out: it's still an empty placeholder page, and listing
 * a page with no real content in a sitemap does the site's SEO more harm
 * than good.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
