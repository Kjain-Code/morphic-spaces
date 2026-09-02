import { Section } from "@/components/ui/section";
import { PlaceholderBox } from "@/components/ui/placeholder-box";

const SERVICE_SLOTS = ["01", "02", "03"];

export function ServicesPreview() {
  return (
    <Section eyebrow="Services">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {SERVICE_SLOTS.map((number) => (
          <div key={number} className="border-t border-[var(--ink-10)] pt-6">
            <span className="font-serif text-3xl font-light text-[var(--ink-muted)]">{number}</span>
            <PlaceholderBox label="Content will be inserted from client" className="mt-4 aspect-[3/2]" />
          </div>
        ))}
      </div>
    </Section>
  );
}
