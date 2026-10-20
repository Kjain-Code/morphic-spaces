import type { Metadata } from "next";
import Link from "next/link";

// Next.js already serves this with a 404 status and a noindex robots tag;
// the title just replaces the generic "404: This page could not be found."
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/** On-brand 404 that still returns a real 404 status, with crawlable routes back into the site. */
export default function NotFound() {
  return (
    <main className="min-h-dvh bg-[var(--surface)] px-6 pt-36 pb-32 sm:px-10 sm:pt-44">
      <div className="mx-auto max-w-4xl">
        <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--ink-muted)]">404</span>
        <h1 className="mt-6 font-serif text-4xl font-light text-[var(--ink)] sm:text-5xl">This page could not be found.</h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]">
          The page may have moved. You can continue from one of these instead:
        </p>
        <nav aria-label="Helpful links" className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "Services", href: "/services" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.25em] text-[var(--ink)] underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
