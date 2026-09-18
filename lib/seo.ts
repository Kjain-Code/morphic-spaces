import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.morphicspaces.com";
export const SITE_NAME = "Morphic Spaces";
export const SITE_DESCRIPTION =
  "Morphic Spaces is an architecture and interior design studio founded by Kunal, creating thoughtful residential, commercial and bespoke spaces across Chandigarh, Panchkula, Mohali, Karnal and Gurugram.";
export const SHARE_IMAGE = "/images/hero/journey-poster.jpg";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = SHARE_IMAGE,
  imageAlt = "Morphic Spaces architecture and interior design studio",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      images: [{ url: absoluteUrl(image), alt: imageAlt }],
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
