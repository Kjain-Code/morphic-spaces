"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fraunces } from "@/lib/fonts";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";
import type { BlogBlock, BlogPost } from "@/lib/blog-posts";
import type { BlogCardData } from "@/components/blog/blog-index";
import { RichText } from "@/components/blog/rich-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.22, 1, 0.36, 1] as const;
const BODY_LINK =
  "text-[var(--charcoal)] underline decoration-[var(--bronze)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--bronze)]";

export interface ArticleProject {
  id: string;
  title: string;
  image: string;
  location: string;
  category: string;
}

export interface BlogArticleProps {
  post: BlogPost;
  minutes: number;
  date: string;
  service?: { slug: string; title: string; tagline: string };
  projects: ArticleProject[];
  moreArticles: BlogCardData[];
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.4} className={className} aria-hidden="true">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useIsReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeadlineLine({ children, delay }: { children: ReactNode; delay: number }) {
  const reduced = useIsReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: reduced ? 0 : 0.9, ease: EASE, delay: reduced ? 0 : delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Splits a title into two balanced lines for the masked line-by-line reveal. */
function splitTitle(title: string): string[] {
  const words = title.split(" ");
  if (words.length < 4) return [title];
  const half = Math.ceil(title.length / 2);
  let count = 0;
  let cut = 0;
  for (let i = 0; i < words.length; i++) {
    count += words[i].length + 1;
    if (count >= half) {
      cut = i + 1;
      break;
    }
  }
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")].filter(Boolean);
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-6 text-[1.05rem] leading-[1.85] text-[#3a352f] sm:text-lg">
          <RichText text={block.text} linkClassName={BODY_LINK} />
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className={`${fraunces.className} mt-16 scroll-mt-28 text-3xl font-light leading-[1.15] text-[var(--charcoal)] sm:text-[2.35rem]`}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--charcoal)]">{block.text}</h3>;
    case "list":
      return (
        <ul className="mt-7 space-y-4 border-l border-[var(--bronze-30)] pl-6">
          {block.items.map((item) => (
            <li key={item} className="relative text-[1.02rem] leading-[1.75] text-[#3a352f] sm:text-[1.06rem]">
              <span aria-hidden="true" className="absolute -left-[1.85rem] top-[0.78em] h-px w-3 bg-[var(--bronze)]" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <Reveal>
          <blockquote className="relative my-14 border-y border-[var(--charcoal-10)] py-10 sm:px-6">
            <span aria-hidden="true" className={`${fraunces.className} absolute -top-7 left-0 text-7xl leading-none text-[var(--bronze)] sm:left-4`}>
              &ldquo;
            </span>
            <p className={`${fraunces.className} text-2xl font-light italic leading-[1.35] text-[var(--charcoal)] sm:text-[2rem]`}>{block.text}</p>
          </blockquote>
        </Reveal>
      );
    case "image":
      return <ArticleImage block={block} />;
    case "callout":
      return (
        <Reveal>
          <aside className="mt-14 rounded-xl border border-[var(--bronze-30)] bg-[var(--stone-warm)]/40 p-7 sm:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--bronze)]">{block.title}</p>
            <p className="mt-4 text-base leading-relaxed text-[var(--charcoal)]">{block.text}</p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[var(--charcoal)] transition-colors hover:text-[var(--bronze)]"
            >
              Start a conversation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </aside>
        </Reveal>
      );
  }
}

/** Inline figure: clip-reveals on entry, and links to its project when it belongs to one. */
function ArticleImage({ block }: { block: Extract<BlogBlock, { type: "image" }> }) {
  const reduced = useIsReducedMotion();
  const media = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[var(--stone-warm)]">
      <motion.div
        initial={reduced ? false : { clipPath: "inset(12% 0 0 0)", scale: 1.06 }}
        whileInView={{ clipPath: "inset(0 0 0 0)", scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-0"
      >
        <Image src={block.src} alt={block.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </motion.div>
    </div>
  );

  return (
    <figure className="my-14 sm:-mx-6 lg:-mx-12">
      {block.projectId ? (
        <Link href={`/projects/${block.projectId}`} className="group block">
          {media}
        </Link>
      ) : (
        media
      )}
      <figcaption className="mt-4 flex items-start gap-3 px-1 text-xs leading-relaxed text-[var(--taupe)] sm:px-6 lg:px-12">
        <span aria-hidden="true" className="mt-[0.55em] h-px w-6 shrink-0 bg-[var(--bronze)]" />
        {block.caption}
      </figcaption>
    </figure>
  );
}

/** Desktop-only sticky contents list; highlights whichever section is currently being read. */
function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="In this article" className="sticky top-32">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--bronze)]">In this article</p>
      <ol className="mt-6 space-y-1 border-l border-[var(--charcoal-10)]">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-indicator"
                  className="absolute -left-px top-0 h-full w-px bg-[var(--charcoal)]"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              <a
                href={`#${item.id}`}
                className={`flex gap-3 py-2 pl-5 text-[13px] leading-snug transition-colors ${
                  isActive ? "text-[var(--charcoal)]" : "text-[var(--taupe)] hover:text-[var(--charcoal)]"
                }`}
              >
                <span className="text-[10px] tabular-nums text-[var(--bronze)]">{String(index + 1).padStart(2, "0")}</span>
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * A single journal article. GSAP ScrollTrigger (sharing Lenis's loop via
 * SmoothScrollProvider) drives the two scroll-linked effects — the hero
 * image's parallax drift and the gold reading-progress line — while Motion
 * handles the mount and in-view reveals, matching the rest of the site.
 * Both GSAP effects are skipped for reduced-motion visitors.
 */
export function BlogArticle({ post, minutes, date, service, projects, moreArticles }: BlogArticleProps) {
  const reduced = useIsReducedMotion();
  const heroImageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const toc = post.body.filter((block): block is Extract<BlogBlock, { type: "h2" }> => block.type === "h2");

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: heroImageRef.current.parentElement, start: "top top", end: "bottom top", scrub: true },
        });
      }
      if (progressRef.current && bodyRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: bodyRef.current, start: "top 70%", end: "bottom 60%", scrub: 0.3 },
          },
        );
      }
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
        <div ref={progressRef} className="h-full origin-left scale-x-0 bg-[var(--gold)]" />
      </div>

      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-[var(--charcoal)] sm:min-h-dvh">
        <div ref={heroImageRef} className="absolute inset-x-0 -top-[8%] h-[116%]">
          <motion.div
            initial={{ scale: reduced ? 1 : 1.12, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reduced ? 0 : 1.8, ease: EASE }}
            className="absolute inset-0"
          >
            <Image src={post.heroImage} alt={post.heroAlt} fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(23,22,20,0.96) 0%, rgba(23,22,20,0.7) 32%, rgba(23,22,20,0.15) 68%, rgba(23,22,20,0.45) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-36 sm:px-10 sm:pb-20 lg:px-16">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
          >
            <ol className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em]">
              <li>
                <Link href="/blog" className="text-[var(--ivory-55)] transition-colors hover:text-[var(--gold)]">
                  Journal
                </Link>
              </li>
              <li aria-hidden="true" className="h-px w-8 bg-[var(--gold-40)]" />
              <li className="font-semibold text-[var(--gold)]">{post.category}</li>
            </ol>
          </motion.nav>

          <h1
            className={`${fraunces.className} mt-8 max-w-5xl text-[clamp(2.3rem,5.4vw,5.2rem)] font-light leading-[1.02] tracking-[-0.03em] text-[var(--ivory-90)]`}
          >
            {splitTitle(post.title).map((line, index) => (
              <HeadlineLine key={line} delay={0.15 + index * 0.12}>
                {line}
              </HeadlineLine>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : 0.5 }}
            className="mt-10 flex flex-col gap-6 border-t border-[var(--ivory-20)] pt-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-xl text-sm leading-relaxed text-[var(--ivory-70)] sm:text-base">{post.excerpt}</p>
            <dl className="flex shrink-0 gap-8 text-[10px] uppercase tracking-[0.26em]">
              <div>
                <dt className="text-[var(--ivory-45)]">Published</dt>
                <dd className="mt-2 text-[var(--ivory-90)]">
                  <time dateTime={post.publishedAt}>{date}</time>
                </dd>
              </div>
              <div>
                <dt className="text-[var(--ivory-45)]">Reading</dt>
                <dd className="mt-2 text-[var(--ivory-90)]">{minutes} min</dd>
              </div>
              <div>
                <dt className="text-[var(--ivory-45)]">By</dt>
                <dd className="mt-2 text-[var(--ivory-90)]">Morphic Spaces</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--ivory)] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="hidden lg:col-span-3 lg:block">
            <TableOfContents items={toc} />
          </aside>
          <article ref={bodyRef} className="lg:col-span-7 lg:col-start-5">
            {post.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </article>
        </div>
      </section>

      {service && (
        <section className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-24">
          <Reveal className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                Related service
                <span aria-hidden="true" className="h-px w-10 bg-[var(--gold-40)]" />
              </span>
              <h2 className={`${fraunces.className} mt-6 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-5xl`}>{service.title}</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">{service.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/services/${service.slug}`}
                className="group inline-flex items-center gap-4 rounded-full border border-[var(--gold-40)] px-7 py-4 text-[10px] uppercase tracking-[0.28em] text-[var(--ivory-90)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                Explore the service
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 rounded-full bg-[var(--gold)] px-7 py-4 text-[10px] uppercase tracking-[0.28em] text-[var(--charcoal)] transition-colors hover:bg-[var(--gold-dark)]"
              >
                Talk to the studio
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      {projects.length > 0 && (
        <section className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                  From our work
                  <span aria-hidden="true" className="h-px w-10 bg-[var(--gold-40)]" />
                </span>
                <h2 className={`${fraunces.className} mt-5 text-4xl font-light leading-[1.05] text-[var(--ivory-90)] sm:text-5xl`}>Seen In Practice.</h2>
              </div>
              <Link href="/projects" className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-[var(--ivory-70)] hover:text-[var(--gold)]">
                View all projects →
              </Link>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.1}>
                  <Link href={`/projects/${project.id}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--charcoal)]">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.category.toLowerCase()} project by Morphic Spaces`}
                        fill
                        sizes="(min-width: 640px) 31vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 group-hover:-translate-y-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">{project.category}</span>
                        <h3 className="mt-2 text-xl font-light text-[var(--ivory-90)]">{project.title}</h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--ivory-55)]">{project.location}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {moreArticles.length > 0 && (
        <section className="bg-[var(--ivory)] px-6 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--bronze)]">
                  Keep reading
                  <span aria-hidden="true" className="h-px w-10 bg-[var(--bronze-30)]" />
                </span>
                <h2 className={`${fraunces.className} mt-5 text-4xl font-light leading-[1.05] text-[var(--charcoal)] sm:text-5xl`}>More From The Journal.</h2>
              </div>
              <Link href="/blog" className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-[var(--taupe)] hover:text-[var(--charcoal)]">
                All articles →
              </Link>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
              {moreArticles.map((card, index) => (
                <Reveal key={card.post.slug} delay={index * 0.1}>
                  <Link href={`/blog/${card.post.slug}`} className="group grid grid-cols-5 items-center gap-6">
                    <div className="relative col-span-2 aspect-square overflow-hidden rounded-xl bg-[var(--stone-warm)]">
                      <Image
                        src={card.post.heroImage}
                        alt={card.post.heroAlt}
                        fill
                        sizes="(min-width: 768px) 18vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="col-span-3">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--bronze)]">
                        {card.post.category} · {card.minutes} min read
                      </p>
                      <h3 className={`${fraunces.className} mt-3 text-xl font-light leading-[1.2] text-[var(--charcoal)] transition-colors group-hover:text-[var(--bronze)] sm:text-2xl`}>
                        {card.post.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
