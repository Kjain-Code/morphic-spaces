"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { STAGE_CONTENT } from "@/lib/stage-content";

export interface StageContentProps {
  progress: MotionValue<number>;
}

const STAGE_COUNT = STAGE_CONTENT.length;

/**
 * The editorial content block over the video's lower-left. Unlike the HUD
 * on the right (a fixed frame with rotating labels), this is the video's
 * actual story: as the camera moves through each stage of the house, the
 * whole block — eyebrow, headline, supporting line — swaps for that stage's
 * copy (see lib/stage-content.ts), animating out and back in rather than
 * sitting static for the whole journey.
 */
export function StageContent({ progress }: StageContentProps) {
  const [activeStage, setActiveStage] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(progress, "change", (latest) => {
    const stage = Math.min(STAGE_COUNT - 1, Math.floor(latest * STAGE_COUNT));
    setActiveStage((prev) => (prev === stage ? prev : stage));
  });

  const content = STAGE_CONTENT[activeStage];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-10 pr-24 sm:px-10 sm:pb-14 sm:pr-0 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStage}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">{content.label}</p>
            <h1 className="mt-5 max-w-2xl font-serif text-4xl font-light uppercase leading-[1.05] text-white/90 sm:text-6xl lg:text-7xl">
              {content.headlineLines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base">
              {content.supportingText}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
