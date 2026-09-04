import { Section } from "@/components/ui/section";

export function IntroSection() {
  return (
    <Section eyebrow="Studio">
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-12 sm:gap-6">
        <h2 className="font-serif text-4xl font-light leading-[1.1] text-[var(--ink)] sm:col-span-7 sm:text-5xl lg:text-6xl">
          Designing spaces
          <br />
          with intention.
        </h2>
        <p className="self-end text-sm leading-relaxed text-[var(--ink-muted)] sm:col-span-4 sm:col-start-9 sm:text-base">
          Morphic Spaces is a contemporary spatial design studio creating thoughtful environments for living,
          working and experiencing. We focus on functional planning, refined materiality and attention to detail
          to give every space its own character.
        </p>

        <p className="font-serif text-xl font-light leading-relaxed text-[var(--ink)] sm:col-span-6 sm:col-start-1 sm:text-2xl lg:col-span-5">
          We believe good design begins with understanding the people, purpose and context of a space.
        </p>
        <p className="self-end text-sm leading-relaxed text-[var(--ink-muted)] sm:col-span-5 sm:col-start-8 sm:text-base">
          Our approach combines functionality, proportion, materiality and detail to create spaces that feel
          considered, distinctive and timeless.
        </p>
      </div>
    </Section>
  );
}
