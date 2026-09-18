"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fraunces } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Projects page's closing statement — reworked into a two-column layout
 * (a real project photo with a vertical label on the left, the studio's
 * closing line with a gold italic emphasis and the Services CTA on the
 * right) matching the client's reference, in place of the previous
 * centered, imageless slab. Still one CTA, pointing to /services — no
 * duplicated Services content here.
 */
export function ProjectsClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden border-t border-[var(--ivory-10)] bg-[var(--charcoal)]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative min-h-[45vh] overflow-hidden lg:col-span-6 lg:min-h-[34rem]">
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.4, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src="/images/projects/karnal-modern-concept.jpg"
              alt="A modern residence concept in Karnal, architectural detail"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "60% 25%" }}
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(255deg, var(--charcoal) 0%, transparent 18%), linear-gradient(0deg, rgba(23,22,20,0.35) 0%, transparent 40%)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase leading-[1.9] tracking-[0.3em] text-[var(--ivory-55)] sm:block"
          >
            Craft
            <br />
            Materials
            <br />
            People
            <br />
            Possibilities
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: EASE }}
          className="flex flex-col justify-center px-6 py-20 sm:px-10 sm:py-28 lg:col-span-6 lg:py-32"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">The Work Continues</p>
          <h2
            className={`${fraunces.className} mt-6 max-w-lg text-3xl font-light leading-[1.2] tracking-tight text-[var(--ivory-90)] sm:text-4xl lg:text-5xl`}
          >
            Design is not just built. It is <em className="italic text-[var(--gold)]">experienced.</em>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
            At Morphic Spaces, we approach every project as an opportunity to create environments that feel
            purposeful, distinctive and enduring.
          </p>

          <Link
            href="/services"
            className="group mt-10 inline-flex w-fit items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold-40)] text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
            Explore Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
