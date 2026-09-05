"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { CinematicHero } from "@/components/home/cinematic-hero";

// The homepage IS the cinematic house journey — nothing else renders here.
// The studio story is told as the journey's final stage (see
// lib/stage-content.ts) rather than a separate section below it.
// Services/Recognition/Projects/About/Contact each have their own route
// (unchanged) and are not rendered here.

// A flag on `window` itself, not a module-scope `let` and not sessionStorage:
//
// - Module-scope state (the previous approach here) doesn't survive in Next
//   dev — App Router re-evaluates a route's client module on every visit in
//   development, silently resetting a plain `let` back to its initial value,
//   so the preloader replayed on every "Home" click even though it worked
//   as intended in a production build. `window` is the one thing that's
//   guaranteed to persist for the entire life of the current document
//   regardless of how Next re-executes route modules underneath it.
// - sessionStorage would survive an actual refresh too, which is exactly the
//   one case that should replay the preloader — a real reload/new tab opens
//   a brand-new `window`, so this flag is gone and the preloader plays
//   again, same as a fresh visit.
//
// Net effect: plays once per real page load (first visit or a hard
// refresh), never again for client-side navigation back to "/" within that
// same load — including via the navbar's "Home" link.
function hasPlayedLoadingScreen() {
  return typeof window !== "undefined" && (window as { __msLoadingScreenPlayed?: boolean }).__msLoadingScreenPlayed === true;
}
function markLoadingScreenPlayed() {
  if (typeof window !== "undefined") {
    (window as { __msLoadingScreenPlayed?: boolean }).__msLoadingScreenPlayed = true;
  }
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => !hasPlayedLoadingScreen());

  // Keep the page pinned in place behind the loading overlay so the reveal
  // exposes the hero exactly as loaded, not wherever the page happened to
  // be scrolled to underneath it.
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    markLoadingScreenPlayed();
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <CinematicHero />
    </>
  );
}
