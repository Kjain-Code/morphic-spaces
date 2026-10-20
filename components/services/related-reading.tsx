import Image from "next/image";
import Link from "next/link";
import { fraunces } from "@/lib/fonts";
import { BLOG_POSTS, readingMinutes } from "@/lib/blog-posts";
import type { Service } from "@/lib/services-data";

/**
 * "From the journal" strip on each service page — links the service to the
 * journal article written for it, so service ↔ article link both ways.
 */
export function RelatedReading({ service }: { service: Service }) {
  const post = BLOG_POSTS.find((candidate) => candidate.serviceSlug === service.slug);
  if (!post) return null;

  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-16 sm:px-10 sm:py-20">
      <Link href={`/blog/${post.slug}`} className="group mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 sm:grid-cols-12 sm:gap-10">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[var(--graphite)] sm:col-span-5">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            sizes="(min-width: 640px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
        <div className="sm:col-span-7">
          <span className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            From the journal
            <span aria-hidden="true" className="h-px w-10 bg-[var(--gold-40)]" />
          </span>
          <h2 className={`${fraunces.className} mt-5 text-3xl font-light leading-[1.12] text-[var(--ivory-90)] transition-colors group-hover:text-[var(--gold)] sm:text-4xl`}>
            {post.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--ivory-55)]">{post.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[var(--ivory-70)]">
            Read · {readingMinutes(post)} min
            <span className="text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </section>
  );
}
