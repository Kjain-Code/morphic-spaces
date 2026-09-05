"use client";

import { motion } from "motion/react";
import { AnimatedQuote } from "@/components/about/animated-quote";

interface PhilosophyBlock {
  label: string;
  text: string;
}

const BLOCKS: PhilosophyBlock[] = [
  {
    label: "Approach",
    text: "Our work is rooted in the interplay of space, light, material and experience. We do not follow a fixed design language or impose a predetermined aesthetic on every project. Instead, we allow each space to evolve through its context, purpose, character and possibilities. This approach enables us to create environments that feel individual, relevant and deeply connected to the way they are meant to be used.",
  },
  {
    label: "Process",
    text: "From the initial idea to the final detail, our process is guided by curiosity, clarity and careful observation. We study the site, understand the people, question the obvious and explore the potential within every brief. Proportion, texture, natural light, circulation and materiality are considered not as isolated elements, but as parts of a larger experience.",
  },
  {
    label: "Experience",
    text: "For us, design is not only about how a space looks. It is about how it feels when someone enters it, moves through it, pauses within it and remembers it. A well-designed space should be functional yet expressive, refined yet comfortable, contemporary yet capable of lasting beyond trends.",
  },
  {
    label: "Scope",
    text: "Based in India, Morphic Spaces works across residential, commercial and bespoke spatial environments. Our projects range from intimate interiors to larger architectural and experiential spaces, each approached with the same commitment to detail, purpose and individuality.",
  },
  {
    label: "Balance",
    text: "We believe that the most memorable spaces are created when design is allowed to be both thoughtful and instinctive. They emerge from a balance between imagination and discipline, between material honesty and visual expression, between what is required and what is possible. At Morphic Spaces, we are constantly exploring how spaces can influence the way people live, work, connect and feel.",
  },
];

/**
 * The "About Studio" copy in full, read as an editorial spread rather than
 * a wall of text: an opening statement, then five labeled blocks (each
 * reveals independently as it scrolls into view), closing on the studio's
 * own signature line as a large pull-quote. Every word here is the
 * client-provided copy — nothing paraphrased or invented.
 */
export function AboutPhilosophy() {
  return (
    <section className="border-t border-[var(--ink-10)] bg-[var(--surface)] px-6 py-24 sm:px-10 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--ink-muted)]">About Studio</span>
          <h2 className="mt-6 max-w-3xl font-serif text-3xl font-light leading-[1.2] text-[var(--ink)] sm:text-4xl lg:text-5xl">
            We believe that a space is more than its walls, surfaces and structure.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg">
            It is an experience shaped by light, material, proportion, movement, atmosphere and the people who
            inhabit it. Every project is an opportunity to understand this relationship and transform it into a
            meaningful spatial expression.
          </p>
        </motion.div>

        <div className="mt-20 flex flex-col divide-y divide-[var(--ink-10)] sm:mt-28">
          {BLOCKS.map((block) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-12 sm:gap-8 sm:py-12"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--stone)] sm:col-span-3">
                {block.label}
              </span>
              <p className="text-sm leading-relaxed text-[var(--ink-muted)] sm:col-span-9 sm:text-base">
                {block.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center border-t border-[var(--ink-10)] pt-16 text-center sm:mt-32 sm:pt-20">
          <AnimatedQuote
            lines={[
              "We do not design spaces merely to fill them.",
              "We design them to give them meaning, identity and life.",
            ]}
            className="max-w-3xl font-serif text-2xl font-light leading-snug text-[var(--ink)] sm:text-3xl lg:text-4xl"
          />
          <div aria-hidden="true" className="mt-8 h-px w-16 bg-[var(--moss)]" />
        </div>
      </div>
    </section>
  );
}
