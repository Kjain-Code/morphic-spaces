"use client";

import { motion, useReducedMotion } from "motion/react";

export interface AnimatedQuoteProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const line = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Line-by-line reveal for short, high-impact statements (2-3 lines) — the
 * pull-quotes that close the About Studio and Our Story sections on
 * /about. Deliberately not used for body paragraphs (too many lines would
 * make the stagger feel sluggish rather than emphatic).
 */
export function AnimatedQuote({ lines, className = "", lineClassName = "" }: AnimatedQuoteProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <p className={className}>
        {lines.map((text, index) => (
          <span key={index} className={`block ${lineClassName}`}>
            {text}
          </span>
        ))}
      </p>
    );
  }

  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={container}
      className={className}
    >
      {lines.map((text, index) => (
        <motion.span key={index} variants={line} className={`block ${lineClassName}`}>
          {text}
        </motion.span>
      ))}
    </motion.p>
  );
}
