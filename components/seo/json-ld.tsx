/**
 * Server-rendered JSON-LD. A plain <script> (not next/script) so the
 * structured data is part of the initial HTML that crawlers fetch — the
 * previous next/script version was only injected client-side after
 * hydration, so the static HTML contained no JSON-LD at all. `<` is escaped
 * per the Next.js JSON-LD guide so no string can close the script tag.
 */
export function JsonLd({ id, data }: { id: string; data: Record<string, unknown> }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
