"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { PROJECTS } from "@/components/projects/project-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Design Becomes Real Through Space" — bridges the services page back to
 * real, built work. Pulls three actual projects by id from the studio's own
 * project-data.ts (never invented): The Courtyard House, A Study in Green
 * and An Open Horizon, one representing each of the studio's core
 * disciplines. Same hover-expand-title language as ProjectsGallery's cards,
 * kept intentionally simpler (no filter state) since this is a bridge, not
 * the full gallery.
 */
const FEATURED_IDS = ["the-courtyard-house", "a-study-in-green", "an-open-horizon"] as const;

export function ServiceProjectConnection() {
  const featured = FEATURED_IDS.map((id) => PROJECTS.find((project) => project.id === id)).filter(
    (project): project is NonNullable<typeof project> => Boolean(project),
  );

  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-xl"
          >
            <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">
              From Idea To Space
            </span>
            <h2
              className={`${fraunces.className} mt-6 text-3xl font-light leading-[1.15] tracking-tight text-[var(--ivory-90)] sm:text-4xl lg:text-5xl`}
            >
              Design becomes real
              <br />
              through <em className="italic text-[var(--gold)]">space.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--ivory-70)] transition-colors hover:text-[var(--ivory-90)]"
            >
              View All Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
            >
              <Link href={`/projects#gallery`} className="group block">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--charcoal)]">
                  <Image
                    src={project.image}
                    alt={`${project.title} — Morphic Spaces`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/80" />

                  <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                      {project.category}
                    </span>
                    <h3 className="mt-2 text-xl font-light text-[var(--ivory-90)]">{project.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--ivory-55)]">
                      {project.location} · {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
