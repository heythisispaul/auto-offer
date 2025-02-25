import { useState, useEffect, useCallback } from "preact/hooks";
import { constants } from "@/utils/common";
import { toReminderCadence } from "@/utils/reminding";
import { type ReminderCadence } from "@/types";

export const useReminderCadenceState = () => {
  const [reminderCadence, setReminderCadence] =
    useState<ReminderCadence | null>(null);

  const syncReminderCadence = useCallback(
    (changes: { [key: string]: chrome.storage.StorageChange }) => {
      const { newValue: newCadence } =
        changes[constants.storageKeys.reminderCadence] ?? {};

      if (newCadence) {
        setReminderCadence(toReminderCadence(newCadence));
      }
    },
    [],
  );

  useEffect(() => {
    chrome.storage.sync.get([constants.storageKeys.reminderCadence], (data) => {
      setReminderCadence(toReminderCadence(data.reminderCadence));
    });

    chrome.storage.onChanged.addListener(syncReminderCadence);

    return () => chrome.storage.onChanged.removeListener(syncReminderCadence);
  }, []);

  const updateReminderCadence = useCallback((value: ReminderCadence) => {
    chrome.storage.sync.set({ [constants.storageKeys.reminderCadence]: value });
  }, []);

  return [reminderCadence, updateReminderCadence] as const;
};
