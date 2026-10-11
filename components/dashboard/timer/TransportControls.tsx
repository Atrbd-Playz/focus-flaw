import { PlayGlyphIcon, RefreshIcon, SlidersIcon } from "@/components/icons";

/**
 * TransportControls — reset · start/pause · timer settings.
 *
 * The three buttons are deliberately not evenly spaced in the design (22px
 * then 29px between centres); that asymmetry is reproduced in artboard mode
 * by placing each button at its measured coordinate rather than by a gap.
 */
export function TransportControls() {
  return (
    <div className="ff-transport flex items-center gap-4 sm:gap-6 artboard:absolute artboard:left-0 artboard:top-[280px] artboard:block artboard:h-[53px] artboard:w-full">
      <button
        type="button"
        aria-label="Reset timer"
        className="ff-refresh hairline grid size-10 place-items-center rounded-pill bg-surface text-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent artboard:absolute artboard:left-[323px] artboard:top-[7px] artboard:h-[39px] artboard:w-[39px] artboard:border-0 artboard:shadow-none"
      >
        <RefreshIcon className="size-5" />
      </button>

      <button
        type="button"
        aria-label="Start focus timer"
        className="ff-play grid size-[53px] place-items-center rounded-pill bg-graphite text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent artboard:absolute artboard:left-[384px] artboard:top-0 artboard:h-[53px] artboard:w-[53px]"
      >
        <PlayGlyphIcon className="size-6" />
      </button>

      <button
        type="button"
        aria-label="Timer settings"
        className="ff-sliders hairline grid size-10 place-items-center rounded-pill bg-surface text-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent artboard:absolute artboard:left-[466px] artboard:top-[7px] artboard:h-[39px] artboard:w-[39px] artboard:border-0 artboard:shadow-none"
      >
        <SlidersIcon className="size-5" />
      </button>
    </div>
  );
}