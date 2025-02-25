import { delay, chunkArray, constants } from "./common";

export const getCardOfferButtons = (
  document: Document,
  opts: { buttonClass?: string; buttonText?: string } = {},
) => {
  const { buttonClass, buttonText } = {
    buttonClass: constants.selectors.amex.offerButtonClass,
    buttonText: constants.selectors.amex.offerButtonText,
    // buttonText: "add to card",
    ...opts,
  };

  const offerElements = Array.from(
    document?.getElementsByClassName(buttonClass) ?? [],
  ) as HTMLButtonElement[];

  const cardOfferButtons = offerElements.filter(
    (button) => button.innerText?.toLowerCase() === buttonText.toLowerCase(),
  );

  return cardOfferButtons;
};

export const redeemAllOffers = async (offerButtons: HTMLButtonElement[]) => {
  const offerButtonChunks = chunkArray(offerButtons, 4);

  for await (const chunk of offerButtonChunks) {
    chunk.forEach((button) => {
      button.click();
    });

    await delay(1700);
  }
};
