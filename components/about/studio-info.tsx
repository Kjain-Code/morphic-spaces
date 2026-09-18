"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { fraunces } from "@/lib/fonts";

const LOCATIONS = ["Chandigarh", "Panchkula", "Mohali", "Karnal", "Gurugram"];

interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const STATS: Stat[] = [
  { value: 2022, suffix: "", label: "Established" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

/** Counts up from 0 to `value` once it scrolls into view; jumps straight to the final value under reduced motion. */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  // Always starts at 0, matching what the server renders — see the identical
  // comment in the previous version of this file for why this can't seed
  // from prefersReducedMotion directly.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: prefersReducedMotion ? 0 : 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/**
 * "Our Journey" — the studio's headline numbers as one evenly-divided row
 * (a fourth, non-numeric "Ideas Still Growing" mark closes it out) rather
 * than the previous two-column established-year/where-we-work split. Sits
 * on the warm ivory surface, between AboutPhilosophy's dark band and
 * OurApproach's — a light beat to breathe between two dark ones. "Where We
 * Work" is kept, just demoted to a small strip beneath the stats instead of
 * sharing equal billing with them.
 */
export function StudioInfo() {
  return (
    <section className="border-t border-[var(--charcoal-10)] bg-[var(--ivory)] px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="block text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--taupe)]"
        >
          Our Journey
        </motion.span>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
              className="border-l border-[var(--charcoal-10)] pl-5 first:border-l-0 first:pl-0 sm:pl-8"
            >
              <p className={`${fraunces.className} text-4xl font-light text-[var(--charcoal)] sm:text-5xl`}>
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[var(--taupe)] sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 3 * 0.08 }}
            className="border-l border-[var(--charcoal-10)] pl-5 sm:pl-8"
          >
            <p className={`${fraunces.className} text-4xl font-light text-[var(--gold-dark)] sm:text-5xl`}>&infin;</p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[var(--taupe)] sm:text-sm">
              Ideas Still Growing
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--charcoal-10)] pt-8 sm:mt-16"
        >
          <span className="mr-2 text-[11px] uppercase tracking-[0.25em] text-[var(--taupe)]">Where We Work</span>
          {LOCATIONS.map((city, index) => (
            <span key={city} className="flex items-center gap-3 text-sm text-[var(--charcoal-70)]">
              {city}
              {index < LOCATIONS.length - 1 && (
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--gold)]" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
