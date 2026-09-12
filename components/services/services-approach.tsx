"use client";

import { motion } from "motion/react";
import { fraunces } from "@/lib/fonts";
import { PROCESS_STEPS } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Our Approach" — matches the client's reference: a short partnership
 * statement on the left, the studio's four-step process on the right, each
 * step revealing in turn with a gold line drawing itself down the column
 * (a straightforward whileInView stagger rather than a scroll-pinned
 * scrubbed sequence — see the note on this page's own component for why
 * pinned sections here stay to the two already established elsewhere).
 */
export function ServicesApproach() {
  return (
    <section className="border-t border-[var(--ivory-10)] bg-[var(--graphite)] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-5"
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">Our Approach</span>
          <h2
            className={`${fraunces.className} mt-6 max-w-md text-3xl font-light leading-[1.2] tracking-tight text-[var(--ivory-90)] sm:text-4xl`}
          >
            More than just design.
            <br />
            <em className="italic text-[var(--gold)]">It&rsquo;s a partnership.</em>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
            We listen, understand and collaborate at every stage to create spaces that feel authentic and
            enduring. Our process brings together creativity, functionality and precision — ensuring a seamless
            experience from the first conversation to completion.
          </p>
        </motion.div>

        <div className="relative flex flex-col lg:col-span-7">
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[0.6rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--gold-30)] sm:block"
          />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.12 }}
              className="relative border-t border-[var(--ivory-10)] py-7 pl-0 first:border-t-0 sm:pl-8"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-9 hidden h-[5px] w-[5px] -translate-x-[calc(50%-0.5px)] rounded-full bg-[var(--gold)] sm:block"
              />
              <div className="flex items-baseline gap-4">
                <span className="text-sm text-[var(--gold)]">{step.number}</span>
                <h3 className="text-lg font-medium uppercase tracking-[0.08em] text-[var(--ivory-90)]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
