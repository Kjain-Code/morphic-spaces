import type { MetadataRoute } from "next";

const SITE_URL = "https://morphic-spaces.vercel.app";

/** Auto-served at /robots.txt — allows every crawler everywhere and points them at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
