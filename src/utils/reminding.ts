import { type ReminderCadence } from "@/types";
import { constants } from "./common";

export const dateDiffDays = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const toReminderCadence = <T>(
  value: T,
  fallback: ReminderCadence = "Always",
) =>
  constants.reminderCadences.includes(value as ReminderCadence)
    ? (value as ReminderCadence)
    : fallback;

export const getShouldRemind = (
  remindedAt: string,
  remindingCadence: ReminderCadence,
) => {
  const now = new Date();
  const lastRemindedAt = new Date(remindedAt);
  const daysSinceLastReminded = dateDiffDays(now, lastRemindedAt);

  switch (remindingCadence) {
    case "Always":
      return true;
    case "Daily":
      return daysSinceLastReminded > 1;
    case "Weekly":
      return daysSinceLastReminded > 7;
    case "Monthly":
      return daysSinceLastReminded > 30;
    default:
      return false;
  }
};
