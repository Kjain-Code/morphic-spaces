"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Reason {
  number: string;
  title: string;
  caption: string;
}

const REASONS: Reason[] = [
  {
    number: "01",
    title: "Personalized Approach",
    caption: "Every project is unique, and so is our process. We listen, we understand, we design.",
  },
  {
    number: "02",
    title: "End-to-End Solutions",
    caption: "From concept to completion, we handle every detail with care and clarity.",
  },
  {
    number: "03",
    title: "Timeless Aesthetics",
    caption: "Spaces that stay relevant, beautiful and meaningful for years to come.",
  },
  {
    number: "04",
    title: "Sustainable Thinking",
    caption: "We design responsibly, with materials and methods that respect the future.",
  },
];

/** A horizontal rule that draws itself in left-to-right as it scrolls into view, closing out each reason row. */
function SelfDrawingRule({ delay }: { delay: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: EASE, delay: prefersReducedMotion ? 0 : delay }}
      style={{ transformOrigin: "left" }}
      className="mt-6 block h-px w-full bg-[var(--charcoal-10)]"
    />
  );
}

/**
 * "Why Choose Us" — new section per the client's reference, sitting between
 * OurApproach and the deeper process/story chapters further down the page.
 * A short partnership statement on the left (with a small textural image —
 * one of the client's own supplied reference photos, used here as an
 * atmosphere note rather than a project credit) and a 2x2 numbered list on
 * the right, each row closing with a rule that draws itself in on scroll.
 */
export function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-t border-[var(--charcoal-10)] bg-[var(--ivory)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: EASE }}
          className="lg:col-span-5"
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--taupe)]">Why Choose Us</span>
          <h2
            className={`mt-6 max-w-sm text-3xl font-light leading-[1.2] tracking-tight text-[var(--charcoal)] sm:text-4xl`}
          >
            More than just design.
            <br />
            <em className="italic text-[var(--gold-dark)]">It&rsquo;s a partnership.</em>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--taupe)] sm:text-base">
            We bring together creative vision, technical expertise and a deep understanding of human needs to
            create spaces that are beautiful, functional and enduring.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--charcoal-70)] transition-colors hover:text-[var(--charcoal)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold-40)] text-[var(--gold-dark)] transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
              Our Services
            </Link>

            <div className="relative hidden h-16 w-20 overflow-hidden rounded-lg sm:block">
              <Image
                src="/images/loading/why-choose-accent.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: index * 0.08 }}
            >
              <span className="text-sm font-light text-[var(--gold-dark)]">{reason.number}</span>
              <h3 className="mt-3 text-base font-medium uppercase tracking-[0.04em] text-[var(--charcoal)] sm:text-lg">
                {reason.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--taupe)]">{reason.caption}</p>
              <SelfDrawingRule delay={index * 0.08 + 0.2} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
