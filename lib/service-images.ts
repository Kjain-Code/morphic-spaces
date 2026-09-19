import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * Server-only helper: lists the image files sitting in a service's own folder,
 * public/images/projects/<service-slug>/ — one folder per service:
 *
 *   architecture · interior-design · visualization · landscape ·
 *   design-consultancy · renovation
 *
 * The folder is the source of truth for what a service page (/services/[slug])
 * shows: drop an image into the right folder and it appears on that service's
 * page after the next build, no code change needed. The /projects page is
 * separate — it is driven by components/projects/project-data.ts and shows
 * every project regardless of which folder its files live in.
 *
 * Only call this from server code (it uses node:fs); never import it into a
 * "use client" component.
 */
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

export function getServiceFolderImages(slug: string): string[] {
  const folder = path.join(process.cwd(), "public", "images", "projects", slug);

  try {
    return readdirSync(folder)
      .filter((file) => IMAGE_FILE.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/images/projects/${slug}/${file}`);
  } catch {
    // Missing/unreadable folder: the service page simply shows no gallery.
    return [];
  }
}
