/**
 * A faint procedural noise texture, same technique as the loading screen's
 * overlay (`components/loading-screen.tsx`) — an inline SVG fractal-noise
 * filter as a data URI, blended at low opacity. Gives the espresso-dark
 * sections a material, paper-grain quality instead of a flat color fill,
 * echoing the studio's own emphasis on materiality.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
