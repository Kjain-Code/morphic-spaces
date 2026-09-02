export interface RoutePlaceholderProps {
  title: string;
}

/**
 * Minimal structural shell for a not-yet-built route: page title plus a
 * clearly marked "content pending" note. Not a finished page — just enough
 * to make the route navigable while its real content is designed later.
 */
export function RoutePlaceholder({ title }: RoutePlaceholderProps) {
  return (
    <main className="min-h-dvh bg-[var(--surface)] px-6 pt-36 pb-32 sm:px-10 sm:pt-44">
      <div className="mx-auto max-w-4xl">
        <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--ink-muted)]">Coming soon</span>
        <h1 className="mt-6 font-serif text-4xl font-light text-[var(--ink)] sm:text-5xl">{title}</h1>
        <p className="mt-8 inline-block border border-dashed border-[var(--ink-20)] bg-[var(--ink-faint)] px-6 py-4 text-sm text-[var(--ink-muted)]">
          Content will be inserted from client.
        </p>
      </div>
    </main>
  );
}
