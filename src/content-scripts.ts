import { checkForReminder, watchForOfferButtons } from "./utils/scripts";
import { constants } from "./utils/common";
import { getCardOfferButtons, redeemAllOffers } from "./utils/amex";

const { actions, urls } = constants;

function init() {
  watchForOfferButtons(() => {
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
