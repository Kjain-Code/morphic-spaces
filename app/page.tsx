"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";

// Temporary: LoadingScreen is rendered directly from the root page, over a
// minimal dark shell, so the loading sequence and its reveal can be
// reviewed in the browser. Remove this wiring once the real homepage is built.
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#0d0c0b] text-white">
        <h1 className="text-2xl font-semibold tracking-wide">ARCHITECTURE STUDIO</h1>
        <p className="text-sm text-white/50">Project setup successful.</p>
      </main>
    </>
  );
}
