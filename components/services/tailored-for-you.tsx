"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { fraunces } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Designed for every way of living." — a breathing mid-page moment between
 * the service grid and the studio's design principles: a real photograph on
 * the left, a short statement and a circular rotating pull-quote on the
 * right, echoing the same rotating-ring motif used on About/Projects
 * closings rather than inventing a new one.
 */
export function TailoredForYou() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(8% 0 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-xl lg:col-span-5"
        >
          <Image
            src="/images/projects/karnal-stone-concept.jpg"
            alt="A Morphic Spaces residence concept in Karnal, considered down to the last detail"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
        </motion.div>

        <div className="relative lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">Tailored For You</span>
            <h2
              className={`${fraunces.className} mt-6 max-w-lg text-3xl font-light leading-[1.15] tracking-tight text-[var(--ivory-90)] sm:text-4xl lg:text-5xl`}
            >
              Designed for every
              <br />
              way of <em className="italic text-[var(--gold)]">living.</em>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
              No two clients live the same way, so no two homes should look the same either. Whichever service
              brings you to us, the process is shaped around how you actually live — not a template we repeat.
            </p>

            <Link
              href="/projects"
              className="group mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold-40)] text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
              View Our Projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="pointer-events-none absolute -right-2 top-0 hidden h-40 w-40 items-center justify-center sm:flex"
          >
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={prefersReducedMotion ? undefined : { duration: 24, ease: "linear", repeat: Infinity }}
            >
              <defs>
                <path id="tailored-quote-circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
              </defs>
              <text className="fill-[var(--ivory-45)] text-[10px] uppercase tracking-[0.25em]">
                <textPath href="#tailored-quote-circle" startOffset="0%">
                  Designing a more human tomorrow · Designing a more human tomorrow ·
                </textPath>
              </text>
            </motion.svg>
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold-30)] text-[var(--gold)]">
              ✦
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
