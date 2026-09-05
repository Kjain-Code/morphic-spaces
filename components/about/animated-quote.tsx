"use client";

import { motion } from "motion/react";

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
 *
 * No prefers-reduced-motion branch here (same as Section/ProjectsHero
 * elsewhere in this codebase, which also don't branch their whileInView
 * fades): a modest opacity/16px fade is the kind of motion those pages
 * already treat as fine either way, and branching the returned element
 * tree on a client-only media query — rather than just varying animation
 * values on the same elements — caused a real SSR/client hydration
 * mismatch here (the server can't know the OS's reduced-motion setting,
 * but the client's first render already does).
 */
export function AnimatedQuote({ lines, className = "", lineClassName = "" }: AnimatedQuoteProps) {
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
