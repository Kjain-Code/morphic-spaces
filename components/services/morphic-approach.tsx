"use client";

import { motion } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { MORPHIC_APPROACH_POINTS } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "The Morphic Approach" — the one light/cream section on an otherwise dark
 * page, matching the brief's call for a tonal break. Black typography on
 * --ivory, gold numerals, four short principles in a simple numbered row
 * rather than the dark page's icon-pillar treatment (see AboutPhilosophy),
 * so the two studios' "four points" sections don't read as the same
 * component reskinned.
 */
export function MorphicApproach() {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--ivory)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--gold-dark)]">
            The Morphic Approach
          </span>
          <h2
            className={`${fraunces.className} mt-6 max-w-xl text-3xl font-light leading-[1.15] tracking-tight text-[var(--charcoal)] sm:text-4xl lg:text-5xl`}
          >
            Four principles behind
            <br />
            everything we <em className="italic text-[var(--gold-dark)]">shape.</em>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:mt-16 lg:grid-cols-4">
          {MORPHIC_APPROACH_POINTS.map((point, index) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
              className="border-t border-[var(--charcoal)]/10 pt-6"
            >
              <span className={`${fraunces.className} text-3xl font-light text-[var(--gold-dark)]`}>
                {point.number}
              </span>
              <h3 className="mt-4 text-sm font-medium uppercase tracking-[0.1em] text-[var(--charcoal)]">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal)]/60">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
