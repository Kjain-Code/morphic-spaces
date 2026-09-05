"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** Server (and the client's first hydration pass) always sees `false`, matching what SSR rendered. */
function getServerSnapshot() {
  return false;
}

/**
 * Whether the visitor prefers reduced motion — safe to branch a component's
 * returned JSX tree on, unlike Motion's own `useReducedMotion()`, which
 * reads `matchMedia` synchronously during the client's first render and so
 * mismatches whatever the (window-less) server rendered. `useSyncExternalStore`
 * is React's own answer to exactly this class of problem: it forces the
 * first client render to agree with `getServerSnapshot` regardless of the
 * real value, then reconciles afterward without a hydration warning.
 */
export function useIsReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
