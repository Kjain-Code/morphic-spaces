import type { MetadataRoute } from "next";
import { PROJECTS } from "@/components/projects/project-data";

// Kept in sync with app/layout.tsx's SITE_URL — update both together once a
// custom domain is connected.
const SITE_URL = "https://morphic-spaces.vercel.app";

/**
 * Auto-served at /sitemap.xml by Next's App Router sitemap convention.
 * Lists every real route (home, the five section pages) plus every
 * individual project detail page, generated from the same PROJECTS data the
 * site itself renders from — a new project added there is picked up here
 * automatically, nothing to keep in sync by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recognition`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
