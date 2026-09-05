"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AnimatedQuote } from "@/components/about/animated-quote";

interface PhilosophyBlock {
  label: string;
  text: string;
}

// Condensed from the full "About Studio" copy — the original ran 3-4
// sentences per block, which read as too much text back to back. Trimmed
// to the essential clause of each while keeping the client's own phrasing
// wherever possible (the opening statement and closing pull-quote above/
// below stay verbatim).
const BLOCKS: PhilosophyBlock[] = [
  {
    label: "Approach",
    text: "We do not follow a fixed design language. Each space evolves through its own context, purpose and character — creating environments that feel individual and deeply connected to how they're meant to be used.",
  },
  {
    label: "Process",
    text: "Guided by curiosity and careful observation, we study the site, understand the people and question the obvious — treating proportion, light and materiality as parts of one larger experience, not isolated choices.",
  },
  {
    label: "Experience",
    text: "Design is not only how a space looks — it's how it feels to enter it, move through it and remember it. Functional yet expressive, refined yet comfortable, contemporary yet built to last beyond trends.",
  },
  {
    label: "Scope",
    text: "Based in India, we work across residential, commercial and bespoke spaces — from intimate interiors to larger architectural projects, each approached with the same commitment to detail and individuality.",
  },
  {
    label: "Balance",
    text: "The most memorable spaces emerge from balance — between imagination and discipline, material honesty and visual expression. We're constantly exploring how design can shape the way people live, work and feel.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Clips its child to the container and slides it up into view from below, rather than a plain fade. */
function RevealUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * The "About Studio" section, read as an editorial spread rather than a
 * wall of text: an opening statement, then five labeled blocks (each
 * masked and sliding up into view as it scrolls in), closing on the
 * studio's own signature line as a large pull-quote. Sits on the warm ivory
 * surface — the studio statement beat in the page's charcoal/ivory/graphite
 * rhythm (see app/about/page.tsx section order).
 */
export function AboutPhilosophy() {
  return (
    <section className="border-t border-[var(--charcoal-10)] bg-[var(--ivory)] px-6 py-24 sm:px-10 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--taupe)]">
            About Studio
          </span>
          <h2 className="mt-6 max-w-3xl font-serif text-3xl font-light leading-[1.2] text-[var(--charcoal)] sm:text-4xl lg:text-5xl">
            We believe that a space is more than its walls, surfaces and structure.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--taupe)] sm:text-lg">
            It is an experience shaped by light, material, proportion, movement, atmosphere and the people who
            inhabit it. Every project is an opportunity to understand this relationship and transform it into a
            meaningful spatial expression.
          </p>
        </motion.div>

        <div className="mt-20 flex flex-col divide-y divide-[var(--charcoal-10)] sm:mt-28">
          {BLOCKS.map((block) => (
            <div key={block.label} className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-12 sm:gap-8 sm:py-12">
              <RevealUp className="sm:col-span-3">
                <span className="block text-[11px] uppercase tracking-[0.25em] text-[var(--bronze)]">
                  {block.label}
                </span>
              </RevealUp>
              <RevealUp delay={0.08} className="sm:col-span-9">
                <p className="text-sm leading-relaxed text-[var(--taupe)] sm:text-base">{block.text}</p>
              </RevealUp>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center border-t border-[var(--charcoal-10)] pt-16 text-center sm:mt-32 sm:pt-20">
          <AnimatedQuote
            lines={[
              "We do not design spaces merely to fill them.",
              "We design them to give them meaning, identity and life.",
            ]}
            className="max-w-3xl font-serif text-2xl font-light leading-snug text-[var(--charcoal)] sm:text-3xl lg:text-4xl"
          />
          <div aria-hidden="true" className="mt-8 h-px w-16 bg-[var(--bronze)]" />
        </div>
      </div>
    </section>
  );
}
