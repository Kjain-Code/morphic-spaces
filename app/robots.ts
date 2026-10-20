import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * /robots.txt — everything public is crawlable, CSS/JS/images included.
 *
 * /recognition is intentionally NOT disallowed even though it's still an
 * empty placeholder: a crawl block would stop Googlebot from ever reading
 * that page's own `noindex` tag (see app/recognition/page.tsx). The
 * non-standard `Host:` line that used to be emitted here was dropped — only
 * Yandex ever read it, and the preferred domain is already signalled by
 * canonicals and the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
