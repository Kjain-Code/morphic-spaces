import Image from "next/image";

export interface LogoMarkProps {
  className?: string;
  priority?: boolean;
}

/**
 * The Morphic Spaces logomark.
 *
 * `logo-mark-white.png` is a pre-processed asset, not the raw brand file:
 * the source (`logo/logo.png`) is a tall 1024×1536 canvas with the actual
 * "M | S — MORPHIC SPACES" mark occupying only a small centered fraction of
 * it, sitting on a light faceted-paper texture. Displayed directly at
 * navbar scale, that wasted canvas made the mark unreadably tiny, and the
 * previous invert()+screen-blend treatment (turning the paper texture dark
 * so it "receded") left a faint textured smudge around it instead of a
 * clean edge. This asset is cropped tight to the mark and its luminance
 * matted straight to white-on-transparent (dark glyph → opaque white,
 * light background → fully transparent), so the whole image is the mark —
 * no invisible padding — and it composites cleanly onto dark surfaces with
 * no filter/blend-mode tricks needed.
 *
 * Intended for dark/near-black backgrounds only (the loading screen, the
 * navbar, the footer) since the mark is baked white. Size via `className`
 * — prefer a height utility (`h-8`) with `w-auto` given the mark's wide
 * (696:399) aspect ratio, rather than constraining by width.
 */
export function LogoMark({ className, priority = false }: LogoMarkProps) {
  return (
    <Image
      src="/images/logo/logo-mark-white.png"
      alt="Morphic Spaces"
      width={696}
      height={399}
      priority={priority}
      className={className}
    />
  );
}
