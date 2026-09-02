export interface PlaceholderBoxProps {
  label: string;
  className?: string;
}

/**
 * A dashed-outline stand-in for future imagery/content. Deliberately reads
 * as unfinished — not meant to ship as-is, only to establish layout rhythm
 * until the client provides real assets.
 */
export function PlaceholderBox({ label, className = "" }: PlaceholderBoxProps) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-[var(--ink-20)] bg-[var(--ink-faint)] px-4 py-10 text-center text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] ${className}`}
    >
      {label}
    </div>
  );
}
