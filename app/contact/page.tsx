import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Morphic Spaces",
  description:
    "Get in touch with Morphic Spaces to talk about your architecture or interior design project — message us on WhatsApp or send an enquiry directly.",
  path: "/contact",
  imageAlt: "Morphic Spaces studio contact page architectural detail",
});

// No Footer here by design — the page ends right after the enquiry form,
// keeping it short instead of stretching the viewport further.
export default function ContactPage() {
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-5">
          <ContactDetails />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
