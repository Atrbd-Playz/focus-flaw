import { KebabIcon, PlusIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { tasks, tasksHeader } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * "Today's Tasks" — the right-rail checklist.
 *
 * Every row is one recipe (see TaskRow); the Figma export copy-pasted a
 * 90-line block per row with a 15x duplicated kebab SVG. Data now drives it.
 *
 * Responsive: full-width card everywhere; it simply stacks below the main
 * column on narrow screens (handled by AppShell).
 */
export function TasksCard({ className }: { className?: string }) {
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <Card className={cn("flex flex-col gap-4 p-4 sm:p-5", className)}>
      <SectionHeader
        title={tasksHeader.title}
        trailing={
          <span className="text-md font-medium text-muted-subtle">
            {done}/{tasks.length}
          </span>
        }
      />

      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskRow title={task.title} time={task.time} checked={task.status === "done"} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="row-frame flex min-h-11 w-full items-center justify-center gap-2 px-3 py-2.5 text-tiny font-medium text-muted transition-colors hover:border-muted/70 focus-visible:outline-2 focus-visible:outline-accent"
      >
        <PlusIcon className="size-3.5" />
        {tasksHeader.addLabel}
      </button>
    </Card>
  );
}

/** One task: checkbox · title · time · overflow menu. */
function TaskRow({ title, time, checked }: { title: string; time: string; checked: boolean }) {
  return (
    <div className="row-frame flex items-center gap-3 px-3 py-2.5">
      <Checkbox checked={checked} aria-label={`Mark "${title}" as ${checked ? "not done" : "done"}`} />

      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-base text-ink", checked && "text-ink/70")}>{title}</p>
        <p className="truncate text-tiny font-medium text-muted">{time}</p>
      </div>

      <button
        type="button"
        aria-label={`More options for "${title}"`}
        className="grid size-7 shrink-0 place-items-center rounded-pill text-muted transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
      >
        <KebabIcon className="size-4" />
      </button>
    </div>
  );
}
