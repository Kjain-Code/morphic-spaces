"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { GrainOverlay } from "@/components/about/grain-overlay";

const LOCATIONS = ["Chandigarh", "Panchkula", "Mohali", "Gurugram"];
const ESTABLISHED_YEAR = 2022;

/** Counts up from 0 to `year` once it scrolls into view; jumps straight to the final value under reduced motion. */
function EstablishedYear({ year }: { year: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  // Always starts at 0, matching what the server renders — prefersReducedMotion
  // is unknown at SSR time and already resolved on the client's first render,
  // so seeding this from it (rather than from a constant) mismatches the two
  // and fails hydration. The jump to the real value happens after mount instead.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    // Same animate() call either way, just a zero duration under reduced
    // motion (jumps straight to `year` via the same onUpdate callback)
    // rather than a direct setState — keeps every render's state update
    // flowing through the one external-system callback.
    const controls = animate(0, year, {
      duration: prefersReducedMotion ? 0 : 1.8,
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
    <section className="relative overflow-hidden border-t border-[var(--linen-10)] bg-[var(--espresso)] px-6 sm:px-10">
      <GrainOverlay />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-[var(--linen-10)] py-16 sm:border-b-0 sm:border-r sm:border-[var(--linen-10)] sm:py-24 sm:pr-14"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--linen-45)]">Established</span>
          <p className="mt-5 font-serif text-6xl font-light text-[var(--clay)] sm:text-7xl">
            <EstablishedYear year={ESTABLISHED_YEAR} />
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--linen-55)]">
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
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--linen-45)]">Where We Work</span>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
            {LOCATIONS.map((city, index) => (
              <li key={city} className="flex items-center gap-3">
                <span className="font-serif text-2xl font-light text-[var(--linen-90)] sm:text-3xl">{city}</span>
                {index < LOCATIONS.length - 1 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--clay)]" />
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--linen-55)]">
            Rooted in the Chandigarh Tricity — Chandigarh, Panchkula and Mohali — Morphic Spaces extends its work to
            Gurugram, bringing a consistent yet context-driven design approach across each location.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
