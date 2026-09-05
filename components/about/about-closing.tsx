"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GrainOverlay } from "@/components/about/grain-overlay";

/** The About page's closing statement — the studio's charcoal, one CTA pointing to /contact. Mirrors ProjectsClosing's rhythm. */
export function AboutClosing() {
  return (
    <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-32 text-center sm:min-h-[80vh] sm:px-10">
      <GrainOverlay />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{ background: "radial-gradient(closest-side, var(--bronze), transparent)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl"
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--bronze)]">Let&rsquo;s begin</p>
        <h2 className="mt-6 font-serif text-4xl font-light uppercase leading-[1.1] text-[var(--ivory-90)] sm:text-6xl">
          Let&rsquo;s create
          <br />
          something
          <br />
          meaningful.
        </h2>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
          Every project becomes a new opportunity to experiment, refine and discover something unexpected.
        </p>

        <Link
          href="/contact"
          className="group mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bronze)]"
        >
          Get in Touch
          <motion.span aria-hidden="true" className="inline-block" whileHover={{ x: 5 }} transition={{ duration: 0.25 }}>
            →
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
