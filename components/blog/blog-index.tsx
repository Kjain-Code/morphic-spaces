"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";
import type { BlogPost } from "@/lib/blog-posts";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface BlogCardData {
  post: BlogPost;
  minutes: number;
  date: string;
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} className={className} aria-hidden="true">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function Meta({ card, tone = "dark" }: { card: BlogCardData; tone?: "dark" | "light" }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.22em] ${
        tone === "light" ? "text-[var(--ivory-55)]" : "text-[var(--taupe)]"
      }`}
    >
      <span className={tone === "light" ? "text-[var(--gold)]" : "text-[var(--bronze)]"}>{card.post.category}</span>
      <span aria-hidden="true">·</span>
      <span>{card.minutes} min read</span>
      <span aria-hidden="true">·</span>
      <time dateTime={card.post.publishedAt}>{card.date}</time>
    </p>
  );
}

/** Image that unfolds open as it enters the viewport, then scales gently on hover (same language as the Projects grid). */
function RevealImage({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  const reduced = useIsReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { clipPath: "inset(14% 0 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="absolute inset-0"
    >
      <motion.div
        initial={reduced ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

function FeaturedCard({ card }: { card: BlogCardData }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <Link
        href={`/blog/${card.post.slug}`}
        className="group grid grid-cols-1 overflow-hidden rounded-xl bg-[var(--charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] lg:grid-cols-12"
      >
        <div className="relative aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[30rem]">
          <RevealImage src={card.post.heroImage} alt={card.post.heroAlt} sizes="(min-width: 1024px) 58vw, 100vw" />
          <span className="absolute left-5 top-5 rounded-full border border-[var(--gold-40)] bg-[rgba(23,22,20,0.55)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--gold)] backdrop-blur-sm">
            Featured
          </span>
        </div>
        <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5 lg:p-12">
          <div>
            <Meta card={card} tone="light" />
            <h2 className={`${fraunces.className} mt-6 text-3xl font-light leading-[1.1] text-[var(--ivory-90)] sm:text-4xl lg:text-[2.6rem]`}>
              {card.post.title}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">{card.post.excerpt}</p>
          </div>
          <span className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[var(--ivory-70)] transition-colors group-hover:text-[var(--gold)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold-40)] text-[var(--gold)] transition-transform duration-300 group-hover:rotate-45">
              <ArrowIcon />
            </span>
            Read the article
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function ArticleCard({ card, index }: { card: BlogCardData; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 3) * 0.06 }}
    >
      <Link
        href={`/blog/${card.post.slug}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bronze)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--stone-warm)]">
          <RevealImage src={card.post.heroImage} alt={card.post.heroAlt} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" />
          <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ivory)] text-[var(--charcoal)] opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
            <ArrowIcon />
          </span>
        </div>
        <div className="mt-6 border-t border-[var(--charcoal-10)] pt-5">
          <Meta card={card} />
          <h3 className={`${fraunces.className} mt-4 text-2xl font-light leading-[1.2] text-[var(--charcoal)] transition-colors group-hover:text-[var(--bronze)]`}>
            {card.post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--taupe)]">{card.post.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
}

/**
 * The journal listing: one featured article, then a filterable grid of the
 * rest. Filtering is purely client-side — every article card is in the
 * server-rendered HTML on first load ("All"), so crawlers see every link.
 */
export function BlogIndex({ cards }: { cards: BlogCardData[] }) {
  const [active, setActive] = useState("All");
  const categories = useMemo(() => ["All", ...cards.map((card) => card.post.category)], [cards]);
  // The first article is also highlighted as "Featured" above the grid, but
  // the grid itself always lists every article under "All" (6 = two full rows).
  const featured = cards[0];
  const visible = active === "All" ? cards : cards.filter((card) => card.post.category === active);

  return (
    <section id="articles" className="scroll-mt-24 bg-[var(--ivory)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--bronze)]">
              Latest from the studio
              <span aria-hidden="true" className="h-px w-10 bg-[var(--bronze-30)]" />
            </span>
            <h2 className={`${fraunces.className} mt-5 max-w-2xl text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-5xl`}>
              Thinking Behind The Work.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--taupe)]">
            One guide for each part of what we do — from planning a new home to renovating an old one.
          </p>
        </motion.div>

        <div className="mt-14">{featured && <FeaturedCard card={featured} />}</div>

        <div className="mt-16 flex flex-wrap gap-2 border-b border-[var(--charcoal-10)] pb-6" role="group" aria-label="Filter articles by topic">
          {categories.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={isActive}
                className={`relative rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.22em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bronze)] ${
                  isActive ? "text-[var(--ivory)]" : "text-[var(--taupe)] hover:text-[var(--charcoal)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="blog-filter-pill"
                    className="absolute inset-0 rounded-full bg-[var(--charcoal)]"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((card, index) => (
              <ArticleCard key={card.post.slug} card={card} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
