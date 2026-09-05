"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedQuote } from "@/components/about/animated-quote";

const FRAGMENTS = [
  "A quiet moment of light.",
  "The texture of a material.",
  "The transition from one space to another.",
  "The relationship between form and function.",
];

/**
 * "Your Story" — the studio's origin, told alongside a portrait of its
 * founder. Condensed from the full client copy to what's essential for a
 * page (the repeated "no fixed language" theme already appears in
 * AboutPhilosophy's "Approach" block, so it isn't restated here). The
 * portrait reveals behind a bronze-colored panel that wipes away on scroll,
 * rather than a plain fade — a small, one-time moment of drama. Sits on the
 * stone surface (not plain ivory) so it reads as its own beat rather than
 * blending into AboutPhilosophy right above it.
 */
export function FounderStory() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-t border-[var(--charcoal-10)] bg-[var(--stone-warm)] px-6 py-24 sm:px-10 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--charcoal)]">
            {/*
              `initial` stays a fixed value on both of these — Motion bakes
              it into the SSR'd inline `style`, so branching it on
              prefersReducedMotion (unknown at SSR time, already resolved on
              the client's first render) produced a real attribute mismatch
              at hydration. Reduced motion instead collapses `transition`
              to zero duration: same starting frame either way, just an
              instant cut to the end state instead of an animated one.
            */}
            <motion.div
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src="/images/Founder.png"
                alt="Kunal, Founder of Morphic Spaces"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.85,
                ease: [0.65, 0, 0.35, 1],
                delay: prefersReducedMotion ? 0 : 0.15,
              }}
              style={{ transformOrigin: "right" }}
              className="absolute inset-0 bg-[var(--bronze)]"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="mt-6 flex items-baseline justify-between border-t border-[var(--charcoal-10)] pt-5"
          >
            <span className="font-serif text-xl font-light text-[var(--charcoal)]">Kunal</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--taupe)]">
              Founder, Morphic Spaces
            </span>
          </motion.div>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--taupe)]">
              Our Story
            </span>
            <h2 className="mt-6 max-w-xl font-serif text-3xl font-light leading-[1.2] text-[var(--charcoal)] sm:text-4xl">
              It began with a different way of seeing space.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--taupe)]">
              Morphic Spaces was born from a simple belief — space is not merely something we occupy; it is
              something we experience. Founded by Kunal, the studio emerged from a desire to look beyond
              conventional ideas of design and explore the possibilities that exist between space, material, light
              and human experience.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--taupe)]">
              For Kunal, every project begins with curiosity. What gives a space its identity? What makes a place
              feel connected to the people who inhabit it? And how can design create something that remains
              meaningful beyond the moment it is created? These questions continue to shape the foundation of
              Morphic Spaces.
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            className="mt-10 flex flex-col gap-3 border-l-2 border-[var(--bronze)] pl-6"
          >
            {FRAGMENTS.map((fragment) => (
              <motion.li
                key={fragment}
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-lg italic font-light text-[var(--charcoal)] sm:text-xl"
              >
                {fragment}
              </motion.li>
            ))}
          </motion.ul>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--taupe)]"
          >
            It is often these subtle elements that give a space its lasting character.
          </motion.p>

          <div className="mt-14 border-t border-[var(--charcoal-10)] pt-10">
            <AnimatedQuote
              lines={["We are not here to follow a language.", "We are here to create one."]}
              className="font-serif text-2xl font-light leading-snug text-[var(--charcoal)] sm:text-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
