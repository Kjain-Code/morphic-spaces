import { Section } from "@/components/ui/section";

export function ContactCta() {
  return (
    <Section eyebrow="Contact" className="text-center">
      <div className="mx-auto max-w-xl">
        <p className="font-serif text-2xl font-light leading-snug text-[var(--ink)] sm:text-3xl">
          Content will be inserted from client.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-flex items-center gap-3 border border-dashed border-[var(--ink-20)] px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ink-muted)] transition-colors hover:border-black/40 hover:text-[var(--ink)]"
        >
          CTA label
        </a>
      </div>
    </Section>
  );
}
