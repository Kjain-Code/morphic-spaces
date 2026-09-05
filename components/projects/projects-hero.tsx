"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Projects page's opening statement — quiet, no imagery, on the studio's
 * charcoal (not the homepage's own --stage black — see globals.css for why
 * these stay two separate tokens even though they read almost identically).
 * Deliberately left-anchored with generous negative space around it — a calm
 * first viewport before the orbital gallery enters — rather than centering
 * everything, per the studio's editorial-magazine reference.
 */
export function ProjectsHero() {
  return (
    <section className="flex min-h-[72vh] w-full flex-col justify-center bg-[var(--charcoal)] px-6 py-32 sm:min-h-[82vh] sm:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[11px] uppercase tracking-[0.3em] text-[var(--bronze)]"
        >
          Morphic Spaces
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
          className="mt-7 font-serif text-[13.5vw] font-light uppercase leading-[1.04] tracking-[0.01em] text-[var(--ivory-90)] sm:text-8xl lg:text-[7.5rem]"
        >
          Spaces
          <br />
          With
          <br />
          Character.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
          className="mt-9 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base"
        >
          A curated selection of spaces shaped through architecture, interior design, materiality and detail.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.44 }}
          className="mt-11 text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]"
        >
          Selected work
        </motion.p>
      </div>
    </section>
  );
}
