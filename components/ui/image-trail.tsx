"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface TrailItem {
  id: number;
  src: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

type SizeTier = "mobile" | "tablet" | "desktop" | "large";

/** Fixed box per viewport tier — every image renders at exactly this size (object-fit: cover). */
const BOX_SIZE: Record<SizeTier, { width: number; height: number }> = {
  mobile: { width: 125, height: 165 },
  tablet: { width: 105, height: 138 },
  desktop: { width: 125, height: 165 },
  large: { width: 145, height: 190 },
};

function getSizeTier(viewportWidth: number): SizeTier {
  if (viewportWidth < 768) return "mobile";
  if (viewportWidth < 1024) return "tablet";
  if (viewportWidth < 1440) return "desktop";
  return "large";
}

export interface ImageTrailProps {
  /** Images cycled through, in order, as the pointer moves. */
  images: string[];
  /** Set false to stop spawning and let whatever is on screen clear out. */
  active?: boolean;
  /** Applied to the full-bleed pointer-tracking container. */
  className?: string;
  /** Applied to each trail image (e.g. rounded corners). */
  imageClassName?: string;
  /** Minimum pointer travel, in px, before the next image spawns. */
  minDistance?: number;
  /** Maximum number of images visible at once. */
  maxItems?: number;
  /** How long, in ms, an image stays before it exits. */
  lifespan?: number;
  /** Radius, in px from the container's center, where images never spawn. */
  centerExclusionRadius?: number;
}

/**
 * A cursor-following image trail: as the pointer moves, images fade in,
 * sharpen and settle at a fixed box size, then blur and fade out after a
 * short lifespan. Every image shares exactly the same rendered box per
 * viewport tier (object-fit: cover handles the crop) — only a small
 * +/-5% scale wobble and a few degrees of rotation vary between them, for
 * an editorial feel without ever looking wildly inconsistent.
 *
 * Disables itself automatically on small/touch viewports and when the user
 * prefers reduced motion. Adapted from the 21st.dev ImageTrail pattern to
 * run on the "motion" package's React bindings (`motion/react`).
 */
export function ImageTrail({
  images,
  active = true,
  className,
  imageClassName,
  minDistance = 85,
  maxItems = 12,
  lifespan = 950,
  centerExclusionRadius = 150,
}: ImageTrailProps) {
  const [items, setItems] = useState<TrailItem[]>([]);
  const [isCoarsePointer, setIsCoarsePointer] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : false
  );
  const [sizeTier] = useState<SizeTier>(() =>
    getSizeTier(typeof window !== "undefined" ? window.innerWidth : 1280)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const nextImageRef = useRef(0);
  const nextIdRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const listener = (event: MediaQueryListEvent) => setIsCoarsePointer(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  const isActive =
    active && !prefersReducedMotion && !isCoarsePointer && sizeTier !== "mobile" && images.length > 0;
  const box = BOX_SIZE[sizeTier];

  // Whenever the trail deactivates (pointer stops mattering, exit sequence
  // starts, reduced motion, ...) render nothing instead of what's queued in
  // state — AnimatePresence still plays each item's exit transition on the
  // render where it drops out, so they clear out rather than lingering.
  const visibleItems = isActive ? items : [];

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isActive || event.pointerType === "touch") return;

      const bounds = containerRef.current?.getBoundingClientRect();
      const width = bounds?.width ?? window.innerWidth;
      const height = bounds?.height ?? window.innerHeight;
      const x = event.clientX - (bounds?.left ?? 0);
      const y = event.clientY - (bounds?.top ?? 0);

      const last = lastPointRef.current;
      if (last && Math.hypot(x - last.x, y - last.y) < minDistance) return;
      lastPointRef.current = { x, y };

      if (Math.hypot(x - width / 2, y - height / 2) < centerExclusionRadius) return;

      const src = images[nextImageRef.current % images.length];
      nextImageRef.current += 1;
      const id = nextIdRef.current++;
      const scale = 0.95 + Math.random() * 0.1;
      const rotate = Math.random() * 8 - 4;

      setItems((prev) => {
        const next = [...prev, { id, src, x, y, scale, rotate }];
        return next.length > maxItems ? next.slice(next.length - maxItems) : next;
      });

      window.setTimeout(() => removeItem(id), lifespan);
    },
    [isActive, images, maxItems, minDistance, centerExclusionRadius, lifespan, removeItem]
  );

  const handlePointerLeave = useCallback(() => {
    lastPointRef.current = null;
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
    >
      <AnimatePresence>
        {visibleItems.map((item) => (
          <motion.img
            key={item.id}
            src={item.src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: item.scale * 0.88, rotate: item.rotate, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: item.scale, rotate: item.rotate, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: item.scale * 0.94, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={imageClassName}
            style={{
              position: "absolute",
              left: item.x - box.width / 2,
              top: item.y - box.height / 2,
              width: box.width,
              height: box.height,
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
