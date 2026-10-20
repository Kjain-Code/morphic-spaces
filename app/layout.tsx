import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absoluteUrl,
  ORGANIZATION_ID,
  SERVICE_AREAS,
  SHARE_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "@/lib/seo";
import "./globals.css";

// Editorial display serif for large headings; body/UI sans below. Loaded as
// CSS variables and wired into Tailwind's font-serif/font-sans utilities via
// the @theme block in globals.css, so every existing font-serif/font-sans
// class site-wide picks these up automatically.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s | Morphic Spaces" },
  description: SITE_DESCRIPTION,
  keywords: [
    "architecture studio Chandigarh",
    "interior design Chandigarh",
    "architects Mohali",
    "architects Panchkula",
    "architects Karnal",
    "interior designer Karnal",
    "residential architecture India",
    "Morphic Spaces",
  ],
  authors: [{ name: "Morphic Spaces" }],
  // No canonical/robots here on purpose: every page sets its own canonical
  // via createPageMetadata (lib/seo.ts). A canonical on the root layout was
  // inherited by any route that didn't override it — including the 404
  // page, which ended up canonicalised to the homepage with conflicting
  // "noindex" + "index, follow" robots tags.
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Morphic Spaces",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: SHARE_IMAGE, width: 1280, height: 720, alt: "A Morphic Spaces residence at dusk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

// Site-wide structured data — the one place the studio entity is declared.
// Page-level schema (services, projects, breadcrumbs) points back to it by
// @id instead of repeating the details. Every fact mirrors what the site
// itself shows (footer, contact page, about page); nothing invented. The
// address is reproduced exactly as published on the site — no postcode,
// locality or map coordinates have been added because none are published.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon.png"),
      image: absoluteUrl(SHARE_IMAGE),
      founder: { "@type": "Person", name: "Kunal" },
      telephone: "+91 90535 11417",
      email: "morphicspaces@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop No. 18, Dhakoli",
        addressRegion: "Punjab",
        addressCountry: "IN",
      },
      sameAs: ["https://www.instagram.com/morphic_spaces"],
      areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
      knowsAbout: [
        "Architecture",
        "Interior Design",
        "3D Architectural Visualization",
        "Landscape Design",
        "Renovation",
        "Residential Design",
        "Commercial Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: absoluteUrl("/"),
      name: SITE_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        {/* Every load (refresh included) starts at the top of the page —
            without this, the browser's own scroll restoration re-applies
            whatever scroll position was there before reload, which lands
            the pinned cinematic hero (GSAP ScrollTrigger + Lenis) in an
            arbitrary, uninitialized mid-journey state. Runs before
            hydration so there's no visible jump back to the top. */}
        <Script
          id="disable-scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try {
            if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
            window.scrollTo(0, 0);
          } catch (e) {}`,
          }}
        />
        <JsonLd id="structured-data" data={siteJsonLd} />
        <Navbar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
