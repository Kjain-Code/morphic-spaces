"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WHATSAPP_NUMBER } from "@/components/contact/contact-details";

const SERVICES = ["Architecture", "Interior Design", "Residential", "Commercial", "Bespoke Project"];

const EASE = [0.22, 1, 0.36, 1] as const;

const fieldContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const fieldItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * A single underline input/textarea with a floating label — pure CSS (the
 * `peer` + `:placeholder-shown` trick), no per-keystroke React state, so
 * there's no risk of the field lagging or fighting a re-render. `span`
 * requires a `placeholder=" "` (a single space) on the field for
 * `:placeholder-shown` to work as the "is this field empty" check.
 */
function FloatingField({
  id,
  label,
  type = "text",
  as = "input",
  className = "",
}: {
  id: string;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  className?: string;
}) {
  const fieldClassName =
    "peer w-full resize-none border-b border-[var(--espresso-20)] bg-transparent pb-3 pt-7 text-base text-[var(--espresso)] outline-none transition-colors placeholder:text-transparent focus:border-[var(--espresso-20)]";

  return (
    <motion.div variants={fieldItem} className={`relative ${className}`}>
      {as === "textarea" ? (
        <textarea id={id} name={id} required placeholder=" " rows={4} className={fieldClassName} />
      ) : (
        <input id={id} name={id} type={type} required placeholder=" " className={fieldClassName} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-7 origin-left text-base text-[var(--espresso-muted)] transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-[var(--clay)] peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-[0.2em]"
      >
        {label}
      </label>
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--clay)] transition-transform duration-300 peer-focus:scale-x-100" />
    </motion.div>
  );
}

function FloatingSelect({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <motion.div variants={fieldItem} className="relative">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-[var(--clay)]">{label}</span>
      <select
        id={id}
        name={id}
        required
        defaultValue=""
        className="peer mt-3 w-full cursor-pointer appearance-none border-b border-[var(--espresso-20)] bg-transparent pb-3 pt-1 text-base text-[var(--espresso)] outline-none transition-colors focus:border-[var(--espresso-20)]"
      >
        <option value="" disabled>
          Select a service
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-0 text-[var(--espresso-muted)]">
        ↓
      </span>
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[var(--clay)] transition-transform duration-300 peer-focus:scale-x-100" />
    </motion.div>
  );
}

function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <motion.button
      variants={fieldItem}
      type="submit"
      className="group mt-4 inline-flex w-fit items-center gap-3 border-b border-[var(--espresso)] pb-2 text-[11px] uppercase tracking-[0.25em] text-[var(--espresso)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--clay)]"
    >
      {children}
      <motion.span aria-hidden="true" className="inline-block" whileHover={{ x: 5 }} transition={{ duration: 0.25 }}>
        →
      </motion.span>
    </motion.button>
  );
}

/**
 * The right half of /contact. No backend: submitting builds a formatted
 * WhatsApp message from the fields and opens wa.me in a new tab (window.open
 * called synchronously in the submit handler, so browsers don't block it as
 * a popup), addressed to the studio's own number — the closest thing to
 * "straight to WhatsApp" achievable without a WhatsApp Business API
 * integration (which needs the client's own Meta Business credentials).
 * The visitor still has to tap Send once in the WhatsApp window that opens.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "New enquiry — Morphic Spaces",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Service: ${data.get("service")}`,
      `Location: ${data.get("location")}`,
      "",
      "Details:",
      data.get("details"),
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <div className="flex h-full min-h-[36rem] flex-col justify-center bg-[var(--linen)] px-6 pb-16 pt-28 sm:px-10 sm:pb-20 sm:pt-32 lg:px-14 lg:pb-24">
      <AnimatePresence mode="popLayout">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--clay)] font-serif text-2xl font-light text-[var(--clay)]"
            >
              ✓
            </span>
            <h2 className="mt-8 max-w-sm font-serif text-3xl font-light leading-[1.2] text-[var(--espresso)] sm:text-4xl">
              Thank you for contacting us.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--espresso-muted)]">
              We will get back to you soon. A WhatsApp chat with your details has opened in a new tab — send it
              across and we&rsquo;ll take it from there.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="group mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--espresso-muted)] transition-colors hover:text-[var(--clay)]"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} initial="hidden" animate="show" variants={fieldContainer}>
            <motion.span variants={fieldItem} className="block text-[11px] uppercase tracking-[0.3em] text-[var(--clay)]">
              Enquiry Form
            </motion.span>
            <motion.h2
              variants={fieldItem}
              className="mt-4 font-serif text-2xl font-light text-[var(--espresso)] sm:text-3xl"
            >
              Tell us about your project.
            </motion.h2>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              <FloatingField id="name" label="Name" />
              <FloatingField id="email" label="Email" type="email" />
              <FloatingField id="phone" label="Phone" type="tel" />
              <FloatingSelect id="service" label="Select Service" options={SERVICES} />
              <FloatingField id="location" label="Project Location" className="sm:col-span-2" />
              <FloatingField id="details" label="Details" as="textarea" className="sm:col-span-2" />
            </div>

            <SubmitButton>Send Enquiry</SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
