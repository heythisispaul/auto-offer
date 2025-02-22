import { delay, chunkArray } from "./common";

export const getCardOfferButtons = (
  document: Document,
  opts: { buttonClass?: string; buttonText?: string } = {},
) => {
  const { buttonClass, buttonText } = {
    buttonClass: "offer-cta",
    buttonText: "add to card",
    ...opts,
  };

  const cardOfferButtons = Array.from(
    document.getElementsByClassName(buttonClass),
  ).filter((button) => button.innerHTML === buttonText);

  return cardOfferButtons as HTMLButtonElement[];
};

export const redeemAllOffers = async (document: Document) => {
  const offerButtons = getCardOfferButtons(document);

  const offerButtonChunks = chunkArray(offerButtons, 5);

  for await (const chunk of offerButtonChunks) {
    chunk.forEach((button) => {
      button.click();
    });

    await delay(1500);
  }
};
