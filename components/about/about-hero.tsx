"use client";

import { motion } from "motion/react";
import { ArchitecturalScene } from "@/components/about/architectural-scene";
import { GrainOverlay } from "@/components/about/grain-overlay";

/**
 * The About page's opening statement — the studio's own deep architectural
 * charcoal (not the homepage's --stage black — see globals.css) with a
 * slow-drifting 3D massing cluster as backdrop. Centered (a side-anchored
 * block read oddly against the full-bleed 3D scene), with a symmetric radial
 * scrim behind it so the massing cluster stays visible at the edges either
 * side. Headline lines ("Distinctive.", "Thoughtful.", "Enduring.") are
 * pulled directly from the studio's own "About Studio" copy rather than
 * invented, same as the subtitle sentence beneath it.
 */
export function AboutHero() {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-[var(--charcoal)] px-6 py-32 text-center sm:min-h-[90vh] sm:px-10">
      <GrainOverlay />
      <ArchitecturalScene className="absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 50%, var(--charcoal) 0%, var(--charcoal) 35%, transparent 78%), var(--charcoal)",
          opacity: 0.92,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-[0.3em] text-[var(--bronze)]"
        >
          Morphic Spaces
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-serif text-5xl font-light uppercase leading-[1.05] text-[var(--ivory-90)] sm:text-7xl lg:text-8xl"
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
          className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base"
        >
          Morphic Spaces is an architecture and interior design studio founded by Kunal, with a vision to create
          spaces that are distinctive, thoughtful and enduring.
        </motion.p>
      </div>
    </section>
  );
}
