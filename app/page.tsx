"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { CinematicHero } from "@/components/home/cinematic-hero";

// The homepage IS the cinematic house journey — nothing else renders here.
// The studio story is told as the journey's final stage (see
// lib/stage-content.ts) rather than a separate section below it.
// Services/Recognition/Projects/About/Contact each have their own route
// (unchanged) and are not rendered here.

// Module-scope, not state/sessionStorage: this flips to true once the
// preloader has played and stays true for the lifetime of this JS bundle —
// i.e. across every client-side navigation back to "/" (clicking "Home" in
// the navbar re-mounts this component but doesn't reload the module). Only
// an actual hard refresh re-evaluates the module and resets it, which is
// exactly when the preloader should be allowed to play again.
let hasPlayedLoadingScreen = false;

export default function Home() {
  const [isLoading, setIsLoading] = useState(!hasPlayedLoadingScreen);

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
    hasPlayedLoadingScreen = true;
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <CinematicHero />
    </>
  );
}
