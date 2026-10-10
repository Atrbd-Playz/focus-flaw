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
 * Responsive: two columns from sm (matching the design's vertical list in a
 * narrow card), one column below.
 */
export function QuickActions({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col gap-4 p-5 sm:p-6", className)}>
      <SectionHeader title={sectionTitles.quickActions} />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-1">
        {quickActions.map((action) => {
          const Icon = ICONS[action.icon];
          return (
            <ActionRow key={action.id} icon={<Icon className="size-5" />} label={action.label} showChevron />
          );
        })}
      </div>
    </Card>
  );
}
