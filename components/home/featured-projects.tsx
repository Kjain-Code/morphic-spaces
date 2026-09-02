import { Section } from "@/components/ui/section";
import { PlaceholderBox } from "@/components/ui/placeholder-box";

const PROJECT_SLOTS = ["Project 01", "Project 02", "Project 03"];

export function FeaturedProjects() {
  return (
    <Section eyebrow="Featured Projects">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {PROJECT_SLOTS.map((label) => (
          <PlaceholderBox
            key={label}
            label={`${label} — content will be inserted from client`}
            className="aspect-[4/5]"
          />
        ))}
      </div>
    </Section>
  );
}
