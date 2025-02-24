import { delay, chunkArray } from "./common";

export const getCardOfferButtons = (
  document: Document,
  opts: { buttonClass?: string; buttonText?: string } = {},
) => {
  const { buttonClass, buttonText } = {
    buttonClass: "offer-cta",
    // buttonText: "add to card",
    buttonText: "learn more",
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

export const redeemAllOffers = async (document: Document) => {
  const offerButtons = getCardOfferButtons(document);

  const offerButtonChunks = chunkArray(offerButtons, 4);

  for await (const chunk of offerButtonChunks) {
    chunk.forEach((button) => {
      button.click();
    });

    await delay(1700);
  }
};
