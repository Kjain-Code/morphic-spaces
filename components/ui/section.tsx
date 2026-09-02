import type { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  eyebrow: string;
  children: ReactNode;
  className?: string;
}

/**
 * Shared rhythm — padding, warm surface, hairline divider, eyebrow label —
 * for every homepage content section below the hero. Each section supplies
 * its own inner layout as children.
 */
export function Section({ id, eyebrow, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`border-t border-[var(--ink-10)] bg-[var(--surface)] px-6 py-24 sm:px-10 sm:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--ink-muted)]">{eyebrow}</span>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
