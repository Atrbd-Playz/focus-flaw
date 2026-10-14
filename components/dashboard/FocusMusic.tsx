import Image from "next/image";
import { NextTrackIcon, PlayGlyphIcon, PrevTrackIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { musicHeader, track } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * "Focus Music" — artwork, track meta, seek, transport and volume.
 *
 * The panel is the positioning context; on the artboard every block below the
 * heading is placed at a measured card-relative coordinate and
 * `.ff-music-body` collapses to zero height so it never competes with those
 * offsets. Below the artboard breakpoint it falls back to a normal flex
 * column.
 *
 * Progress/volume are real `<input type="range">` so they are keyboard
 * operable; the drawn track sits behind them (styled by `.ff-range`).
 */
export function FocusMusic({ className }: { className?: string }) {
  return (
    <Card
      alt
      className={cn(
        "ff-music flex flex-col gap-4 p-4 sm:p-5",
        "artboard:relative artboard:h-[151px] artboard:mt-[6px] artboard:gap-0 artboard:p-[11px_24px]",
        className,
      )}
    >
      <SectionHeader
        title={musicHeader.title}
        trailing={
          <button
            type="button"
            className="rounded-pill px-2 py-1 text-micro text-muted transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
          >
            {musicHeader.action}
          </button>
        }
      />

      <div className="ff-music-body flex min-w-0 flex-1 flex-col justify-center gap-3 artboard:block artboard:flex-none">
        {/* Artwork + meta */}
        <div className="ff-music-head flex min-w-0 items-center gap-3">
          <div className="ff-music-art size-16 shrink-0 overflow-hidden rounded-panel sm:size-[76px] artboard:absolute artboard:left-[22px] artboard:top-[45px] artboard:h-[76px] artboard:w-[76px] artboard:rounded-[10px]">
            <Image
              src={track.art}
              alt=""
              width={76}
              height={76}
              unoptimized
              sizes="(min-width: 640px) 76px, 64px"
              className="size-full object-cover"
            />
          </div>

          <div className="ff-music-meta min-w-0 flex-1 artboard:absolute artboard:left-[113px] artboard:top-[42px] artboard:right-[12px]">
            <p className="ff-music-track truncate font-micro text-sm font-medium text-ink">
              {track.title}
            </p>
            {/* The export sits the meta line straight under the title, with no gap. */}
            <div className="ff-music-sub mt-1 flex min-w-0 items-center gap-3 font-micro text-micro text-muted artboard:mt-0">
              <span className="truncate">{track.genre}</span>
              <span className="truncate">{track.duration}</span>
            </div>
          </div>
        </div>

        {/* Seek */}
        <div className="ff-music-seek flex items-center gap-2 artboard:absolute artboard:left-[113px] artboard:top-[81px] artboard:right-[28px]">
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={track.progress}
            aria-label="Seek"
            className="ff-range h-1.5 min-w-0 flex-1"
          />
        </div>

        {/* Transport + volume */}
        <div className="ff-music-controls flex items-center gap-1.5 artboard:absolute artboard:left-[116px] artboard:top-[90px] artboard:right-[28px] artboard:gap-[6px]">
          <TransportButton label="Previous track" className="ff-music-transport artboard:h-[29px] artboard:w-[29px]">
            <PrevTrackIcon className="size-7" />
          </TransportButton>

          <button
            type="button"
            aria-label="Play"
            className="ff-music-play grid size-10 shrink-0 place-items-center rounded-pill bg-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent artboard:h-[40px] artboard:w-[40px]"
          >
            <PlayGlyphIcon className="size-4" />
          </button>

          <TransportButton label="Next track" className="ff-music-transport artboard:h-[29px] artboard:w-[29px]">
            <NextTrackIcon className="size-7" />
          </TransportButton>

          {/* Speaker + slider hug the trailing edge: 16 + 11 + 58 = 85px. */}
          <div className="ff-music-volume flex min-w-0 items-center gap-2 artboard:ml-auto artboard:w-[85px] artboard:flex-none artboard:gap-[11px]">
            <svg
              viewBox="0 0 18 14"
              className="ff-music-speaker size-4 shrink-0 text-graphite"
              aria-hidden="true"
            >
              <path
                d="M1 5h3l4-4v12l-4-4H1z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 3.5a4 4 0 010 7M14.5 1a7 7 0 010 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={track.volume}
              aria-label="Volume"
              className="ff-range h-1.5 min-w-0 flex-1"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

/** Small prev/next glyph with a generous hit area and no visible chrome. */
function TransportButton({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-pill text-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent",
        className,
      )}
    >
      {children}
    </button>
  );
}