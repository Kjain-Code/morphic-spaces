import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
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

// Update this once a custom domain is connected — every absolute URL below
// (canonical, Open Graph, Twitter card, JSON-LD) is derived from it.
const SITE_URL = "https://morphic-spaces.vercel.app";
const SITE_DESCRIPTION =
  "Morphic Spaces is an architecture and interior design studio founded by Kunal, working across Chandigarh, Panchkula, Mohali and Gurugram — residential, commercial and bespoke interiors shaped by light, material and detail.";
const SHARE_IMAGE = "/images/hero/journey-poster.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Morphic Spaces — Architecture & Interior Design Studio",
  description: SITE_DESCRIPTION,
  keywords: [
    "architecture studio Chandigarh",
    "interior design Chandigarh",
    "architects Mohali",
    "architects Panchkula",
    "residential architecture India",
    "Morphic Spaces",
  ],
  authors: [{ name: "Morphic Spaces" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Morphic Spaces",
    title: "Morphic Spaces — Architecture & Interior Design Studio",
    description: SITE_DESCRIPTION,
    images: [{ url: SHARE_IMAGE, width: 1280, height: 720, alt: "A Morphic Spaces residence at dusk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morphic Spaces — Architecture & Interior Design Studio",
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

// Local-business structured data — read by search engines (rich results,
// knowledge-panel style facts), not rendered visually. Every fact here
// mirrors what the site itself states elsewhere (about/contact pages);
// nothing invented.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Morphic Spaces",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${SHARE_IMAGE}`,
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
  areaServed: ["Chandigarh", "Panchkula", "Mohali", "Gurugram"].map((name) => ({
    "@type": "City",
    name,
  })),
  knowsAbout: ["Architecture", "Interior Design", "Residential Design", "Commercial Design"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        {/* Every load (refresh included) starts at the top of the page —
            without this, the browser's own scroll restoration re-applies
            whatever scroll position was there before reload, which lands
            the pinned cinematic hero (GSAP ScrollTrigger + Lenis) in an
            arbitrary, uninitialized mid-journey state. Runs before
            hydration so there's no visible jump back to the top. */}
        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
          {`try {
            if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
            window.scrollTo(0, 0);
          } catch (e) {}`}
        </Script>
        {/* Server-rendered so crawlers see it in the initial HTML — not next/script, which defers execution past hydration. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
