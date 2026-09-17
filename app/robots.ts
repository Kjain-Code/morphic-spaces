import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Generates /robots.txt. Also missing entirely before this — between this
 * and the missing sitemap (see sitemap.ts), search engines had no reliable
 * way to discover the site's pages or find the sitemap on their own.
 * /recognition is disallowed since it's still an empty placeholder route,
 * not real content worth crawling or indexing yet.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/recognition"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
