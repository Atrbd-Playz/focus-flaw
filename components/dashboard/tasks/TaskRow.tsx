import { KebabIcon } from "@/components/icons";
import { Checkbox } from "@/components/ui/Checkbox";

/**
 * One row of the task checklist: checkbox · title · time · overflow menu.
 *
 * Artboard (353x57, 4px apart): a flat `--color-row` slab with no border. The
 * checkbox sits 13px in, the text column starts 30px after it, and the title
 * / time pair is top-aligned rather than vertically centred — the export
 * keeps the time closer to the title than to the row's midpoint.
 *
 * Semantics: the row itself is not interactive (its two controls are real
 * buttons), so it is plain markup and screen readers get one clean stop.
 */
export function TaskRow({
  title,
  time,
  checked,
}: {
  title: string;
  time: string;
  checked: boolean;
}) {
  return (
    <div className="ff-task-row row-frame flex w-full items-center gap-3 px-3 py-2.5 artboard:h-[57px] artboard:gap-[30px] artboard:border-0 artboard:rounded-panel artboard:bg-row artboard:py-0 artboard:pr-[2px] artboard:pl-[13px]">
      <Checkbox checked={checked} className="ff-task-check artboard:flex-none" />

      <span className="ff-task-text min-w-0 flex-1 artboard:self-stretch artboard:flex artboard:flex-col artboard:justify-start artboard:gap-[8px] artboard:pt-[5px]">
        <span className="ff-task-title block truncate text-base font-medium text-ink artboard:text-[15px] artboard:leading-[21px]">
          {title}
        </span>
        <span className="ff-task-time block truncate text-tiny text-muted-subtle artboard:text-[11px] artboard:leading-[14px]">
          {time}
        </span>
      </span>

      <button
        type="button"
        aria-label={`More options for ${title}`}
        className="ff-task-menu grid size-7 shrink-0 place-items-center rounded-pill text-muted transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
      >
        <KebabIcon className="size-4" />
      </button>
    </div>
  );
}