import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel's default for anything under public/ is `max-age=0,
  // must-revalidate` — fine for normal assets, but the homepage's cinematic
  // hero (see lib/cinematic-journey.ts) reads this file with many small
  // Range requests as the user scrolls, and must-revalidate means every one
  // of those round-trips the origin/edge again instead of being served
  // straight from the browser's own disk cache. Long-lived + immutable lets
  // the browser cache the file after the first load, so scrubbing back and
  // forth in the same session — and any repeat visit — never re-fetches it.
  // Because this filename isn't content-hashed, bump it (not just the
  // bytes) whenever the video is swapped so caches holding the old file
  // don't keep serving stale footage.
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
