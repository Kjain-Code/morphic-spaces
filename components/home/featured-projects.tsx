"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { PlaceholderBox } from "@/components/ui/placeholder-box";

interface ProjectSlot {
  label: string;
  aspect: string;
}

const FEATURED: ProjectSlot = {
  label: "Featured project — content will be inserted from client",
  aspect: "aspect-[4/3]",
};

const SECONDARY: ProjectSlot[] = [
  { label: "Project 02 — content will be inserted from client", aspect: "aspect-[4/5]" },
  { label: "Project 03 — content will be inserted from client", aspect: "aspect-[4/5]" },
];

function ProjectCard({ slot, className = "" }: { slot: ProjectSlot; className?: string }) {
  return (
    <div className={className}>
      <motion.div
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <PlaceholderBox label={slot.label} className={slot.aspect} />
      </motion.div>
      <div className="mt-4 flex items-baseline justify-between border-t border-[var(--ink-10)] pt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        <span>Project name</span>
        <span>Location · Type · Year</span>
      </div>
    </div>
  );
}

/**
 * Asymmetric editorial showcase: one large featured project alongside two
 * smaller ones stacked beside it, rather than a uniform card grid.
 */
export function FeaturedProjects() {
  return (
    <Section eyebrow="Featured Projects">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-12 sm:gap-6">
        <ProjectCard slot={FEATURED} className="sm:col-span-7" />
        <div className="flex flex-col gap-10 sm:col-span-5 sm:gap-14">
          {SECONDARY.map((slot) => (
            <ProjectCard key={slot.label} slot={slot} />
          ))}
        </div>
      </div>
    </Section>
  );
}
