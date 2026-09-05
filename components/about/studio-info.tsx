"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

const LOCATIONS = ["Chandigarh", "Panchkula", "Mohali", "Gurugram"];
const ESTABLISHED_YEAR = 2022;

/** Counts up from 0 to `year` once it scrolls into view; renders the final value immediately under reduced motion. */
function EstablishedYear({ year }: { year: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? year : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    const controls = animate(0, year, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, year]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

/**
 * Dark info strip between the founder story and the closing CTA — the two
 * facts the studio actually has to state (when it was founded, where it
 * works), given equal weight side by side rather than buried in prose.
 */
export function StudioInfo() {
  return (
    <section className="border-t border-white/10 bg-[var(--stage)] px-6 sm:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-white/10 py-16 sm:border-b-0 sm:border-r sm:border-white/10 sm:py-24 sm:pr-14"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/45">Established</span>
          <p className="mt-5 font-serif text-6xl font-light text-white/95 sm:text-7xl">
            <EstablishedYear year={ESTABLISHED_YEAR} />
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
            Morphic Spaces was founded in {ESTABLISHED_YEAR} with a vision to create thoughtful, distinctive and
            enduring spaces.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="py-16 sm:py-24 sm:pl-14"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/45">Where We Work</span>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
            {LOCATIONS.map((city, index) => (
              <li key={city} className="flex items-center gap-3">
                <span className="font-serif text-2xl font-light text-white/95 sm:text-3xl">{city}</span>
                {index < LOCATIONS.length - 1 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--moss)]" />}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
            Rooted in the Chandigarh Tricity — Chandigarh, Panchkula and Mohali — Morphic Spaces extends its work to
            Gurugram, bringing a consistent yet context-driven design approach across each location.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
