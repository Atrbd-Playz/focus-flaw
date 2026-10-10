import type {
  Greeting,
  NavItem,
  ProgressSummary,
  QuickAction,
  StatTile,
  Task,
  TimerMode,
  Track,
  WeekChart,
} from "@/lib/types";

/* ============================================================================
 *  lib/data — every string, number and list the dashboard renders.
 * ----------------------------------------------------------------------------
 *  This is the ONLY place content lives. Components receive it as props, so
 *  the UI is presentational and the copy can be swapped for an API later
 *  without touching a single component. Values are transcribed from the
 *  Figma export (see docs/STYLEGUIDE.md § Content).
 * ========================================================================== */

export const brand = {
  name: "FocusFlaw",
  tagline: "Small steps, Big Progress",
} as const;

export const greeting: Greeting = {
  title: "Good evening, Abdur Rahman",
  subtitle: "Stay Focused, you’re doing great!",
};

export const searchHint = "Ctrl + K";

/* --- Navigation -----------------------------------------------------------*/

export const navItems: NavItem[] = [
  { id: "home", label: "Home", mobile: true },
  { id: "pomodoro", label: "Pomodoro", mobile: true },
  { id: "tasks", label: "Tasks", mobile: true },
  { id: "calendar", label: "Calendar" },
  { id: "statistics", label: "Statistics", mobile: true },
  { id: "notes", label: "Notes" },
  { id: "settings", label: "Settings" },
];

/** Items shown in the mobile bottom bar (max 4 + a "more" affordance). */
export const mobileNavItems = navItems.filter((n) => n.mobile);

/* --- Timer ----------------------------------------------------------------*/

export const timerModes: TimerMode[] = [
  { id: "pomodoro", label: "Pomodoro", duration: "25 mins", seconds: 25 * 60 },
  { id: "short", label: "Short Break", duration: "5 mins", seconds: 5 * 60 },
  { id: "long", label: "Long Break", duration: "15 mins", seconds: 15 * 60 },
];

export const timer = {
  /** Label under the digits. */
  caption: "Focus Time",
  /** Formatted display value (static in this frontend-only build). */
  display: "25:00",
  mode: "Pomodoro",
  quote: "“ Focus is a skill that you can build ”",
  /**
   * Decorative sweep of the countdown ring, in the same 0-max units the
   * ProgressRing takes. Transcribed from the Figma arc (~42% of the circle);
   * a live timer would derive this from the remaining seconds.
   */
  ring: { value: 42, max: 100 },
} as const;

/* --- Today's Progress -----------------------------------------------------*/

export const progress: ProgressSummary = { done: 4, goal: 7 };

export const progressStats: StatTile[] = [
  { id: "focus-time", label: "Focus Time", value: "2h 35m" },
  // The Figma export reads "Daily Steak"; corrected here to "Streak".
  { id: "streak", label: "Daily Streak", value: "5" },
];

/* --- Quick Actions --------------------------------------------------------*/

export const quickActions: QuickAction[] = [
  { id: "add-todo", label: "Add Todos", icon: "plus" },
  { id: "write-note", label: "Write Notes", icon: "pencil" },
  { id: "ambient", label: "Ambient Sounds", icon: "cloud" },
  { id: "play-songs", label: "Play Songs", icon: "music" },
];

/* --- Tasks ----------------------------------------------------------------*/

export const tasks: Task[] = [
  { id: "t1", title: "Finish Website UI Design", time: "9:00 - 10:15", status: "done" },
  { id: "t2", title: "Write Project Documents", time: "1:00 - 3:00", status: "done" },
  { id: "t3", title: "Study DSA (Graph)", time: "6:00 - 10:00", status: "todo" },
  { id: "t4", title: "Edit YouTube Video", time: "9:00 - 10:15", status: "todo" },
  { id: "t5", title: "Plan For Tomorrow", time: "11:30 - 12:00", status: "todo" },
];

export const tasksHeader = { title: "Today's Tasks", addLabel: "Add Todos" } as const;

/* --- Weekly Overview ------------------------------------------------------*/

export const weekChart: WeekChart = {
  ticks: [0, 2, 4, 6],
  max: 6,
  points: [
    { day: "Sun", value: 4 },
    { day: "Mon", value: 3 },
    { day: "Tue", value: 5 },
    { day: "Wed", value: 1.5 },
    { day: "Thu", value: 3 },
    { day: "Fri", value: 5 },
    { day: "Sat", value: 4.5 },
  ],
};

export const weekHeader = { title: "Weekly Overview", range: "This week" } as const;

/* --- Focus Music ----------------------------------------------------------*/

export const track: Track = {
  title: "Lo-fi Beats for Deep Work",
  genre: "Chillhop",
  duration: "2h 15m",
  art: "/CatOverlookingAPastelMountainLake1.png",
  progress: 66,
  volume: 71,
};

export const musicHeader = { title: "Focus Music", action: "View All" } as const;

/* --- Section titles reused across cards -----------------------------------*/

export const sectionTitles = {
  progress: "Today’s Progress",
  quickActions: "Quick Actions",
} as const;
