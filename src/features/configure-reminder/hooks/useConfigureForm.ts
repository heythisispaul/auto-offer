import { useState, useEffect, useCallback } from "preact/hooks";
import { constants } from "@/utils/common";
import { ReminderCadence } from "@/types";

export const useConfigureForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reminderCadence, setReminderCadence] =
    useState<ReminderCadence>("Always");

  useEffect(() => {
    function updateReminderCadenceState(changes: {
      [key: string]: chrome.storage.StorageChange;
    }) {
      const { newValue: newCadence } =
        changes[constants.storageKeys.reminderCadence] ?? {};

      if (newCadence) {
        setReminderCadence(newCadence);
      }
    }

    setIsLoading(true);

    chrome.storage.sync.get([constants.storageKeys.reminderCadence], (data) => {
      setReminderCadence(data.reminderCadence ?? "Always");
      setIsLoading(false);
    });

    chrome.storage.onChanged.addListener(updateReminderCadenceState);

    return () =>
      chrome.storage.onChanged.removeListener(updateReminderCadenceState);
  }, []);

  const updateReminderCadence = useCallback((value: ReminderCadence) => {
    chrome.storage.sync.set({ [constants.storageKeys.reminderCadence]: value });
  }, []);

  return {
    isLoading,
    updateReminderCadence,
    reminderCadence,
  };
};
