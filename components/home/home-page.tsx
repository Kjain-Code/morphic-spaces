"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { CinematicHero } from "@/components/home/cinematic-hero";

const LOADING_SCREEN_SESSION_KEY = "ms-loading-screen-played";

// sessionStorage, not a plain module/window variable: it survives a full
// page reload or back/forward navigation within the same tab, so a repeat
// visit to "/" in one browsing session isn't forced through the ~2.6s
// (up to 5s) cinematic splash a second time. A brand-new tab or session
// still gets the full first-visit intro — this only skips needless replays.
function hasPlayedLoadingScreen() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(LOADING_SCREEN_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markLoadingScreenPlayed() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(LOADING_SCREEN_SESSION_KEY, "true");
  } catch {
    // Storage unavailable (e.g. private browsing) — falls back to
    // replaying the intro, which is harmless.
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
