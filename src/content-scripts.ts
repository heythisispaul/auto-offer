import { getCardOfferButtons } from "./utils/amex";
import { constants } from "./utils/common";
import { getShouldRemind } from "./utils/reminding";

console.log("Content script loaded!");

chrome.runtime.onMessage.addListener((...stuff) => {
  console.log("message received");
  console.log(stuff);
  console.log(getCardOfferButtons(document));
});

chrome.storage.sync.get(
  [constants.storageKeys.remindedAt, constants.storageKeys.reminderCadence],
  (data) => {
    const reminderCadence = data[constants.storageKeys.reminderCadence];
    const remindedAt =
      data[constants.storageKeys.remindedAt] ?? new Date().toUTCString();

    const shouldRemind = getShouldRemind(remindedAt, reminderCadence);

    console.log("hey my stored data is", data);
    console.log("should remind?", getShouldRemind(remindedAt, reminderCadence));
  },
);
