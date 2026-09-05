"use client";

import Link from "next/link";
import { useState } from "react";
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
 * The one global fixed navbar. Deliberately stateless with respect to
 * scroll/route — same position, height and typography everywhere, always.
 * No solid background: a fixed, non-toggling vignette (constant regardless
 * of scroll position or what's beneath it) is the only thing standing
 * between the nav content and full transparency, kept just dark enough for
 * the white nav text to read over both the video and lighter sections
 * further down the page.
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/45 via-black/10 to-transparent"
      />
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:h-22 sm:px-10">
        <Link href="/" aria-label="Morphic Spaces — Home" className="relative z-10">
          <LogoMark className="h-8 w-auto sm:h-9" />
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
