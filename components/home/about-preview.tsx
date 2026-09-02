import { Section } from "@/components/ui/section";
import { PlaceholderBox } from "@/components/ui/placeholder-box";

export function AboutPreview() {
  return (
    <Section eyebrow="About Us">
      <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
        <PlaceholderBox label="Content will be inserted from client" className="aspect-[4/5]" />
        <p className="border border-dashed border-[var(--ink-20)] bg-[var(--ink-faint)] px-6 py-8 text-sm leading-relaxed text-[var(--ink-muted)]">
          Content will be inserted from client.
        </p>
      </div>
    </Section>
  );
}
