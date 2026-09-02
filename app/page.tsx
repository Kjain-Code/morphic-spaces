"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Hero } from "@/components/home/hero";
import { IntroSection } from "@/components/home/intro-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesPreview } from "@/components/home/services-preview";
import { RecognitionPreview } from "@/components/home/recognition-preview";
import { AboutPreview } from "@/components/home/about-preview";
import { ContactCta } from "@/components/home/contact-cta";

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

      <Hero />
      <IntroSection />
      <FeaturedProjects />
      <ServicesPreview />
      <RecognitionPreview />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
