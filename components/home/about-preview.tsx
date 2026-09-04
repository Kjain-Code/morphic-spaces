import Link from "next/link";
import { Section } from "@/components/ui/section";
import { PlaceholderBox } from "@/components/ui/placeholder-box";

export function AboutPreview() {
  return (
    <Section eyebrow="About Us">
      <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
        <PlaceholderBox label="Studio photography — content will be inserted from client" className="aspect-[4/5]" />
        <div>
          <h2 className="font-serif text-3xl font-light leading-[1.15] text-[var(--ink)] sm:text-4xl">
            Good design begins with understanding.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[var(--ink-muted)] sm:text-base">
            We believe good design begins with understanding the people, purpose and context of a space. Our
            approach combines functionality, proportion, materiality and detail to create spaces that feel
            considered, distinctive and timeless.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-3 border border-dashed border-[var(--ink-20)] px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ink-muted)] transition-colors hover:border-black/40 hover:text-[var(--ink)]"
          >
            Discover Morphic Spaces
          </Link>
        </div>
      </div>
    </Section>
  );
}
