"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fraunces } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Services page's final CTA — a single full-width cinematic photograph
 * (rather than the two-column split used on About/Projects' closings, per
 * the brief) with a dark overlay, centered statement and one CTA, plus a
 * partially-visible gold ring bleeding off the frame edge as a quiet
 * architectural motif instead of a second image.
 */
export function ServicesClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden border-t border-[var(--ivory-10)] bg-[var(--charcoal)]">
      <div className="relative min-h-[70vh] w-full sm:min-h-[36rem]">
        <motion.div
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.6, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src="/images/projects/residence-kaithal.jpg"
            alt="A Morphic Spaces residence at Kaithal"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 30%" }}
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-[var(--charcoal)]/70" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(23,22,20,0.55) 0%, transparent 30%, rgba(23,22,20,0.65) 100%)" }}
        />

        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: EASE, delay: 0.3 }}
          className="pointer-events-none absolute -bottom-24 -right-24 hidden h-72 w-72 rounded-full border border-[var(--gold-30)] sm:block"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10 sm:py-28">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE }}
            className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]"
          >
            Beyond Function
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: EASE, delay: 0.1 }}
            className={`${fraunces.className} mt-6 max-w-2xl text-3xl font-light leading-[1.2] tracking-tight text-[var(--ivory-90)] sm:text-4xl lg:text-5xl`}
          >
            Design That Goes Beyond <em className="italic text-[var(--gold)]">Function.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: 0.18 }}
            className="mt-7 max-w-xl text-sm leading-relaxed text-[var(--ivory-70)] sm:text-base"
          >
            At Morphic Spaces, we believe great design is not simply about creating beautiful spaces. It is about
            understanding how a space will be lived, experienced and remembered. We bring architecture, interiors,
            materials, light and visualization together to create environments that are purposeful, expressive and
            uniquely yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: 0.32 }}
          >
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-90)] transition-colors hover:text-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
