"use client";

import { motion } from "motion/react";
import type { SVGProps } from "react";
import { GrainOverlay } from "@/components/about/grain-overlay";

/** The contact form's WhatsApp submit link is built from this same constant. */
export const WHATSAPP_NUMBER = "919053511417";

const PHONE_NUMBERS = ["+91 90535 11417", "+91 90504 11417"];
const EMAIL = "morphicspaces@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/morphic_spaces";
const STUDIO_ADDRESS = "Shop No. 18, Dhakoli, Punjab";

const LOCATIONS = ["Chandigarh", "Panchkula", "Mohali", "Gurugram"];

function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="currentColor" d="M6 8h20v13H14l-5 4v-4H6Z" />
    </svg>
  );
}

function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path
        stroke="currentColor"
        d="M9.3 4.8c1 2 1.7 3.9 2.1 5.4-1 1-2.1 1.6-2.1 2.7 0 3.2 5.6 8.8 8.8 8.8 1.1 0 1.7-1.1 2.7-2.1 1.5.4 3.4 1.1 5.4 2.1.3 2.7-1.1 5.5-3.9 5.5C14.4 27.2 4.8 17.6 4.8 9.7c0-2.8 2.8-4.2 4.5-4.9Z"
      />
    </svg>
  );
}

function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="7" width="24" height="18" rx="1" stroke="currentColor" />
      <path stroke="currentColor" d="m5 8.5 11 8.5 11-8.5" />
    </svg>
  );
}

function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="currentColor" d="M16 28s9-8.7 9-15.2a9 9 0 1 0-18 0C7 19.3 16 28 16 28Z" />
      <circle cx="16" cy="12.8" r="3.2" stroke="currentColor" />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="5" width="22" height="22" rx="6" stroke="currentColor" />
      <circle cx="16" cy="16" r="6" stroke="currentColor" />
      <circle cx="23.2" cy="8.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The left half of /contact — the studio's real contact channels
 * (WhatsApp, phone, email, studio address, Instagram, the cities it works
 * in). Deep architectural charcoal, mirroring the About and Projects
 * pages' palette so /contact reads as part of the same system.
 */
export function ContactDetails() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[var(--charcoal)] px-6 pb-16 pt-28 sm:px-10 sm:pb-20 sm:pt-32 lg:px-14 lg:pb-24">
      <GrainOverlay />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "var(--bronze)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative"
      >
        <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--bronze)]">Contact</span>
        <h1 className="mt-6 max-w-sm font-serif text-4xl font-light leading-[1.15] text-[var(--ivory-90)] sm:text-5xl">
          Let&rsquo;s start a conversation.
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)]">
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
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Message Us Directly</span>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-center gap-4 text-[var(--ivory-90)] transition-colors hover:text-[var(--bronze)]"
          >
            <IconChat className="h-7 w-7 shrink-0 text-[var(--bronze)]" />
            <span className="font-serif text-2xl font-light sm:text-3xl">WhatsApp</span>
            <motion.span aria-hidden="true" className="inline-block" whileHover={{ x: 5 }} transition={{ duration: 0.25 }}>
              →
            </motion.span>
          </a>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Call Us</span>
            <div className="mt-4 flex flex-col gap-2">
              {PHONE_NUMBERS.map((number) => (
                <a
                  key={number}
                  href={`tel:+${number.replace(/[^\d]/g, "")}`}
                  className="group flex items-center gap-3 text-[var(--ivory-70)] transition-colors hover:text-[var(--bronze)]"
                >
                  <IconPhone className="h-4 w-4 shrink-0 text-[var(--bronze)]" />
                  <span className="text-sm tracking-wide">{number}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Email</span>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-4 flex items-center gap-3 text-[var(--ivory-70)] transition-colors hover:text-[var(--bronze)]"
            >
              <IconMail className="h-4 w-4 shrink-0 text-[var(--bronze)]" />
              <span className="text-sm tracking-wide">{EMAIL}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Studio</span>
            <div className="mt-4 flex items-start gap-3 text-[var(--ivory-70)]">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--bronze)]" />
              <span className="max-w-[16rem] text-sm leading-relaxed tracking-wide">{STUDIO_ADDRESS}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Follow</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-3 text-[var(--ivory-70)] transition-colors hover:text-[var(--bronze)]"
            >
              <IconInstagram className="h-4 w-4 shrink-0 text-[var(--bronze)]" />
              <span className="text-sm tracking-wide">Instagram</span>
            </a>
          </div>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Where We Work</span>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
            {LOCATIONS.map((city, index) => (
              <li key={city} className="flex items-center gap-3">
                <span className="font-serif text-lg font-light text-[var(--ivory-70)] sm:text-xl">{city}</span>
                {index < LOCATIONS.length - 1 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--bronze)]" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
