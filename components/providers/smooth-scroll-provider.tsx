"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Sitewide smooth scrolling, wired into GSAP's ticker so ScrollTrigger (used
 * by the cinematic hero's video scrubbing) and Lenis share one animation
 * loop and one source of truth for scroll position — no competing scroll
 * systems. Mount once, at the root layout, above everything.
 *
 * Because this lives in the root layout, it never unmounts across a
 * client-side route change (Link navigation) — only the page content below
 * it swaps out. Lenis's own scroll position is a separate, persistent piece
 * of state on top of the browser's, so without the effect below, navigating
 * to a new page kept whatever scroll position the previous page was left
 * at: the new page would render already scrolled down instead of starting
 * at the top, and even a plain `window.scrollTo(0, 0)` gets smoothed back
 * away by Lenis's own render loop, since Lenis doesn't know the page under
 * it just changed. A full browser reload (F5 / the reload button) already
 * lands at the top correctly — see the scroll-restoration script in
 * app/layout.tsx — this effect closes the one gap that script can't reach:
 * in-app navigation between pages.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Skip the very first run — that's the initial page load, which the
    // beforeInteractive script in app/layout.tsx already puts at the top.
    // Only actual route changes after that need this.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    // Recalculates every ScrollTrigger's start/end positions against the
    // newly mounted page's layout, rather than leaving stale measurements
    // from whichever page was showing a moment ago.
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return <>{children}</>;
}
