import Image from "next/image";
import { NextTrackIcon, PlayGlyphIcon, PrevTrackIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { musicHeader, track } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * "Focus Music" — artwork, track meta, transport and volume.
 *
 * Responsive: artwork is a fixed square with `overflow-hidden` + `object-cover`
 * (the Figma export let it bleed outside the card), and the seek row collapses
 * to its natural width instead of using fixed pixel bars.
 *
 * Progress/volume are exposed as real <input type="range"> so they are
 * keyboard operable; the drawn track sits behind them.
 */
export function FocusMusic({ className }: { className?: string }) {
  return (
    <Card alt className={cn("flex flex-col gap-4 p-4 sm:p-5", className)}>
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

      {/* Artwork + meta */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="size-16 shrink-0 overflow-hidden rounded-panel sm:size-[76px]">
          <Image
            src={track.art}
            alt=""
            width={76}
            height={76}
            sizes="(min-width: 640px) 76px, 64px"
            className="size-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-micro text-sm font-medium text-ink">{track.title}</p>
          <div className="mt-1 flex items-center gap-3 font-micro text-micro text-muted">
            <span>{track.genre}</span>
            <span>{track.duration}</span>
          </div>

          {/* Seek bar */}
          <div className="mt-2 flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={track.progress}
              aria-label="Seek"
              className="ff-range h-1.5 min-w-0 flex-1"
            />
          </div>
        </div>
      </div>

      {/* Transport + volume */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <TransportButton label="Previous track">
            <PrevTrackIcon className="size-7" />
          </TransportButton>

          <button
            type="button"
            aria-label="Play"
            className="grid size-10 place-items-center rounded-pill bg-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <PlayGlyphIcon className="size-4" />
          </button>

          <TransportButton label="Next track">
            <NextTrackIcon className="size-7" />
          </TransportButton>
        </div>

        {/* Volume */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <svg viewBox="0 0 18 14" className="size-4 shrink-0 text-graphite" aria-hidden="true">
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
            className="ff-range h-1.5 min-w-0 flex-1 max-w-[96px]"
          />
        </div>
      </div>
    </Card>
  );
}

/** Transparent 44px hit area around the small prev/next glyphs. */
function TransportButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-9 place-items-center rounded-pill text-graphite transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-accent"
    >
      {children}
    </button>
  );
}
