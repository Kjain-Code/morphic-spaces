"use client";

import Link from "next/link";
import { motion } from "motion/react";

/** The Projects page's closing statement — dark, quiet, one CTA pointing to /services (no duplicated Services content here). */
export function ProjectsClosing() {
  return (
    <section className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[var(--charcoal)] px-6 py-32 text-center sm:min-h-[80vh] sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">The work continues</p>
        <h2 className="mt-6 font-serif text-4xl font-light uppercase leading-[1.1] text-[var(--ivory-90)] sm:text-6xl">
          Spaces are not
          <br />
          just designed.
          <br />
          They are experienced.
        </h2>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
          At Morphic Spaces, we approach every project as an opportunity to create environments that feel
          purposeful, distinctive and enduring.
        </p>

        <Link
          href="/services"
          className="group mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bronze)]"
        >
          Explore Services
          <motion.span aria-hidden="true" className="inline-block" whileHover={{ x: 5 }} transition={{ duration: 0.25 }}>
            →
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
