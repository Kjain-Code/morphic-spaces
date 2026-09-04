"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { CinematicHero } from "@/components/home/cinematic-hero";

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

      {/* The homepage is the cinematic house journey and nothing else — no
          sections below it. Scrolling all the way through it just ends the
          page. */}
      <CinematicHero />
    </>
  );
}
