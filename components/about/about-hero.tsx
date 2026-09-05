"use client";

import { motion } from "motion/react";

/**
 * The About page's opening statement — dark, quiet, same rhythm as
 * ProjectsHero. Headline lines ("Distinctive.", "Thoughtful.", "Enduring.")
 * are pulled directly from the studio's own "About Studio" copy rather than
 * invented, same as the subtitle sentence beneath it.
 */
export function AboutHero() {
  return (
    <section className="flex min-h-[80vh] w-full flex-col justify-center bg-[var(--stage)] px-6 py-32 sm:min-h-[90vh] sm:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-[0.3em] text-white/45"
        >
          Morphic Spaces
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-serif text-5xl font-light uppercase leading-[1.05] text-white/90 sm:text-7xl lg:text-8xl"
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
          className="mt-8 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
        >
          Morphic Spaces is an architecture and interior design studio founded by Kunal, with a vision to create
          spaces that are distinctive, thoughtful and enduring.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-10 text-[11px] uppercase tracking-[0.3em] text-white/40"
        >
          About the studio
        </motion.p>
      </div>
    </section>
  );
}
