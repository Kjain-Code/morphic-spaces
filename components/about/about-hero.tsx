"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fraunces } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_LINES = ["We Are Not Here To", "Follow A Language.", "We Are Here To Create One."];

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
    <span className="block overflow-hidden pb-[0.06em]">
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
    <section className="relative min-h-[min(900px,100svh)] w-full overflow-hidden bg-[var(--charcoal)]">
      <motion.div
        initial={{ scale: 1.12, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.8, ease: EASE }}
        className="absolute inset-x-0 bottom-0 top-[9%] w-full lg:left-[25%] lg:right-[4%] lg:top-[13%] lg:w-auto"
      >
        <Image
          src="/images/projects/147p-panchkula-interior.jpg"
          alt="A Morphic Spaces interior with warm timber ceiling and staircase detail"
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "78% 35%" }}
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--charcoal) 0%, rgba(23,22,20,0.92) 18%, rgba(23,22,20,0.08) 62%, rgba(23,22,20,0.3) 100%), linear-gradient(0deg, rgba(23,22,20,0.9) 0%, transparent 40%, rgba(23,22,20,0.28) 100%)",
          }}
        />
      </motion.div>

      <div aria-hidden="true" className="absolute right-[8%] top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-full border border-[var(--gold-30)] lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[min(900px,100svh)] max-w-7xl flex-col px-6 pb-8 pt-28 sm:px-10 sm:pb-10 lg:px-16 lg:pt-36">
        <div className="flex items-start justify-end">
          <span className="hidden text-right text-[10px] uppercase tracking-[0.3em] text-[var(--ivory-55)] sm:block">Built<br />People<br />Stories</span>
        </div>

        <div className="relative mt-auto max-w-4xl pb-16 pt-20 sm:pb-20 sm:pt-24 lg:max-w-6xl lg:pb-24 lg:pt-28">
          <h1 className={`${fraunces.className} text-[clamp(2.7rem,5vw,5.4rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--ivory-90)]`}>
            <HeadlineLine delay={0.1}>{HEADLINE_LINES[0]}</HeadlineLine>
            <HeadlineLine delay={0.2}>{HEADLINE_LINES[1]}</HeadlineLine>
            <HeadlineLine delay={0.3}><span className="ml-[3%] italic text-[var(--gold)] lg:whitespace-nowrap">{HEADLINE_LINES[2]}</span></HeadlineLine>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--ivory-70)] sm:ml-[16%] sm:text-base"
          >
            Morphic Spaces is born from a simple belief — space is not merely something we occupy, it is something we experience.
          </motion.p>
        </div>

        <div className="flex flex-col gap-7 border-t border-[var(--ivory-20)] pt-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.a
            href="#our-story"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.6 }}
            className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[var(--ivory-70)] transition-colors hover:text-[var(--gold)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold-40)] text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-1">→</span>
            Our Story
          </motion.a>
          <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-[var(--ivory-55)]">
            <span className="h-10 w-px bg-[var(--gold)]" />
            <span>Designing<br />for how people live.</span>
            <span className={`${fraunces.className} text-sm text-[var(--ivory-70)]`}>01<span className="text-[var(--ivory-45)]">/04</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
