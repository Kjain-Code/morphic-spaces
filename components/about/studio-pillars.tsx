"use client";

import { motion } from "motion/react";
import type { ReactElement, SVGProps } from "react";

interface Pillar {
  number: string;
  title: string;
  caption: string;
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
}

function IconLight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" {...props}>
      <circle cx="16" cy="16" r="6.5" stroke="currentColor" />
      <path
        stroke="currentColor"
        d="M16 2.5v4M16 25.5v4M29.5 16h-4M6.5 16h-4M25.6 6.4l-2.8 2.8M9.2 22.8l-2.8 2.8M25.6 25.6l-2.8-2.8M9.2 9.2 6.4 6.4"
      />
    </svg>
  );
}

function IconMaterial(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" {...props}>
      <path stroke="currentColor" d="M16 5 28 12 16 19 4 12Z" />
      <path stroke="currentColor" d="M4 18.5 16 25.5l12-7M4 24l12 7 12-7" />
    </svg>
  );
}

function IconContext(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="0.5" stroke="currentColor" />
      <circle cx="22" cy="22" r="6" stroke="currentColor" />
    </svg>
  );
}

function IconDetail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="13.5" cy="13.5" r="9" stroke="currentColor" />
      <path stroke="currentColor" d="m20 20 8 8" />
      <path stroke="currentColor" d="M13.5 9.5v8M9.5 13.5h8" />
    </svg>
  );
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Light & Atmosphere",
    caption: "Every space is shaped by light, atmosphere and the quality of the air within it.",
    Icon: IconLight,
  },
  {
    number: "02",
    title: "Material Honesty",
    caption: "Texture and proportion chosen for how they feel, not only for how they look.",
    Icon: IconMaterial,
  },
  {
    number: "03",
    title: "Context & Individuality",
    caption: "No fixed language — each space evolves through its own context, purpose and character.",
    Icon: IconContext,
  },
  {
    number: "04",
    title: "Detail & Longevity",
    caption: "Refined yet comfortable, contemporary yet built to remain meaningful beyond trends.",
    Icon: IconDetail,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Card entrance + hover, orchestrated as one variants map so the icon and
 * underline (children with no `animate` of their own) inherit whichever
 * state — hidden/visible/hover — the card itself is in. */
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } }),
  hover: { y: -6, transition: { duration: 0.4, ease: EASE } },
};

const iconVariants = {
  hidden: { opacity: 0, rotate: -18, scale: 0.6 },
  visible: (delay: number) => ({
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE, delay: delay + 0.15 },
  }),
  hover: { rotate: 8, scale: 1.12, transition: { duration: 0.4, ease: EASE } },
};

const underlineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.45, ease: EASE } },
};

/**
 * A scannable "who we are" digest, sitting between the hero and the full
 * About Studio narrative — four pillars distilled from that same copy's
 * recurring themes (light, material, context, detail), given their own
 * cards rather than staying buried in paragraphs. Each card lifts, its icon
 * tilts, and a clay underline draws in on hover, on top of the staggered
 * entrance.
 */
export function StudioPillars() {
  return (
    <section className="border-t border-[var(--espresso-10)] bg-[var(--linen)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="block text-[11px] uppercase tracking-[0.3em] text-[var(--espresso-muted)]"
        >
          What We Believe
        </motion.span>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              custom={index * 0.08}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={cardVariants}
              className="relative overflow-hidden border-t border-[var(--espresso-10)] pt-8"
            >
              <motion.span
                aria-hidden="true"
                variants={underlineVariants}
                style={{ transformOrigin: "left" }}
                className="absolute left-0 top-0 h-[2px] w-full bg-[var(--clay)]"
              />
              <div className="flex items-start justify-between">
                <motion.div variants={iconVariants}>
                  <pillar.Icon className="h-8 w-8 text-[var(--clay)]" />
                </motion.div>
                <span className="font-serif text-2xl font-light text-[var(--espresso-20)]">{pillar.number}</span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-light text-[var(--espresso)] sm:text-[1.7rem]">
                {pillar.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--espresso-muted)]">{pillar.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
