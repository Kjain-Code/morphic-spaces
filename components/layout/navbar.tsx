"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoMark } from "@/components/ui/logo-mark";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Recognition", href: "/recognition" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

/**
 * Fixed, transparent-over-hero navbar that picks up a solid dark backdrop
 * once the page scrolls (or on any route that doesn't have a dark hero to
 * sit over). Logo sizing lives in one className below, so it's a one-line
 * change to adjust later.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 40;
      setIsScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Secondary routes have no dark hero underneath to overlay, so the bar
  // stays solid there regardless of scroll position.
  const isSolid = isScrolled || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ${
        isSolid ? "border-white/10 bg-[var(--stage-translucent)] backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" aria-label="Morphic Spaces — Home" className="relative z-10">
          <LogoMark className="h-auto w-9" />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-10">
          {NAV_LINKS.map((link) => (
            <motion.div key={link.href} initial="rest" whileHover="hover" animate="rest" className="relative">
              <Link
                href={link.href}
                className="inline-block text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
              <motion.span
                aria-hidden="true"
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
                className="absolute -bottom-1 left-0 h-px w-full bg-[var(--stone)]"
              />
            </motion.div>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="relative z-10 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }} className="h-px w-6 bg-white" />
          <motion.span animate={{ opacity: isMenuOpen ? 0 : 1 }} className="h-px w-6 bg-white" />
          <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }} className="h-px w-6 bg-white" />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile"
            className="overflow-hidden bg-[var(--stage)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-8 pt-2 sm:px-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-sm uppercase tracking-[0.2em] text-white/80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
