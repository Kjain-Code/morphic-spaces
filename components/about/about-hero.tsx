"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fraunces } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_LINES = ["We are not here to", "follow a language.", "We are here to create one."];

/**
 * Masks and slides one headline line up into view. Animates on mount
 * (`animate`, not `whileInView`) — this is the very first thing on the
 * page, already inside the viewport at load, so a scroll-triggered
 * IntersectionObserver reveal here is both unnecessary and unreliable (it
 * depends on the observer's first callback landing after Lenis has
 * finished its initial layout pass; when it doesn't, the line just sits at
 * its hidden offset forever, which is what was happening here). Below-the-
 * fold reveals (AboutPhilosophy's RevealUp, etc.) keep whileInView, where
 * it's actually needed and the timing risk doesn't apply.
 */
function HeadlineLine({ children, delay }: { children: ReactNode; delay: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: EASE, delay: prefersReducedMotion ? 0 : delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * The About page's opening statement — reworked from a centered charcoal
 * slab into a two-column split (the studio's own mantra as a line-by-line
 * headline reveal on the left, a real project photograph unfolding open on
 * the right), matching the client's reference layout. The 3D massing
 * cluster previously used as a full-bleed backdrop here has been retired
 * from this section — it now belongs to ArchitecturalAssembly further down
 * the page, where it's the section's whole point rather than a backdrop
 * competing with a photo.
 *
 * Every reveal below animates on mount rather than on scroll-into-view —
 * see HeadlineLine's comment for why that matters specifically for content
 * that's already in the first viewport.
 */
export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[var(--charcoal)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12">
        {/* Text column */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-24 sm:px-10 sm:py-28 lg:col-span-6 lg:py-32">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]"
          >
            About Us
            <span aria-hidden="true" className="h-px w-10 bg-[var(--gold-40)]" />
          </motion.p>

          <h1
            className={`${fraunces.className} mt-6 max-w-xl text-4xl font-light leading-[1.15] tracking-tight text-[var(--ivory-90)] sm:text-5xl lg:text-6xl`}
          >
            <HeadlineLine delay={0.1}>{HEADLINE_LINES[0]}</HeadlineLine>
            <HeadlineLine delay={0.2}>{HEADLINE_LINES[1]}</HeadlineLine>
            <HeadlineLine delay={0.3}>
              <span className="italic text-[var(--gold)]">{HEADLINE_LINES[2]}</span>
            </HeadlineLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-8 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base"
          >
            Morphic Spaces is born from a simple belief — space is not merely something we occupy, it is something
            we experience.
          </motion.p>

          <motion.a
            href="#our-story"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.6 }}
            className="group mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold-40)] text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
            Our Story
          </motion.a>
        </div>

        {/* Photo column */}
        <div className="relative min-h-[50vh] overflow-hidden lg:col-span-6 lg:min-h-0">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.3, ease: EASE, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.6, ease: EASE, delay: prefersReducedMotion ? 0 : 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src="/images/loading/8th.png"
                alt="A Morphic Spaces interior — warm timber ceiling and staircase detail"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "78% 35%" }}
                priority
              />
            </motion.div>
            {/* Charcoal wash so the photo reads as part of this page's palette rather than a bright drop-in, and blends into the text column on desktop. */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, var(--charcoal) 0%, transparent 22%), linear-gradient(0deg, rgba(23,22,20,0.55) 0%, transparent 45%)",
              }}
            />
          </motion.div>

          {/* Decorative gold ring, echoing the same device on /contact and elsewhere on this page. */}
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: EASE, delay: prefersReducedMotion ? 0 : 0.4 }}
            className="pointer-events-none absolute -left-16 -top-16 hidden h-64 w-64 rounded-full border border-[var(--gold-30)] sm:block"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[11px] uppercase tracking-[0.35em] text-[var(--ivory-55)] sm:block"
            style={{ transformOrigin: "center" }}
          >
            Spaces That Inspire
          </span>

          <div className="pointer-events-none absolute bottom-8 right-8 text-right">
            <span className={`${fraunces.className} text-sm text-[var(--ivory-55)]`}>
              01<span className="text-[var(--ivory-45)]">/04</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
