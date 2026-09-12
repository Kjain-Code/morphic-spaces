"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { CinematicHero } from "@/components/home/cinematic-hero";

function hasPlayedLoadingScreen() {
  return typeof window !== "undefined" && (window as { __msLoadingScreenPlayed?: boolean }).__msLoadingScreenPlayed === true;
}

function markLoadingScreenPlayed() {
  if (typeof window !== "undefined") {
    (window as { __msLoadingScreenPlayed?: boolean }).__msLoadingScreenPlayed = true;
  }
}

export function HomePage() {
  const [isLoading, setIsLoading] = useState(() => !hasPlayedLoadingScreen());

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
