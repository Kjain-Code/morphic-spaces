import Image from "next/image";

export interface LogoMarkProps {
  className?: string;
  priority?: boolean;
}

/**
 * The Morphic Spaces logomark, treated to sit cleanly on dark surfaces.
 *
 * The source PNG has a light card baked in behind the mark. Inverting the
 * image, then compositing it with `screen`, turns that light card dark (so
 * it recedes into whatever dark surface it's placed on) while the black
 * mark turns light (so it reads clearly) — no visible white rectangle. A
 * soft radial mask fades the far edges as a safety net against any
 * residual edge.
 *
 * Intended for dark/near-black backgrounds only (the loading screen, the
 * navbar). Sizing is controlled entirely via `className` (e.g. `w-9`) —
 * intrinsic width/height are just the source aspect ratio (2:3).
 */
export function LogoMark({ className, priority = false }: LogoMarkProps) {
  return (
    <Image
      src="/images/logo/logo.png"
      alt="Morphic Spaces"
      width={1024}
      height={1536}
      priority={priority}
      className={className}
      style={{
        filter: "invert(1)",
        mixBlendMode: "screen",
        WebkitMaskImage: "radial-gradient(closest-side, black 62%, transparent 100%)",
        maskImage: "radial-gradient(closest-side, black 62%, transparent 100%)",
      }}
    />
  );
}
