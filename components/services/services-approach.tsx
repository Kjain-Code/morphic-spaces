"use client";

import Image from "next/image";
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
          className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
        >
          <span className="block text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">Our Approach</span>
          <h2
            className={`${fraunces.className} mt-6 max-w-md text-3xl font-light leading-[1.2] tracking-tight text-[var(--ivory-90)] sm:text-4xl`}
          >
            One process,
            <br />
            start to <em className="italic text-[var(--gold)]">finish.</em>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">
            We listen, understand and collaborate at every stage to create environments that feel authentic and
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
              className="group relative border-t border-[var(--ivory-10)] py-8 pl-0 transition-colors first:border-t-0 sm:py-10 sm:pl-8"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[2.6rem] hidden h-[5px] w-[5px] -translate-x-[calc(50%-0.5px)] rounded-full bg-[var(--gold)] transition-transform duration-300 group-hover:scale-150 sm:block"
              />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-10">
                <div className="flex min-w-0 items-start gap-6 sm:gap-10 sm:flex-1">
                  <span className={`${fraunces.className} shrink-0 text-3xl font-light leading-none text-[var(--gold)] sm:text-4xl`}>
                    {step.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className={`${fraunces.className} text-2xl font-light text-[var(--ivory-90)] sm:text-3xl`}>
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--ivory-55)] sm:text-base">{step.description}</p>
                  </div>
                </div>

                {step.image && (
                  <div className="relative ml-0 aspect-[16/9] w-full overflow-hidden border border-[var(--gold-30)] sm:ml-16 sm:w-[45%] sm:shrink-0 lg:ml-0">
                    <Image
                      src={step.image}
                      alt={`${step.title} — ${step.tag}`}
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 40vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
