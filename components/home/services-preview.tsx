"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { PlaceholderBox } from "@/components/ui/placeholder-box";

const SERVICES = ["Architecture", "Interior Design", "Exterior Design", "Space Planning"];

/**
 * A hovered/focused service subtly reveals its image on the right — one
 * shared panel that cross-fades between services rather than four repeated
 * cards.
 */
export function ServicesPreview() {
  const [active, setActive] = useState(0);

  return (
    <Section eyebrow="Services">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-12 sm:gap-10">
        <ul className="sm:col-span-6">
          {SERVICES.map((service, index) => (
            <li key={service} className="border-t border-[var(--ink-10)] last:border-b">
              <button
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span
                  className={`font-serif text-2xl font-light transition-colors sm:text-3xl ${
                    active === index ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"
                  }`}
                >
                  {service}
                </span>
                <span className="text-xs tabular-nums text-[var(--ink-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="relative sm:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlaceholderBox
                label={`${SERVICES[active]} — content will be inserted from client`}
                className="aspect-[4/5]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
