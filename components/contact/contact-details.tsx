"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { SVGProps } from "react";
import { GrainOverlay } from "@/components/about/grain-overlay";
import { fraunces } from "@/lib/fonts";

/** The contact form's WhatsApp submit link is built from this same constant. */
export const WHATSAPP_NUMBER = "919053511417";

const PHONE_NUMBERS = ["+91 90535 11417", "+91 90504 11417"];
const EMAIL = "morphicspaces@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/morphic_spaces";
const STUDIO_ADDRESS = "Shop No. 18, Dhakoli, Punjab";

const LOCATIONS = ["Chandigarh", "Panchkula", "Mohali", "Karnal", "Gurugram"];

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

/** Diagonal arrow — the WhatsApp button icon, sized down for inline hover arrows too. */
function IconArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="currentColor" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The left half of /contact — the studio's real contact channels
 * (WhatsApp, phone, email, studio address, Instagram, the cities it works
 * in). A moody photograph of the studio's own work sits behind a deep
 * charcoal wash (client asked for this page to read as more "designed" —
 * see the vivid --gold accent below, replacing the previous --bronze here
 * first) rather than the flat charcoal fill used elsewhere on the site.
 */
export function ContactDetails() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="relative flex h-full min-h-[40rem] flex-col justify-between overflow-hidden bg-[var(--charcoal)] px-6 pb-14 pt-28 sm:px-10 sm:pb-16 sm:pt-32 lg:px-14 lg:pb-20">
      {/* Ambient photo backdrop — one of the studio's own renders, kept
          low-opacity and heavily washed so it reads as texture/mood, never
          competing with the text on top of it. */}
      <Image
        src="/images/projects/residence-karnal.jpg"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="absolute inset-0 -z-20 object-cover opacity-[0.32]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--charcoal)] via-[var(--charcoal)]/90 to-[var(--charcoal)]" />
      <GrainOverlay />

      {/* Decorative gold ring + glow — purely atmospheric, echoes the arcs
          used across the reference design language. */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[var(--gold-30)] sm:-right-24 sm:-top-24 sm:h-80 sm:w-80"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-1/3 h-72 w-72 rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "var(--gold)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative"
      >
        <span className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
          Contact Us
          <span aria-hidden="true" className="h-px w-8 bg-[var(--gold-40)]" />
        </span>
        <h1 className={`${fraunces.className} mt-6 max-w-sm text-4xl font-light leading-[1.15] text-[var(--ivory-90)] sm:text-5xl`}>
          Let&rsquo;s Start A <em className="italic text-[var(--gold)]">Conversation.</em>
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--ivory-55)]">
          Tell us about your space, your site and what you have in mind — we read every enquiry ourselves.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="relative mt-14 flex flex-col gap-9"
      >
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Message Us Directly</span>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="group mt-4 flex items-center gap-4 w-fit">
            <motion.span
              whileHover={{ scale: 1.08, rotate: 6 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--charcoal)] shadow-[0_8px_24px_-8px_rgba(230,197,128,0.55)]"
            >
              <IconArrowUpRight className="h-5 w-5" />
            </motion.span>
            <span className="font-serif text-2xl font-light text-[var(--ivory-90)] transition-colors group-hover:text-[var(--gold)] sm:text-3xl">
              WhatsApp
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-6 border-t border-[var(--ivory-10)] pt-8 sm:flex-row sm:gap-14">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Call Us</span>
            <div className="mt-4 flex flex-col gap-2">
              {PHONE_NUMBERS.map((number) => (
                <a
                  key={number}
                  href={`tel:+${number.replace(/[^\d]/g, "")}`}
                  className="group flex items-center gap-3 text-[var(--ivory-70)] transition-colors hover:text-[var(--gold)]"
                >
                  <IconPhone className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                  <span className="text-sm tracking-wide">{number}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Email</span>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-4 flex items-center gap-3 text-[var(--ivory-70)] transition-colors hover:text-[var(--gold)]"
            >
              <IconMail className="h-4 w-4 shrink-0 text-[var(--gold)]" />
              <span className="text-sm tracking-wide">{EMAIL}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-14">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Studio</span>
            <div className="mt-4 flex items-start gap-3 text-[var(--ivory-70)]">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
              <span className="max-w-[16rem] text-sm leading-relaxed tracking-wide">{STUDIO_ADDRESS}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--ivory-45)]">Follow</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-3 text-[var(--ivory-70)] transition-colors hover:text-[var(--gold)]"
            >
              <IconInstagram className="h-4 w-4 shrink-0 text-[var(--gold)]" />
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
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--gold)]" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
