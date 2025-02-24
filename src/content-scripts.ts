import { getCardOfferButtons, redeemAllOffers } from "./utils/amex";
import { checkForReminder } from "./utils/scripts";
import { constants } from "./utils/common";

const { actions } = constants;

function init() {
  console.log("Content script loaded!");

  const offerCardReminderObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const offerButtons = getCardOfferButtons(mutation.target as Document);

      if (offerButtons.length) {
        console.log("Reminder fired");
        checkForReminder();
        offerCardReminderObserver.disconnect();
        break;
      }
    }
  });

  offerCardReminderObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.action === actions.acceptOffers) {
      console.log("Accepting offers");
      redeemAllOffers(document)
        .then(() => sendResponse(true))
        .catch(() => sendResponse(false));

      // See: https://developer.chrome.com/docs/extensions/develop/concepts/messaging
      return true;
    }
  });
}

init();
