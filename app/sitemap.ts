import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PROJECTS } from "@/components/projects/project-data";
import { SERVICES } from "@/lib/services-data";

/**
 * /sitemap.xml, generated from the same data files the site renders from,
 * so a new project or service is listed automatically on the next build.
 * Only canonical, indexable, 200-status URLs are listed; /recognition is
 * left out because it is a noindex placeholder.
 *
 * No <lastmod>: the only value available here was "now" at build time,
 * which would claim every URL changed on every deploy. Google ignores
 * lastmod that isn't consistently accurate, so omitting it is better than
 * a misleading one. (changefreq/priority are likewise ignored by Google and
 * have been dropped to keep the file honest and minimal.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/services",
    ...SERVICES.map((service) => `/services/${service.slug}`),
    "/projects",
    ...PROJECTS.map((project) => `/projects/${project.id}`),
    "/contact",
  ];

  // The homepage is listed exactly as its canonical tag renders it (no trailing slash).
  return paths.map((path) => ({ url: path === "/" ? SITE_URL : `${SITE_URL}${path}` }));
}
