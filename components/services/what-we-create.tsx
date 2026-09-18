"use client";

import { motion } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { WHAT_WE_CREATE } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "What We Create" — the building types the studio designs across
 * (Residential, Commercial, Hospitality, Institutional, Landscape,
 * Visualization), sitting between the studio's process (ServicesApproach)
 * and its four design principles (MorphicApproach). Same numbered-grid
 * language as ServicesApproach's process column, but laid out as an even
 * six-tile grid since there's no single-file sequence to it.
 */
export function WhatWeCreate() {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">What We Create</span>
          <h2 className={`${fraunces.className} mt-6 text-3xl font-light leading-[1.15] tracking-tight text-[var(--ivory-90)] sm:text-4xl lg:text-5xl`}>
            From An Idea To A Complete
            <br />
            Spatial <em className="italic text-[var(--gold)]">Experience.</em>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 border-t border-[var(--ivory-10)] sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_CREATE.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.1 }}
              className="border-b border-[var(--ivory-10)] pb-8 pt-8 sm:border-b-0 sm:pt-10"
            >
              <span className="text-xs text-[var(--gold)]">{item.number}</span>
              <h3 className={`${fraunces.className} mt-4 text-2xl font-light text-[var(--ivory-90)]`}>{item.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ivory-55)]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
