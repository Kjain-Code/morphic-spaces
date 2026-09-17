"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { PROJECT_COUNT } from "@/components/projects/project-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Masks and slides one headline line up into view on mount. `animate`, not
 * `whileInView` — this is the very first thing on the page, already in the
 * viewport at load, so a scroll-triggered reveal here is unreliable (see the
 * identical fix on AboutHero's headline for the failure mode this avoids).
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
 * The Projects page's opening statement — reworked from a centered,
 * imageless statement into a two-column split matching the client's
 * reference: the headline as a line-by-line reveal on the left, a real
 * project photograph on the right with the page's own editorial labels
 * ("Spaces / People / Stories", a "01/08" counter matching the studio's
 * project count). Everything animates on mount, not on scroll — see
 * HeadlineLine's comment.
 */
export function ProjectsHero() {
  const prefersReducedMotion = useReducedMotion();
  const countLabel = String(PROJECT_COUNT).padStart(2, "0");

  return (
    <section className="relative min-h-[min(780px,100svh)] w-full overflow-hidden bg-[var(--charcoal)]">
      <motion.div
        initial={{ scale: 1.12, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.8, ease: EASE }}
        className="absolute inset-x-0 bottom-0 top-[9%] lg:left-[22%] lg:right-[4%] lg:top-[13%]"
      >
        <Image
          src="/images/projects/147p-panchkula.jpg"
          alt="147-P, Sector 26 — a Morphic Spaces residence in Panchkula"
          fill
          sizes="(min-width: 1024px) 74vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "50% 35%" }}
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--charcoal) 0%, rgba(23,22,20,0.9) 17%, rgba(23,22,20,0.12) 62%, rgba(23,22,20,0.3) 100%), linear-gradient(0deg, rgba(23,22,20,0.92) 0%, transparent 42%, rgba(23,22,20,0.25) 100%)",
          }}
        />
      </motion.div>

      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.3, ease: EASE, delay: prefersReducedMotion ? 0 : 0.35 }}
        className="pointer-events-none absolute right-[10%] top-[38%] hidden h-52 w-52 rounded-full border border-[var(--gold-30)] lg:block"
      />

      <div className="relative z-10 mx-auto flex min-h-[min(780px,100svh)] max-w-7xl flex-col px-6 pb-8 pt-24 sm:px-10 sm:pb-10 sm:pt-28 lg:px-16 lg:pt-32">
        <div className="flex items-start justify-between">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]"
          >
            <span>Selected Work</span><span className="h-px w-10 bg-[var(--gold-40)]" />
          </motion.p>
          <span className="hidden text-right text-[10px] uppercase leading-[1.8] tracking-[0.3em] text-[var(--ivory-55)] sm:block">Architecture<br />Interiors<br />Commercial</span>
        </div>

        <div className="relative mt-10 max-w-4xl pb-12 pt-8 sm:mt-14 sm:pb-16 sm:pt-10 lg:mt-16 lg:pb-20 lg:pt-12">
          <h1 className={`${fraunces.className} text-[clamp(2.6rem,6.2vw,6.2rem)] font-light uppercase leading-[0.9] tracking-[-0.035em] text-[var(--ivory-90)]`}>
            <HeadlineLine delay={0.1}>Spaces</HeadlineLine>
            <HeadlineLine delay={0.2}>With</HeadlineLine>
            <HeadlineLine delay={0.3}><span className="ml-[7%] text-[var(--gold)]">Character.</span></HeadlineLine>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--ivory-70)] sm:ml-[15%] sm:text-base"
          >
            A curated selection of spaces shaped through architecture, interior design, materiality and detail.
          </motion.p>
        </div>

        <div className="flex flex-col gap-7 border-t border-[var(--ivory-20)] pt-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.a
            href="#gallery"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.6 }}
            className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[var(--ivory-70)] transition-colors hover:text-[var(--gold)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold-40)] text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-1">→</span>
            Explore Our Work
          </motion.a>
          <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-[var(--ivory-55)]">
            <span className="h-10 w-px bg-[var(--gold)]" />
            <span>Spaces shaped<br />with intention.</span>
            <span className={`${fraunces.className} text-sm text-[var(--ivory-70)]`}>01<span className="text-[var(--ivory-45)]">/{countLabel}</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
