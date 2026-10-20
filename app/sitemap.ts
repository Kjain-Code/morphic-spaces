import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PROJECTS } from "@/components/projects/project-data";
import { SERVICES } from "@/lib/services-data";
import { BLOG_POSTS } from "@/lib/blog-posts";

/**
 * /sitemap.xml, generated from the same data files the site renders from,
 * so a new project or service is listed automatically on the next build.
 * Only canonical, indexable, 200-status URLs are listed; /recognition is
 * left out because it is a noindex placeholder.
 *
 * No <lastmod> for pages/services/projects: the only value available was "now" at build time,
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
  const pages: MetadataRoute.Sitemap = paths.map((path) => ({ url: path === "/" ? SITE_URL : `${SITE_URL}${path}` }));

  // Journal: articles carry a real publish date, so <lastmod> is accurate here.
  const latestPost = BLOG_POSTS.map((post) => post.publishedAt).sort().at(-1);
  const blog: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, ...(latestPost ? { lastModified: latestPost } : {}) },
    ...BLOG_POSTS.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified: post.publishedAt })),
  ];

  return [...pages, ...blog];
}
