import { JSXInternal } from "preact/src/jsx";
import { constants } from "./utils/common";

export type ReminderCadence = (typeof constants.reminderCadences)[number];

// TODO: See if Preact has a better way to type this.
export type Children =
  | JSXInternal.Element
  | JSXInternal.Element[]
  | string
  | string[]
  | null
  | null[];

export enum ClaimState {
  CLAIMED = "CLAIMED",
  CLAIMING = "CLAIMING",
  UNCLAIMED = "UNCLAIMED",
  ERROR = "ERROR",
}
