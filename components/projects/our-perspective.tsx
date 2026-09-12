"use client";

import { motion, useReducedMotion } from "motion/react";
import { fraunces } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Our Perspective" — a short breathing beat between the featured project
 * and the closing CTA: a gold line that draws itself downward, then a
 * clip-path headline reveal and a single line of copy. No image, no card
 * grid — a deliberate pause after two dense, image-heavy sections.
 */
export function OurPerspective() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="flex min-h-[50vh] w-full flex-col items-center justify-center border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-24 text-center sm:px-10">
      <motion.span
        aria-hidden="true"
        initial={{ height: 0 }}
        whileInView={{ height: "6rem" }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: EASE }}
        className="block w-px bg-[var(--gold)]"
      />

      <div className="mt-8 overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: EASE, delay: prefersReducedMotion ? 0 : 0.15 }}
          className={`${fraunces.className} text-3xl font-light leading-snug tracking-tight text-[var(--ivory-90)] sm:text-4xl lg:text-5xl`}
        >
          Our Perspective
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.4 }}
        className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base"
      >
        Every project begins with a way of seeing.
      </motion.p>
    </section>
  );
}
