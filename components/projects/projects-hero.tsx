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
    <section className="relative w-full overflow-hidden bg-[var(--charcoal)]">
      {/* Scroll Down — left edge, fades once the hero is scrolled past. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-4 z-10 hidden -rotate-180 text-[10px] uppercase tracking-[0.3em] text-[var(--ivory-45)] [writing-mode:vertical-rl] sm:block"
      >
        Scroll Down
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12">
        {/* Text column */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-24 sm:px-10 sm:py-28 lg:col-span-6 lg:py-32">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]"
          >
            Selected Work
            <span aria-hidden="true" className="h-px w-10 bg-[var(--gold-40)]" />
          </motion.p>

          <h1
            className={`${fraunces.className} mt-6 max-w-lg text-5xl font-light uppercase leading-[1.02] tracking-tight text-[var(--ivory-90)] sm:text-7xl lg:text-8xl`}
          >
            <HeadlineLine delay={0.1}>Spaces</HeadlineLine>
            <HeadlineLine delay={0.2}>With</HeadlineLine>
            <HeadlineLine delay={0.3}>
              <span className="text-[var(--gold)]">Character.</span>
            </HeadlineLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.5 }}
            className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base"
          >
            A curated selection of spaces shaped through architecture, interior design, materiality and detail.
          </motion.p>

          <motion.a
            href="#gallery"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.6 }}
            className="group mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold-40)] text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
            Explore Our Work
          </motion.a>
        </div>

        {/* Photo column */}
        <div className="relative min-h-[50vh] overflow-hidden lg:col-span-6 lg:min-h-0">
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.6, ease: EASE, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src="/images/loading/2nd.png"
              alt="A Morphic Spaces residence at dusk"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 35%" }}
              priority
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, var(--charcoal) 0%, transparent 22%), linear-gradient(0deg, rgba(23,22,20,0.5) 0%, transparent 45%)",
            }}
          />

          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: EASE, delay: prefersReducedMotion ? 0 : 0.4 }}
            className="pointer-events-none absolute -left-16 -top-16 hidden h-64 w-64 rounded-full border border-[var(--gold-30)] sm:block"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 text-right text-[11px] uppercase leading-[1.8] tracking-[0.3em] text-[var(--ivory-55)] sm:block"
          >
            Spaces
            <br />
            People
            <br />
            Stories
          </span>

          <div className="pointer-events-none absolute bottom-8 right-8 text-right">
            <span className={`${fraunces.className} text-sm text-[var(--ivory-55)]`}>
              01<span className="text-[var(--ivory-45)]">/{countLabel}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
