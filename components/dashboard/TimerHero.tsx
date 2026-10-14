"use client";

import Image from "next/image";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ModeSelector } from "@/components/dashboard/timer/ModeSelector";
import { TimerBadge } from "@/components/dashboard/timer/TimerBadge";
import { TimerQuote } from "@/components/dashboard/timer/TimerQuote";
import { TransportControls } from "@/components/dashboard/timer/TransportControls";
import { timer, timerModes } from "@/lib/data";
import type { TimerModeId } from "@/lib/types";
import { useState } from "react";

/* Ring geometry, in artboard pixels — the Figma ring is 13px thick on a
   239px box, i.e. a centre-line radius of 113 and a stroke of 13. ProgressRing
   takes viewBox units, so divide by 2.39. */
const RING = { r: 47.28, strokeWidth: 5.44 } as const;

/**
 * TimerHero — the photographic countdown panel.
 *
 * Artboard (820x438, rx15): a full-bleed photo with the badge, a decorative
 * quote, the 239px countdown ring, the transport row and the three-mode
 * selector placed at their measured coordinates. Every one of those
 * coordinates is an `artboard:*` class on the element itself, so they can be
 * tweaked here without touching globals.css.
 *
 * Below the artboard breakpoint the same tree is a fluid flex column — no
 * absolutely positioned child, so nothing overlaps on a phone.
 */
export function TimerHero({ className }: { className?: string }) {
  const [activeMode, setActiveMode] = useState<TimerModeId>("pomodoro");
  const mode = timerModes.find((m) => m.id === activeMode) ?? timerModes[0];

  return (
    <section
      aria-label="Focus timer"
      className={`ff-hero relative isolate overflow-hidden rounded-panel artboard:h-[438px] artboard:w-[820px] ${className ?? ""}`}
    >
      {/* Photographic backdrop — decorative, so alt is empty.
          The export anchors the 820x467 source to the top and lets the
          bottom 29px fall outside the panel. */}
      <Image
        src="/SunlitCozyWorkspaceWithSleepingCat1.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="(min-width: 1100px) 820px, 100vw"
        className="absolute inset-0 -z-10 object-cover object-center artboard:object-top"
      />

      <div className="ff-hero-body flex flex-col items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
        <TimerBadge mode={mode.label} />
        <TimerQuote quote={timer.quote} />

        {/* Countdown.
            `cap="butt"` because the export's arc ends on a true radial edge,
            and the track is the surface colour rather than the peach used by
            the "4/7" ring — over the photograph it reads as translucent cream. */}
        <ProgressRing
          value={timer.ring.value}
          max={timer.ring.max}
          r={RING.r}
          strokeWidth={RING.strokeWidth}
          trackClassName="stroke-surface"
          label={`${timer.display} ${timer.caption}`}
          className="ff-ring size-[clamp(150px,40vw,239px)] artboard:absolute artboard:left-[291px] artboard:top-[25px] artboard:h-[239px] artboard:w-[239px]"
          contentClassName="artboard:absolute artboard:inset-0 artboard:block"
        >
          <p className="ff-clock font-clock text-[clamp(2.25rem,8vw,3rem)] font-extralight leading-none text-ink artboard:absolute artboard:inset-x-0 artboard:top-[92px] artboard:text-[48px] artboard:leading-none">
            {timer.display}
          </p>
          <p className="ff-caption mt-2 text-sm leading-none text-ink sm:text-base artboard:absolute artboard:inset-x-0 artboard:top-[146px] artboard:mt-0 artboard:text-[15px] artboard:leading-none">
            {timer.caption}
          </p>
        </ProgressRing>

        <TransportControls />
        <ModeSelector activeId={activeMode} onSelect={setActiveMode} />
      </div>
    </section>
  );
}