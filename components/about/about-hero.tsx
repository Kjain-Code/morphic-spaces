"use client";

import { motion } from "motion/react";
import { ArchitecturalScene } from "@/components/about/architectural-scene";
import { GrainOverlay } from "@/components/about/grain-overlay";

/**
 * The About page's opening statement — the studio's own warm espresso
 * palette (not the homepage's cinematic black) with a slow-drifting 3D
 * massing cluster as backdrop. Headline lines ("Distinctive.",
 * "Thoughtful.", "Enduring.") are pulled directly from the studio's own
 * "About Studio" copy rather than invented, same as the subtitle sentence
 * beneath it.
 */
export function AboutHero() {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col justify-center overflow-hidden bg-[var(--espresso)] px-6 py-32 sm:min-h-[90vh] sm:px-10">
      <GrainOverlay />
      <ArchitecturalScene className="absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--espresso)] via-[var(--espresso)]/75 to-[var(--espresso)]/20 sm:via-[var(--espresso)]/60"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-[0.3em] text-[var(--clay)]"
        >
          Morphic Spaces
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-serif text-5xl font-light uppercase leading-[1.05] text-[var(--linen-90)] sm:text-7xl lg:text-8xl"
        >
          Distinctive.
          <br />
          Thoughtful.
          <br />
          Enduring.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-[var(--linen-55)] sm:text-base"
        >
          Morphic Spaces is an architecture and interior design studio founded by Kunal, with a vision to create
          spaces that are distinctive, thoughtful and enduring.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-10 text-[11px] uppercase tracking-[0.3em] text-[var(--linen-45)]"
        >
          About the studio
        </motion.p>
      </div>
    </section>
  );
}
