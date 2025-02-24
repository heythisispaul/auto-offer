import { constants } from "./common";
import { toReminderCadence, getShouldRemind } from "./reminding";

const { storageKeys, actions } = constants;

export const triggerReminder = () => {
  const now = new Date().toUTCString();

  chrome.runtime.sendMessage({ action: actions.reminder });
  chrome.storage.sync.set({
    [storageKeys.remindedAt]: now,
  });
};

export const checkForReminder = () => {
  chrome.storage.sync.get(
    [storageKeys.remindedAt, storageKeys.reminderCadence],
    (data) => {
      const reminderCadence = toReminderCadence(
        data[storageKeys.reminderCadence],
      );

      const remindedAt =
        data[storageKeys.remindedAt] ?? new Date().toUTCString();

      const shouldRemind = getShouldRemind(remindedAt, reminderCadence);

      if (shouldRemind) {
        triggerReminder();
      }
    },
  );
};

export const triggerOfferAccept = ({
  onComplete = () => {},
}: {
  onComplete: (isSuccess: boolean) => void;
}) => {
  chrome.tabs.query({ active: true }, ([tab]) => {
    if (tab?.id) {
      chrome.tabs.sendMessage(
        tab.id,
        { action: actions.acceptOffers },
        onComplete,
      );
    }
  });
};
