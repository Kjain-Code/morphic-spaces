"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { CinematicHero } from "@/components/home/cinematic-hero";

// Plain module variable: it resets on every full page load / browser reload,
// so the splash always plays first. It survives in-app (client-side)
// navigation, so going from another page back to "/" doesn't replay it.
let loadingScreenPlayed = false;

export function HomePage() {
  const [isLoading, setIsLoading] = useState(() => !loadingScreenPlayed);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    loadingScreenPlayed = true;
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CinematicHero />
    </>
  );
}
