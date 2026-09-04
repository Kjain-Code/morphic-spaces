import Link from "next/link";
import { LogoMark } from "@/components/ui/logo-mark";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Recognition", href: "/recognition" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

/**
 * Minimal closing footer: logo, nav links, and a copyright line. No
 * fabricated contact details — real ones go here once the client provides
 * them.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--stage)] px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <LogoMark className="h-auto w-8" />
          <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-white/35">
            &copy; {new Date().getFullYear()} Morphic Spaces
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
