"use client";

import { motion } from "motion/react";
import type { SVGProps } from "react";
import { GrainOverlay } from "@/components/about/grain-overlay";

/**
 * NOTE: replace with the real WhatsApp number (country code + number, no
 * "+", spaces or dashes — e.g. "919876543210") once the client provides
 * it. The contact form's submit link is built from this same constant.
 */
export const WHATSAPP_NUMBER = "910000000000";

const LOCATIONS = ["Chandigarh", "Panchkula", "Mohali", "Gurugram"];

function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="currentColor" d="M6 8h20v13H14l-5 4v-4H6Z" />
    </svg>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The left half of /contact — the studio's real, unfabricated contact
 * channels (WhatsApp, the cities it works in) rather than an invented
 * office address, phone hours or email. Dark espresso, mirroring the
 * about page's palette so /contact reads as part of the same system.
 */
export function ContactDetails() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[var(--espresso)] px-6 pb-16 pt-28 sm:px-10 sm:pb-20 sm:pt-32 lg:px-14 lg:pb-24">
      <GrainOverlay />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative"
      >
        <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--clay)]">Contact</span>
        <h1 className="mt-6 max-w-sm font-serif text-4xl font-light leading-[1.15] text-[var(--linen-90)] sm:text-5xl">
          Let&rsquo;s start a conversation.
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--linen-55)]">
          Tell us about your space, your site and what you have in mind — we read every enquiry ourselves.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="relative mt-16 flex flex-col gap-12"
      >
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--linen-45)]">Message Us Directly</span>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-center gap-4 text-[var(--linen-90)] transition-colors hover:text-[var(--clay)]"
          >
            <IconChat className="h-7 w-7 shrink-0 text-[var(--clay)]" />
            <span className="font-serif text-2xl font-light sm:text-3xl">WhatsApp</span>
            <motion.span aria-hidden="true" className="inline-block" whileHover={{ x: 5 }} transition={{ duration: 0.25 }}>
              →
            </motion.span>
          </a>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--linen-45)]">Where We Work</span>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
            {LOCATIONS.map((city, index) => (
              <li key={city} className="flex items-center gap-3">
                <span className="font-serif text-lg font-light text-[var(--linen-70)] sm:text-xl">{city}</span>
                {index < LOCATIONS.length - 1 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--clay)]" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
