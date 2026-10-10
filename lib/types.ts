/**
 * Shared domain types for the FocusFlaw dashboard.
 * Components never invent data — they receive these shapes from `lib/data`.
 */

export type NavItemId = "home" | "pomodoro" | "tasks" | "calendar" | "statistics" | "notes" | "settings";

/** One entry in the left navigation (and the mobile bottom bar). */
export interface NavItem {
  id: NavItemId;
  label: string;
  /** Non-primary items are hidden from the bottom bar on small screens. */
  mobile?: boolean;
}

export type TimerModeId = "pomodoro" | "short" | "long";

/** A selectable focus mode under the timer. */
export interface TimerMode {
  id: TimerModeId;
  label: string;
  duration: string;
  /** Seconds used for display math (static in this frontend-only build). */
  seconds: number;
}

export type TaskStatus = "done" | "todo";

export interface Task {
  id: string;
  title: string;
  /** Display range exactly as designed, e.g. "9:00 - 10:15". */
  time: string;
  status: TaskStatus;
}

export interface StatTile {
  id: string;
  label: string;
  value: string;
}

export interface ProgressSummary {
  /** Completed pomodoros today. */
  done: number;
  /** Daily pomodoro goal. */
  goal: number;
}

export interface QuickAction {
  id: string;
  label: string;
  /** Which generated icon component to render (see components/icons). */
  icon: "plus" | "pencil" | "cloud" | "music";
}

export interface WeekPoint {
  /** Short day label, e.g. "Sun". */
  day: string;
  /** Completed pomodoros for that day — drives the bar height. */
  value: number;
}

export interface WeekChart {
  /** y-axis ticks, ascending. */
  ticks: number[];
  /** Highest value that maps to the top of the plot. */
  max: number;
  points: WeekPoint[];
}

export interface Track {
  title: string;
  /** Genre / collection label, e.g. "Chillhop". */
  genre: string;
  duration: string;
  /** Album artwork path under /public. */
  art: string;
  /** 0-100 playback position. */
  progress: number;
  /** 0-100 volume level. */
  volume: number;
}

export interface Greeting {
  title: string;
  subtitle: string;
}
