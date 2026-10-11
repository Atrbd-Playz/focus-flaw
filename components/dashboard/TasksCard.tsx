import { PlusIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TaskRow } from "@/components/dashboard/tasks/TaskRow";
import { tasks, tasksHeader } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * "Today's Tasks" — the right-rail checklist.
 *
 * The Figma export copy-pasted a 90-line block per row with a 15x duplicated
 * kebab SVG; here every row is one <TaskRow> driven by `lib/data`.
 *
 * Artboard (370x446): five 57px rows on a 61px pitch, then the "Add Todos"
 * button pinned to the bottom of the card by `artboard:mt-auto`. The heading
 * is the one card title the export draws at 20px, and its "2/5" counter stops
 * 31px short of the card edge rather than sitting flush — both are on the
 * SectionHeader's `className` below.
 *
 * Responsive: full width everywhere; it simply stacks under the main column
 * on narrow screens (handled by AppShell).
 */
export function TasksCard({ className }: { className?: string }) {
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <Card
      className={cn(
        "ff-tasks flex flex-col gap-4 p-4 sm:p-5",
        "artboard:h-[446px] artboard:gap-0 artboard:bg-surface-raised artboard:pt-[11px] artboard:pr-[6px] artboard:pb-[11px] artboard:pl-[11px]",
        className,
      )}
    >
      <SectionHeader
        title={tasksHeader.title}
        className="artboard:pr-[31px] artboard:[&_h2]:text-[20px]"
        trailing={
          <span className="text-md font-medium text-muted-subtle">
            {done}/{tasks.length}
          </span>
        }
      />

      <ul className="ff-task-list flex flex-col gap-2 artboard:mt-[35px] artboard:gap-[4px]">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskRow title={task.title} time={task.time} checked={task.status === "done"} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="ff-task-add row-frame flex min-h-11 w-full items-center justify-center gap-2 px-3 py-2.5 text-tiny font-medium text-muted transition-colors hover:border-muted/70 focus-visible:outline-2 focus-visible:outline-accent artboard:mt-auto artboard:h-[34px] artboard:min-h-0 artboard:border-0 artboard:bg-btn-quiet artboard:text-[13px]"
      >
        <PlusIcon className="size-3.5" />
        {tasksHeader.addLabel}
      </button>
    </Card>
  );
}