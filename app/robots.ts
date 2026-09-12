import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Auto-served at /robots.txt — allows every crawler everywhere and points them at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
