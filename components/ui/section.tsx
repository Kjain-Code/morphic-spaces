"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export interface SectionProps {
  id?: string;
  eyebrow: string;
  children: ReactNode;
  className?: string;
}

/**
 * Shared rhythm — generous padding, warm surface, hairline divider, eyebrow
 * label, viewport-triggered reveal — for every homepage content section
 * below the hero. Each section supplies its own inner layout as children.
 */
export function Section({ id, eyebrow, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`border-t border-[var(--ink-10)] bg-[var(--surface)] px-6 py-24 sm:px-10 sm:py-32 lg:py-40 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl"
      >
        <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--ink-muted)]">{eyebrow}</span>
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  );
}
