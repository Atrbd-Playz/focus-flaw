import { MusicIcon, PencilSquareIcon, PlusIcon, AmbientCloudIcon } from "@/components/icons";
import { ActionRow } from "@/components/ui/ActionRow";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { quickActions, sectionTitles } from "@/lib/data";
import { cn } from "@/lib/cn";

const ICONS = {
  plus: PlusIcon,
  pencil: PencilSquareIcon,
  cloud: AmbientCloudIcon,
  music: MusicIcon,
} as const;

/**
 * "Quick Actions" — four one-tap shortcuts.
 *
 * Artboard (329x235): four 34px rows on a 44px pitch, each a flat
 * `--color-row-quiet` slab with a 16px icon at the leading edge and a chevron
 * at the trailing edge. No border, no shadow. The rows deliberately break the
 * card's 12px rhythm (3px out on each side) because that is where the export
 * puts them.
 *
 * Responsive: one column on phones, two columns from sm (where the card is
 * only half the content width).
 */
export function QuickActions({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "ff-quick flex flex-col gap-4 p-4 sm:p-5",
        "artboard:flex-none artboard:h-[235px] artboard:w-[329px] artboard:gap-0 artboard:p-[11px_12px]",
        className,
      )}
    >
      <SectionHeader title={sectionTitles.quickActions} className="artboard:px-[12px]" />

      <div className="ff-quick-list grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 artboard:mt-[23px] artboard:ml-[-3px] artboard:mr-[-1px] artboard:gap-[10px]">
        {quickActions.map((action) => {
          const Icon = ICONS[action.icon];
          return (
            <ActionRow
              key={action.id}
              icon={<Icon className="size-4" />}
              label={action.label}
              showChevron
              className="ff-action-row artboard:h-[34px] artboard:gap-0 artboard:border-0 artboard:bg-row-quiet artboard:py-0 artboard:pr-[13px] artboard:pl-[14px]"
            />
          );
        })}
      </div>
    </Card>
  );
}