import { checkForReminder, watchForOfferButtons } from "./utils/scripts";
import { constants } from "./utils/common";
import { getCardOfferButtons, redeemAllOffers } from "./utils/amex";

const { actions, urls } = constants;

function init() {
  console.log("Content script loaded!");

  watchForOfferButtons(() => {
    console.log("Reminder fired");
    checkForReminder();
  });

  chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.action === actions.checkForOffers) {
      sendResponse(
        window.location.origin.includes(urls.amexBase) &&
          !!getCardOfferButtons(document).length,
      );
    }

    if (request.action === actions.acceptOffers) {
      const resultWithPath = (isSuccess: boolean) => ({
        isSuccess,
        pathname: window.location.pathname,
      });

      watchForOfferButtons((offers) => {
        // delay(5000).then(() => sendResponse(resultWithPath(true)));
        redeemAllOffers(offers)
          .then(() => sendResponse(resultWithPath(true)))
          .catch(() => sendResponse(resultWithPath(false)));
      });

      // See: https://developer.chrome.com/docs/extensions/develop/concepts/messaging
      return true;
    }
  });
}

init();
