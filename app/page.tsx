"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { CinematicHero } from "@/components/home/cinematic-hero";

// The homepage IS the cinematic house journey — nothing else renders here.
// The studio story is told as the journey's final stage (see
// lib/stage-content.ts) rather than a separate section below it.
// Services/Recognition/Projects/About/Contact each have their own route
// (unchanged) and are not rendered here.
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Keep the page pinned in place behind the loading overlay so the reveal
  // exposes the hero exactly as loaded, not wherever the page happened to
  // be scrolled to underneath it.
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <CinematicHero />
    </>
  );
}
