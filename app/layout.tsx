import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
