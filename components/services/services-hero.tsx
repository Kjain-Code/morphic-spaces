"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Masks and slides one headline line up on mount — see AboutHero/ProjectsHero for why this animates on mount rather than on scroll-into-view for above-the-fold content. */
function HeadlineLine({ children, delay, prefersReducedMotion }: { children: ReactNode; delay: number; prefersReducedMotion: boolean }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: EASE, delay: prefersReducedMotion ? 0 : delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/** The Services page's opening statement — two-column split matching Home/About/Projects' own hero pattern: headline reveal left, real photo right with editorial labels. */
export function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useIsReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-[var(--charcoal)] text-[var(--ivory-90)]">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.8, ease: EASE }}
        className="pointer-events-none absolute inset-0 bg-[var(--graphite)]"
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 gap-12 px-6 pb-14 pt-28 sm:px-10 sm:pb-20 sm:pt-36 lg:grid-cols-12 lg:items-center lg:gap-0 lg:pb-12 lg:pt-24">
        <motion.div style={{ y: prefersReducedMotion ? 0 : textY }} className="relative z-10 lg:col-span-6 lg:pr-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]"
          >
            Our Services
            <span aria-hidden="true" className="h-px w-10 bg-[var(--gold-40)]" />
          </motion.p>

          <h1 className={`${fraunces.className} mt-7 max-w-xl text-3xl font-light uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl`}>
            <HeadlineLine delay={0.12} prefersReducedMotion={prefersReducedMotion}>Designing With Intent.</HeadlineLine>
            <HeadlineLine delay={0.26} prefersReducedMotion={prefersReducedMotion}>
              <span className="text-[var(--gold)]">Shaping Experiences.</span>
            </HeadlineLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.4 }}
            className="mt-8 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base"
          >
            At Morphic Spaces, we approach every project as an opportunity to create something distinctive, purposeful
            and timeless. From architecture and interiors to visualization and landscape, we integrate design
            thinking, functionality and material expression to create work that is both refined and enduring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : 0.5 }}
          >
            <Link
              href="#services"
              className="group mt-10 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)]"
            >
              Explore Our Services
              <span aria-hidden="true" className="text-lg text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[25rem] sm:min-h-[32rem] lg:col-span-6 lg:min-h-[38rem]">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.6, ease: EASE, delay: prefersReducedMotion ? 0 : 0.25 }}
            className="absolute inset-y-0 right-0 w-[84%] overflow-hidden sm:w-[78%]"
          >
            <motion.div style={{ y: prefersReducedMotion ? 0 : imageY }} className="absolute -inset-y-10 inset-x-0">
              <Image
                src="/images/services/service-render-1.png"
                alt="A Morphic Spaces residence facade, evening"
                fill
                sizes="(min-width: 1024px) 48vw, 90vw"
                className="object-cover"
                style={{ objectPosition: "50% 30%" }}
                priority
              />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: EASE, delay: prefersReducedMotion ? 0 : 0.85 }}
            className="absolute bottom-6 left-0 z-10 h-36 w-32 overflow-hidden border border-[var(--gold-30)] bg-[var(--graphite)] sm:bottom-10 sm:h-52 sm:w-44 lg:bottom-20"
          >
            <Image
              src="/images/services/service-render-2.png"
              alt="Architectural material detail"
              fill
              sizes="11rem"
              className="object-cover"
            />
          </motion.div>

          <motion.svg
            viewBox="0 0 620 620"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute -right-10 -top-10 h-[115%] w-[115%] text-[var(--gold-40)] sm:-right-16 sm:-top-16"
          >
            <motion.circle
              cx="310"
              cy="310"
              r="250"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeDasharray="3 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 2.2, ease: "easeInOut", delay: prefersReducedMotion ? 0 : 0.45 }}
            />
            <motion.path
              d="M80 112h110M80 112v110M540 508H430M540 508V398"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.4, ease: EASE, delay: prefersReducedMotion ? 0 : 0.7 }}
            />
          </motion.svg>

          <span className="absolute bottom-0 right-0 text-[10px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">01 / 06</span>
        </div>
      </div>
    </section>
  );
}
