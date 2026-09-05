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

const CONTACT_LINKS = [
  { label: "+91 90535 11417", href: "tel:+919053511417" },
  { label: "morphicspaces@gmail.com", href: "mailto:morphicspaces@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/morphic_spaces", external: true },
];

/** Minimal closing footer: logo, studio address, real contact links, nav links, and a copyright line. */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--stage)] px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <LogoMark className="h-6 w-auto" />
          <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-white/35">
            &copy; {new Date().getFullYear()} Morphic Spaces
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white/35">Shop No. 18, Dhakoli, Punjab</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[11px] uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
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
