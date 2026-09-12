"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fraunces } from "@/lib/fonts";
import type { Project } from "@/components/projects/project-data";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";

/**
 * "Featured Project" — a single project (the studio's own first, "The
 * Courtyard House") given a large cinematic moment of its own between the
 * grid and the closing CTA. Pinned via plain CSS `position: sticky` and
 * `useScroll`'s element-relative progress — not GSAP `pin: true` — for the
 * same reason documented in about/architectural-assembly.tsx: pinning that
 * reparents the DOM has previously crashed React's unmount on client-side
 * route navigation. The image settles from a slight zoom and the title
 * builds in three staged words as the section scrolls through, rather than
 * everything appearing at once.
 */
export function FeaturedProject({ project }: { project: Project }) {
  const prefersReducedMotion = useIsReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const wordOneOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const wordTwoOpacity = useTransform(scrollYProgress, [0.22, 0.38], [0, 1]);
  const wordThreeOpacity = useTransform(scrollYProgress, [0.4, 0.56], [0, 1]);
  const detailsOpacity = useTransform(scrollYProgress, [0.6, 0.78], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.6, 0.78], [16, 0]);

  const [wordOne, wordTwo, ...rest] = project.title.split(" ");
  const wordThree = rest.join(" ");

  if (prefersReducedMotion) {
    return (
      <section className="relative border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-24 sm:px-10 sm:py-32">
        <StaticFeatured project={project} />
      </section>
    );
  }

  return (
    <section ref={wrapperRef} className="relative h-[220vh] w-full border-t border-[var(--ivory-10)]">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[var(--charcoal)]">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.category} project in ${project.location}`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/50 to-[var(--charcoal)]/20"
        />

        <div className="absolute inset-x-6 top-10 sm:inset-x-10 sm:top-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">Featured Project</span>
        </div>

        <div className="absolute inset-x-6 bottom-10 flex flex-col gap-8 sm:inset-x-10 sm:bottom-14 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className={`${fraunces.className} max-w-2xl text-5xl font-light uppercase leading-[0.98] tracking-tight text-[var(--ivory-90)] sm:text-7xl lg:text-8xl`}
          >
            <motion.span style={{ opacity: wordOneOpacity }} className="block">
              {wordOne}
            </motion.span>
            <motion.span style={{ opacity: wordTwoOpacity }} className="block">
              {wordTwo}
            </motion.span>
            {wordThree && (
              <motion.span style={{ opacity: wordThreeOpacity }} className="block text-[var(--gold)]">
                {wordThree}
              </motion.span>
            )}
          </h2>

          <motion.div style={{ opacity: detailsOpacity, y: detailsY }} className="max-w-xs lg:text-right">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-55)]">
              {project.location}
              <br />
              {project.year}
              <br />
              {project.category}
            </p>
            <Link
              href={`/projects/${project.id}`}
              className="group mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--gold)] lg:justify-end"
            >
              View Full Project
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StaticFeatured({ project }: { project: Project }) {
  const [wordOne, wordTwo, ...rest] = project.title.split(" ");
  const wordThree = rest.join(" ");
  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9]">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category} project in ${project.location}`}
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/40 to-transparent" />
      </div>
      <div className="absolute inset-x-6 top-8 sm:inset-x-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">Featured Project</span>
      </div>
      <div className="absolute inset-x-6 bottom-8 flex flex-col gap-6 sm:inset-x-10 lg:flex-row lg:items-end lg:justify-between">
        <h2 className={`${fraunces.className} text-4xl font-light uppercase leading-[0.98] tracking-tight text-[var(--ivory-90)] sm:text-6xl`}>
          {wordOne} {wordTwo} <span className="text-[var(--gold)]">{wordThree}</span>
        </h2>
        <div className="max-w-xs lg:text-right">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-55)]">
            {project.location} · {project.year} · {project.category}
          </p>
          <Link
            href={`/projects/${project.id}`}
            className="group mt-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--gold)] lg:justify-end"
          >
            View Full Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
