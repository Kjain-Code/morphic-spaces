"use client";

import { motion } from "motion/react";
import type { ReactElement, SVGProps } from "react";
import { fraunces } from "@/lib/fonts";

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
    caption: "Rooms that breathe, with light as a medium.",
    Icon: IconLight,
  },
  {
    number: "02",
    title: "Material Honesty",
    caption: "Real materials, real character.",
    Icon: IconMaterial,
  },
  {
    number: "03",
    title: "Context & Individuality",
    caption: "No formulas. Only what fits you.",
    Icon: IconContext,
  },
  {
    number: "04",
    title: "Detail & Longevity",
    caption: "Thoughtful details for a lasting impact.",
    Icon: IconDetail,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } }),
};

/**
 * "Our Philosophy" — the studio's belief statement paired with its four
 * pillars in one dark band, rather than the belief statement (light
 * surface) and the pillars (separate card grid) as two disconnected
 * sections. Matches the client's reference: a short editorial half on the
 * left, four evenly-divided columns on the right, one settled composition
 * instead of two. The previous five-block "Approach/Process/Experience/
 * Scope/Balance" list and its closing pull-quote have been retired — their
 * substance (process, scope) now lives in ArchitecturalAssembly's caption
 * and OurApproach further down the page, so nothing is simply dropped.
 */
export function AboutPhilosophy() {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-5"
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">Our Philosophy</span>
          <h2
            className={`${fraunces.className} mt-6 max-w-md text-3xl font-light leading-[1.2] tracking-tight text-[var(--ivory-90)] sm:text-4xl`}
          >
            Designing environments that <em className="italic text-[var(--gold)]">feel like you.</em>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
            At Morphic Spaces, we believe great design is not just about how a space looks — it&rsquo;s about how it
            feels, how it moves you, and how it becomes part of your story. We create thoughtful, timeless spaces
            that blend function, emotion and aesthetics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-[var(--ivory-10)] pt-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-4 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              custom={index * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={cardVariants}
              className="border-t border-[var(--ivory-10)] pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <pillar.Icon className="h-7 w-7 text-[var(--gold)]" />
              <h3 className={`${fraunces.className} mt-5 text-base font-light text-[var(--ivory-90)] sm:text-lg`}>
                {pillar.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ivory-45)] sm:text-sm">{pillar.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
