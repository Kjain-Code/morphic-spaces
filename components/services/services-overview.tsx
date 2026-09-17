"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { SERVICES } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/** One service tile — image, then a hairline + number + arrow row, title, one-line description, explore link. Matches the client's reference grid. */
function ServiceTile({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 4) * 0.08 }}
    >
      <Link href={`/services/${service.slug}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--graphite)]">
          <motion.div
            initial={{ clipPath: "inset(10% 0 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={service.overviewImage}
              alt={`${service.title} — Morphic Spaces`}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-sm font-light text-[var(--ivory-45)]">{service.number}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--ivory-10)]" />
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--ivory-20)] text-[var(--ivory-70)] transition-colors duration-300 group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--charcoal)]">
            →
          </span>
        </div>
        <h3 className="mt-3 text-lg font-light text-[var(--ivory-90)] transition-transform duration-300 group-hover:translate-x-1">
          {service.title}
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--ivory-45)]">{service.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--ivory-55)] transition-colors group-hover:text-[var(--gold)]">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </motion.div>
  );
}

/** "Four Ways We Shape Space" — the studio's four services, one editorial grid. */
export function ServicesOverview() {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--charcoal)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">What We Offer</span>
          <h2 className={`${fraunces.className} mt-6 text-3xl font-light uppercase leading-[1.1] text-[var(--ivory-90)] sm:text-5xl`}>
            Four ways we shape space.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
            Every project begins differently. Our role is to understand what the space needs — and bring
            architecture, interiors, landscape and detail together with intention.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 sm:mt-16">
          {SERVICES.map((service, index) => (
            <ServiceTile key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
