"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { GrainOverlay } from "@/components/about/grain-overlay";
import { fraunces } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

function RotatingRing({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <span aria-hidden="true" className={`rounded-full border border-[var(--gold-30)] ${className}`} />;
  }
  return (
    <motion.span
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 50, ease: "linear", repeat: Infinity }}
      className={`rounded-full border border-dashed border-[var(--gold-30)] ${className}`}
    />
  );
}

/**
 * The About page's closing statement — reworked into a two-column layout
 * (headline left, a real project photo right with an overlapping circular
 * CTA) to match the client's reference, in place of the previous centered
 * charcoal slab. Still the page's one CTA pointing to /contact.
 */
export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden border-t border-[var(--ivory-10)] bg-[var(--charcoal)]">
      <GrainOverlay />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[36rem] w-[36rem] -translate-x-1/3 -translate-y-1/3 rounded-full opacity-30"
        style={{ background: "radial-gradient(closest-side, var(--gold), transparent)" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: EASE }}
          className="flex flex-col justify-center px-6 py-20 sm:px-10 sm:py-28 lg:col-span-5 lg:py-32"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">Let&rsquo;s begin</p>
          <h2
            className={`${fraunces.className} mt-6 max-w-sm text-3xl font-light leading-[1.2] tracking-tight text-[var(--ivory-90)] sm:text-4xl`}
          >
            We design spaces that shape <em className="italic text-[var(--gold)]">better living.</em>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)]">
            Every project becomes a new opportunity to experiment, refine and discover something unexpected.
          </p>
        </motion.div>

        <div className="relative min-h-[50vh] overflow-hidden lg:col-span-7 lg:min-h-[36rem]">
          <motion.div
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.4, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src="/images/projects/residence-mohali.jpg"
              alt="A Morphic Spaces residence in Mohali with glass balconies and stone cladding"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(255deg, var(--charcoal) 0%, transparent 20%), linear-gradient(0deg, rgba(23,22,20,0.4) 0%, transparent 40%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: EASE, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12"
          >
            <Link
              href="/contact"
              className="group relative flex h-32 w-32 items-center justify-center rounded-full bg-[var(--charcoal)]/80 text-center text-[11px] uppercase leading-tight tracking-[0.1em] text-[var(--ivory-90)] backdrop-blur-sm transition-colors hover:text-[var(--gold)] sm:h-36 sm:w-36"
            >
              <RotatingRing className="absolute inset-0" />
              <span className="px-6">
                Let&rsquo;s Build
                <br />
                Something
                <br />
                Together →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
