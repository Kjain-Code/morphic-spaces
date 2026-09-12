"use client";

import { useState, type FormEvent, type ReactNode, type SVGProps } from "react";
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

function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="currentColor" d="M12 21s6.5-6.2 6.5-10.8a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" />
    </svg>
  );
}

function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="currentColor" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function IconArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="currentColor" d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path stroke="currentColor" d="M12 3.5 5 6v5.5c0 4.7 3 7.9 7 9.5 4-1.6 7-4.8 7-9.5V6l-7-2.5Z" />
      <path stroke="currentColor" d="m9.2 12.1 1.9 1.9 3.7-3.9" />
    </svg>
  );
}

const fieldClassName =
  "peer w-full rounded-xl border border-[var(--charcoal-10)] bg-white px-4 py-3.5 text-sm text-[var(--charcoal)] outline-none transition-all placeholder:text-[var(--taupe)]/70 focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-15)]";

/** A labelled text/email/tel/textarea field — visible label above, soft
 *  bordered box (not the site's usual underline style), gold focus ring. */
function FormField({
  id,
  label,
  type = "text",
  as = "input",
  required = false,
  placeholder,
  icon,
  className = "",
}: {
  id: string;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
  placeholder: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fieldItem} className={`relative ${className}`}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-[var(--charcoal)]">
        {label} {required && <span className="text-[var(--gold-dark)]">*</span>}
      </label>
      <div className="relative">
        {as === "textarea" ? (
          <textarea
            id={id}
            name={id}
            required={required}
            placeholder={placeholder}
            rows={4}
            className={`${fieldClassName} resize-none`}
          />
        ) : (
          <input id={id} name={id} type={type} required={required} placeholder={placeholder} className={fieldClassName} />
        )}
        {icon && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--gold-dark)]">
            {icon}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function FormSelect({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <motion.div variants={fieldItem} className="relative">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-[var(--charcoal)]">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          defaultValue=""
          className="w-full cursor-pointer appearance-none rounded-xl border border-[var(--charcoal-10)] bg-white px-4 py-3.5 text-sm text-[var(--charcoal)] outline-none transition-all focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold-15)]"
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
        <IconChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--taupe)]" />
      </div>
    </motion.div>
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
      `Service: ${data.get("service") || "Not specified"}`,
      `Location: ${data.get("location") || "Not specified"}`,
      "",
      "Details:",
      data.get("details") || "—",
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <div className="relative flex h-full min-h-[36rem] flex-col justify-center overflow-hidden bg-[var(--ivory)] px-6 pb-16 pt-28 sm:px-10 sm:pb-20 sm:pt-32 lg:px-14 lg:pb-24">
      {/* Faint decorative gold ring, bottom-right — echoes the one on the
          dark panel so the two halves read as one designed page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 hidden h-72 w-72 rounded-full border border-[var(--gold-30)] sm:block"
      />

      <AnimatePresence mode="popLayout">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] font-serif text-2xl font-light text-[var(--charcoal)]"
            >
              ✓
            </motion.span>
            <h2 className="mt-8 max-w-sm font-serif text-3xl font-light leading-[1.2] text-[var(--charcoal)] sm:text-4xl">
              Thank you for contacting us.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--taupe)]">
              We will get back to you soon. A WhatsApp chat with your details has opened in a new tab — send it
              across and we&rsquo;ll take it from there.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="group mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[var(--taupe)] transition-colors hover:text-[var(--gold-dark)]"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial="hidden"
            animate="show"
            variants={fieldContainer}
            className="relative"
          >
            <motion.span
              variants={fieldItem}
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--gold-dark)]"
            >
              Enquiry Form
              <span aria-hidden="true" className="h-px w-8 bg-[var(--gold-30)]" />
            </motion.span>
            <motion.h2
              variants={fieldItem}
              className="mt-4 font-serif text-2xl font-light text-[var(--charcoal)] sm:text-3xl"
            >
              Tell us about your project.
            </motion.h2>
            <motion.p variants={fieldItem} className="mt-3 max-w-md text-sm leading-relaxed text-[var(--taupe)]">
              Share your ideas, requirements or any questions you have. We read every enquiry ourselves and get back
              to you as soon as possible.
            </motion.p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <FormField id="name" label="Name" required placeholder="Your name" />
              <FormField id="email" label="Email" type="email" required placeholder="you@example.com" />
              <FormField id="phone" label="Phone" type="tel" required placeholder="+91 98765 43210" />
              <FormSelect id="service" label="Service" options={SERVICES} />
              <FormField
                id="location"
                label="Project Location"
                placeholder="City / Location"
                icon={<IconPin className="h-4 w-4" />}
                className="sm:col-span-2"
              />
              <FormField
                id="details"
                label="Project Details"
                as="textarea"
                placeholder="Tell us a little about what you're planning…"
                className="sm:col-span-2"
              />
            </div>

            <motion.div
              variants={fieldItem}
              className="mt-8 flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="inline-flex items-center gap-2 text-xs text-[var(--taupe)]">
                <IconShield className="h-4 w-4 text-[var(--gold-dark)]" />
                Your information is safe with us.
              </span>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[var(--gold)] px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--charcoal)] shadow-[0_10px_28px_-10px_rgba(230,197,128,0.7)] transition-shadow hover:shadow-[0_14px_36px_-10px_rgba(230,197,128,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-dark)]"
              >
                Send Enquiry
                <IconArrowUpRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
