import { Section } from "@/components/ui/section";
import { PlaceholderBox } from "@/components/ui/placeholder-box";

const RECOGNITION_SLOTS = Array.from({ length: 4 }, (_, i) => `Recognition ${String(i + 1).padStart(2, "0")}`);

export function RecognitionPreview() {
  return (
    <Section eyebrow="Recognition">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {RECOGNITION_SLOTS.map((label) => (
          <PlaceholderBox key={label} label={label} className="aspect-[3/2]" />
        ))}
      </div>
    </Section>
  );
}
