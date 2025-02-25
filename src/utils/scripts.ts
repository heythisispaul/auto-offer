import { constants } from "./common";
import { getCardOfferButtons } from "./amex";
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

export const triggerNewTab = (url: string) => {
  chrome.runtime.sendMessage({ action: actions.openTab, value: url });
};

// export const getCanGetOffers = (onComplete = () => {}) => {
//   chrome.tabs.query({ active: true }, ([tab]) => {
//     if (tab?.id) {
//       chrome.tabs.sendMessage(
//         tab.id,
//         { action: actions.checkForOffers },
//         onComplete,
//       );
//     }
//   });
// };

// export const triggerOfferAccept = ({
//   onComplete = () => {},
// }: {
//   onComplete: ({
//     isSuccess,
//     pathname,
//   }: {
//     isSuccess: boolean;
//     pathname: string;
//   }) => void;
// }) => {
//   chrome.tabs.query({ active: true }, ([tab]) => {
//     if (tab?.id) {
//       chrome.tabs.sendMessage(
//         tab.id,
//         { action: actions.acceptOffers },
//         onComplete,
//       );
//     }
//   });
// };

export const triggerAndAwaitMessage = <T>({
  action,
  value,
  onComplete,
}: {
  action: keyof typeof constants.actions;
  value?: unknown;
  onComplete: (response: T) => void;
}) => {
  chrome.tabs.query({ active: true }, ([tab]) => {
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, { action, value }, onComplete);
    }
  });
};

export const watchForOfferButtons = (
  onButtonsFound?: (offerButtons: HTMLButtonElement[]) => void,
) => {
  const offerButtonsFromInitial = getCardOfferButtons(document);

  if (offerButtonsFromInitial.length) {
    onButtonsFound?.(offerButtonsFromInitial);
    return;
  }

  const offerCardObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const offerButtons = getCardOfferButtons(mutation.target as Document);

      if (offerButtons.length) {
        onButtonsFound?.(offerButtons);
        offerCardObserver.disconnect();
        break;
      }
    }
  });

  offerCardObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
};
