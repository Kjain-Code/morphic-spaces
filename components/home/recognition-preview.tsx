"use client";

import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { PlaceholderBox } from "@/components/ui/placeholder-box";

const RECOGNITION_SLOTS = Array.from({ length: 4 }, (_, i) => `Recognition ${String(i + 1).padStart(2, "0")}`);

export function RecognitionPreview() {
  return (
    <Section eyebrow="Recognition">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {RECOGNITION_SLOTS.map((label, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
          >
            <PlaceholderBox label={label} className="aspect-[3/2]" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
