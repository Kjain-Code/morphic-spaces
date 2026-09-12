import { Fraunces } from "next/font/google";

/**
 * Editorial display serif used for large, high-impact headlines — softer,
 * more sculpted letterforms than the site-wide Cormorant Garamond (see
 * app/layout.tsx / globals.css --font-serif), reads as more "designed" at
 * very large sizes. Shared here (rather than redefined per component) so
 * the Home hero and the About page's headlines pick up the exact same font
 * instance. Deliberately NOT wired into the global --font-serif variable —
 * every other page keeps Cormorant Garamond exactly as it is; components
 * opt in explicitly via `fraunces.className`.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
