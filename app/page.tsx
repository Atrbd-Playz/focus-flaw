import { AppShell } from "@/components/layout/AppShell";
import { TimerHero } from "@/components/dashboard/TimerHero";
import { TodaysProgress } from "@/components/dashboard/TodaysProgress";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TasksCard } from "@/components/dashboard/TasksCard";
import { WeeklyOverview } from "@/components/dashboard/WeeklyOverview";
import { FocusMusic } from "@/components/dashboard/FocusMusic";

/**
 * Dashboard home page.
 *
 * Pure composition: the page owns no content and no state — every string,
 * list and number comes from `lib/data` (see docs/ARCHITECTURE.md).
 */
export default function Home() {
  return (
    <AppShell
      activeId="home"
      main={
        <>
          <TimerHero />
          <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2">
            <TodaysProgress />
            <QuickActions />
          </div>
        </>
      }
      aside={
        <>
          <TasksCard />
          <WeeklyOverview />
          <FocusMusic />
        </>
      }
    />
  );
}
