import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Generates /robots.txt. Also missing entirely before this — between this
 * and the missing sitemap (see sitemap.ts), search engines had no reliable
 * way to discover the site's pages or find the sitemap on their own.
 *
 * /recognition is intentionally NOT disallowed here even though it's still
 * an empty placeholder route: disallowing crawl would stop Googlebot from
 * ever reaching the page's own `noindex` meta tag (see app/recognition/
 * page.tsx), which can paradoxically leave the bare URL indexed with no
 * snippet if it's ever discovered via an external link. Letting it crawl
 * and rely on `noindex` is the combination Google actually recommends.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
