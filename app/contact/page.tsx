import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us — Architecture & Interior Design Enquiries",
  description:
    "Talk to Morphic Spaces about your architecture or interior project — call +91 90535 11417, WhatsApp us or send an enquiry. Studio at Dhakoli, Punjab.",
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
