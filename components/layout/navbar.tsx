"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoMark } from "@/components/ui/logo-mark";
import { SERVICES } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

/**
 * Desktop-only mega-dropdown for "Services" — opens on hover/focus, lists
 * all real services from lib/services-data.ts (never duplicated here, so it
 * always stays in sync with however many services SERVICES currently has)
 * with a small preview image that swaps to match whichever service is
 * hovered, plus a short "What We Do" blurb and a link to the full page.
 * Motion-only (opacity + height/clip + y), matching the brief's split of
 * Motion for nav/menu interactions vs. page-level scroll animation.
 */
function ServicesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const active = SERVICES.find((service) => service.slug === activeSlug) ?? SERVICES[0];
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.div initial="rest" animate={isOpen ? "hover" : "rest"} className="relative flex items-center gap-1.5">
        {/*
          The label itself is a real link to /services — clicking "Services"
          navigates like every other nav item. The chevron is a separate hit
          target that only toggles the preview dropdown, so tapping/clicking
          to preview the sub-services no longer blocks getting to the
          Services page itself.
        */}
        <Link
          href="/services"
          className="inline-block text-[11px] uppercase tracking-[0.25em] text-white/90 transition-colors duration-300 hover:text-white"
        >
          Services
        </Link>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close services preview" : "Preview services"}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-4 w-4 items-center justify-center text-white/70 transition-colors duration-300 hover:text-white"
        >
          <motion.svg
            viewBox="0 0 12 8"
            fill="none"
            className="h-2.5 w-2.5"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>
        <motion.span
          aria-hidden="true"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ transformOrigin: "left" }}
          className="absolute -bottom-1 left-0 h-px w-full bg-[var(--stone)]"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute left-1/2 top-full z-40 mt-4 w-[36rem] -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--ivory-10)] bg-[var(--graphite)] shadow-2xl shadow-black/40"
          >
            <div className="grid grid-cols-12">
              <div className="col-span-7 p-6">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">What We Do</span>
                <ul className="mt-4 flex flex-col">
                  {SERVICES.map((service, index) => (
                    <motion.li
                      key={service.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: 0.05 + index * 0.05 }}
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        onMouseEnter={() => setActiveSlug(service.slug)}
                        onFocus={() => setActiveSlug(service.slug)}
                        className="group flex items-baseline gap-4 border-t border-[var(--ivory-10)] py-3 first:border-t-0"
                      >
                        <span className="text-xs text-[var(--gold)]">{service.number}</span>
                        <span className="text-sm text-[var(--ivory-70)] transition-colors group-hover:text-[var(--ivory-90)]">
                          {service.title}
                        </span>
                        <span className="ml-auto text-[var(--gold)] opacity-0 transition-opacity group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="relative col-span-5 min-h-[10rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.overviewImage}
                      alt={active.title}
                      fill
                      sizes="18rem"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.15em] text-[var(--ivory-90)]">
                      {active.title}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <Link
              href="/services"
              className="flex items-center justify-between border-t border-[var(--ivory-10)] px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-[var(--ivory-55)] transition-colors hover:text-[var(--gold)]"
            >
              View All Services
              <span>→</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile accordion variant of the services list — tap the row to expand its one-line description; tap the title to navigate. */
function MobileServicesAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div className="border-b border-white/10 py-2">
      <button
        type="button"
        onClick={() => setOpenSlug((slug) => (slug ? null : SERVICES[0].slug))}
        className="flex w-full items-center justify-between py-2 text-sm uppercase tracking-[0.2em] text-white/80"
      >
        Services
        <motion.span animate={{ rotate: openSlug ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-lg">
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {openSlug && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pb-3 pl-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={onNavigate}
                  className="flex items-baseline gap-3 py-2 text-xs uppercase tracking-[0.15em] text-white/60"
                >
                  <span className="text-[var(--gold)]">{service.number}</span>
                  {service.title}
                </Link>
              ))}
              <Link
                href="/services"
                onClick={onNavigate}
                className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--gold)]"
              >
                View All Services →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header ref={menuRef} className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 via-black/25 to-transparent [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
      />
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:h-22 sm:px-10">
        <Link href="/" aria-label="Morphic Spaces — Home" className="relative z-10">
          <LogoMark className="h-11 w-auto sm:h-14" />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-10">
          <motion.div key="/" initial="rest" whileHover="hover" animate="rest" className="relative">
            <Link
              href="/"
              className="inline-block text-[11px] uppercase tracking-[0.25em] text-white/90 transition-colors duration-300 hover:text-white"
            >
              Home
            </Link>
            <motion.span
              aria-hidden="true"
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="absolute -bottom-1 left-0 h-px w-full bg-[var(--stone)]"
            />
          </motion.div>

          <ServicesMegaMenu />

          <motion.div key="/projects" initial="rest" whileHover="hover" animate="rest" className="relative">
            <Link
              href="/projects"
              className="inline-block text-[11px] uppercase tracking-[0.25em] text-white/90 transition-colors duration-300 hover:text-white"
            >
              Projects
            </Link>
            <motion.span
              aria-hidden="true"
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="absolute -bottom-1 left-0 h-px w-full bg-[var(--stone)]"
            />
          </motion.div>

          {NAV_LINKS.filter((link) => link.href !== "/" && link.href !== "/projects").map((link) => (
            <motion.div key={link.href} initial="rest" whileHover="hover" animate="rest" className="relative">
              <Link
                href={link.href}
                className="inline-block text-[11px] uppercase tracking-[0.25em] text-white/90 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
              <motion.span
                aria-hidden="true"
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.35, ease: EASE }}
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
            transition={{ duration: 0.35, ease: EASE }}
            aria-label="Mobile"
            className="overflow-hidden bg-[var(--stage)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-8 pt-2 sm:px-10">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-white/10 py-4 text-sm uppercase tracking-[0.2em] text-white/80"
              >
                Home
              </Link>
              <MobileServicesAccordion onNavigate={() => setIsMenuOpen(false)} />
              <Link
                href="/projects"
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-white/10 py-4 text-sm uppercase tracking-[0.2em] text-white/80"
              >
                Projects
              </Link>
              {NAV_LINKS.filter((link) => link.href !== "/" && link.href !== "/projects").map((link) => (
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
