"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { STAGE_CONTENT, type StagePosition } from "@/lib/stage-content";

export interface StageContentProps {
  progress: MotionValue<number>;
}

const STAGE_COUNT = STAGE_CONTENT.length;

/** Where each stage's content sits vertically, so it doesn't read as pinned to one corner for the whole journey. */
const POSITION_CLASSES: Record<StagePosition, string> = {
  "bottom-left": "justify-end pb-10 sm:pb-14 lg:pb-16",
  "top-left": "justify-start pt-28 sm:pt-32 lg:pt-36",
  "center-left": "justify-center",
};

/**
 * The editorial content block over the video. Unlike a fixed HUD, this is
 * the video's actual story: as the camera moves through each stage of the
 * house, both the copy AND where it sits (top / center / bottom, always
 * left-aligned) change for that stage — see lib/stage-content.ts — animating
 * out and back in rather than sitting static in one spot for the journey.
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
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex flex-col px-6 pr-24 sm:px-10 sm:pr-16 ${POSITION_CLASSES[content.position]}`}
    >
      <div className="mx-auto w-full max-w-7xl">
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

            {content.secondaryLabel && content.secondaryText && (
              <div className="mt-8 max-w-md border-t border-white/15 pt-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">{content.secondaryLabel}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">{content.secondaryText}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
