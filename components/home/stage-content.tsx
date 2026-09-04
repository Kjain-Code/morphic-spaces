"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { STAGE_CONTENT, type StagePosition } from "@/lib/stage-content";

export interface StageContentProps {
  progress: MotionValue<number>;
}

const STAGE_COUNT = STAGE_CONTENT.length;

/** Where each stage's content sits — side and height both vary per stage. */
const POSITION_CLASSES: Record<StagePosition, string> = {
  "bottom-left": "items-start justify-end pb-10 sm:pb-14 lg:pb-16",
  "bottom-right": "items-end justify-end pb-10 text-right sm:pb-14 lg:pb-16",
  "top-left": "items-start justify-start pt-28 sm:pt-32 lg:pt-36",
  "top-right": "items-end justify-start pt-28 text-right sm:pt-32 lg:pt-36",
  "center-left": "items-start justify-center",
  "center-right": "items-end justify-center text-right",
};

/**
 * The editorial content block over the video. Unlike a fixed HUD, this is
 * the video's actual story: as the camera moves through each stage of the
 * house, both the copy and where it sits (which side, and how high — see
 * lib/stage-content.ts) change for that stage, animating out and back in
 * rather than sitting static in one spot for the journey. Every stage
 * carries the same amount of copy, so none reads as heavier than the rest.
 */
export function StageContent({ progress }: StageContentProps) {
  const [activeStage, setActiveStage] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(progress, "change", (latest) => {
    const stage = Math.min(STAGE_COUNT - 1, Math.floor(latest * STAGE_COUNT));
    setActiveStage((prev) => (prev === stage ? prev : stage));
  });

  const content = STAGE_CONTENT[activeStage];
  const isRight = content.position.endsWith("right");

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 mx-auto flex w-full max-w-7xl flex-col px-6 sm:px-10 ${POSITION_CLASSES[content.position]}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeStage}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">{content.label}</p>
          <h1 className="mt-5 font-serif text-4xl font-light uppercase leading-[1.05] text-white/90 sm:text-6xl lg:text-7xl">
            {content.headlineLines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          <p
            className={`mt-5 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base ${isRight ? "ml-auto" : "mr-auto"}`}
          >
            {content.supportingText}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
