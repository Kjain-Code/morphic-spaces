"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { fraunces } from "@/lib/fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A slow, continuous rotation behind the pull-quote circle — a quiet ambient detail, not a call for attention. */
function RotatingRing() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <span aria-hidden="true" className="absolute inset-0 rounded-full border border-[var(--gold-30)]" />;
  }
  return (
    <motion.span
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      className="absolute inset-0 rounded-full border border-dashed border-[var(--gold-30)]"
    />
  );
}

/**
 * "Our Approach" — a new section between the journey stats and Why Choose
 * Us: a real project photo that slowly zooms as it scrolls into view beside
 * the studio's working method in three short declaratives, closing on a
 * circular pull-quote with a slow-rotating ring. New per the client's
 * reference (no prior equivalent existed on this page).
 */
export function OurApproach() {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1.05, 1.25]);

  return (
    <section ref={wrapperRef} className="relative overflow-hidden border-t border-[var(--ivory-10)] bg-[var(--charcoal)]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative min-h-[45vh] overflow-hidden lg:col-span-6 lg:min-h-[32rem]">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src="/images/loading/7th.png"
              alt="A Morphic Spaces interior, softly lit"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 60%" }}
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(23,22,20,0.35) 0%, transparent 40%)" }}
          />
        </div>

        <div className="relative flex flex-col justify-center gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:col-span-6 lg:flex-row lg:items-center lg:gap-10 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: EASE }}
            className="max-w-sm"
          >
            <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">Our Approach</span>
            <h2
              className={`${fraunces.className} mt-6 text-3xl font-light leading-[1.2] tracking-tight text-[var(--ivory-90)] sm:text-4xl`}
            >
              We study. We observe.
              <br />
              <em className="italic text-[var(--gold)]">We create.</em>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
              Guided by curiosity and careful observation, we study the site, understand the people and question
              the obvious — treating proportion, light and materiality as parts of one larger experience, not
              isolated choices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: EASE, delay: prefersReducedMotion ? 0 : 0.15 }}
            className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-[var(--gold-30)] sm:h-44 sm:w-44"
          >
            <RotatingRing />
            <p
              className={`${fraunces.className} px-6 text-center text-sm italic leading-snug text-[var(--ivory-70)]`}
            >
              Architecture is not about buildings. It&rsquo;s about people.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
