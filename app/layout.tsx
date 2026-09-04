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

export const metadata: Metadata = {
  title: "Morphic Spaces",
  description:
    "A premium spatial design studio focused on contemporary residential, commercial and hospitality spaces.",
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
        <Navbar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
