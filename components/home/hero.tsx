"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

// TEMP — visual placeholder only. Swap for final client-provided hero
// photography once available; nothing else in this file needs to change.
const PLACEHOLDER_IMAGE_SRC = "/images/loading/1st.png";

export interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
  eyebrow?: string;
  headline?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Full-viewport homepage hero. Every piece of copy is optional and falls
 * back to a clearly-marked placeholder, so this can be handed real client
 * content later by passing props — no restructuring required.
 */
export function Hero({
  imageSrc = PLACEHOLDER_IMAGE_SRC,
  imageAlt = "Placeholder architectural photography",
  eyebrow = "Eyebrow — awaiting client copy",
  headline = "Hero headline placeholder",
  description = "Hero description placeholder — final copy will be provided by the client.",
  ctaLabel = "CTA label",
  ctaHref = "#",
}: HeroProps) {
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 700], [1, 1.08]);
  const imageY = useTransform(scrollY, [0, 700], [0, 90]);
  const indicatorOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <section className="relative flex h-dvh w-full items-end overflow-hidden bg-[var(--stage)]">
      <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
        <Image src={imageSrc} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      {/* Scrim for text legibility: flat tint plus a directional lift at the base. */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

      <div className="relative z-10 w-full px-6 pb-24 sm:px-10 sm:pb-28 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <span className="mb-5 inline-block text-[10px] uppercase tracking-[0.35em] text-white/35">
            Placeholder content — pending client copy
          </span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">{eyebrow}</p>
            <h1 className="mt-6 font-serif text-4xl font-light leading-[1.08] text-white/85 sm:text-6xl lg:text-7xl">
              {headline}
            </h1>
            <p className="mt-6 max-w-md text-sm text-white/45 sm:text-base">{description}</p>
            <a
              href={ctaHref}
              className="mt-10 inline-flex items-center gap-3 border border-dashed border-white/30 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-white/65 transition-colors hover:border-white/60 hover:text-white"
            >
              {ctaLabel}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-white/70"
          />
        </span>
      </motion.div>
    </section>
  );
}
