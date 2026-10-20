import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.morphicspaces.com";
export const SITE_NAME = "Morphic Spaces";
export const SITE_DESCRIPTION =
  "Morphic Spaces is an architecture and interior design studio founded by Kunal, creating thoughtful residential, commercial and bespoke spaces across Chandigarh, Panchkula, Mohali, Karnal and Gurugram.";
export const SHARE_IMAGE = "/images/hero/journey-poster.jpg";
/** Real pixel size of SHARE_IMAGE — only declared for the image whose size is known. */
const SHARE_IMAGE_SIZE = { width: 1280, height: 720 };

/** Stable @id of the studio entity declared once in app/layout.tsx; every other schema references it. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Service areas exactly as the site itself lists them (contact page and
 * about page, "LOCATIONS"). Kept in one place so schema and copy can't drift.
 */
export const SERVICE_AREAS = ["Chandigarh", "Panchkula", "Mohali", "Karnal", "Gurugram"] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

/** Trims a long description to a search-snippet-friendly length at a word boundary. */
export function toMetaDescription(text: string, max = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const firstSentence = clean.match(/^.+?[.!?](\s|$)/)?.[0].trim();
  if (firstSentence && firstSentence.length >= 80 && firstSentence.length <= max) return firstSentence;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "")}…`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = SHARE_IMAGE,
  imageAlt = "Morphic Spaces architecture and interior design studio",
  type = "website",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  /** Use the title as-is instead of appending "| Morphic Spaces" (for titles that already lead with the brand). */
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const imageMeta = {
    url: absoluteUrl(image),
    alt: imageAlt,
    ...(image === SHARE_IMAGE ? SHARE_IMAGE_SIZE : {}),
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      images: [imageMeta],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
    robots: { index: true, follow: true },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
