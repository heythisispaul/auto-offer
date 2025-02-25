export const chunkArray = <T>(array: T[], chunkSize: number) => {
  const chunks = [];
  const arrayCopy = [...array];

  while (arrayCopy.length) {
    chunks.push(arrayCopy.splice(0, chunkSize));
  }

  return chunks;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const constants = {
  reminderCadences: ["Always", "Daily", "Weekly", "Monthly", "Never"],
  urls: {
    amexBase: "https://global.americanexpress.com",
    repo: "https://github.com/heythisispaul/auto-offer",
  },
  paths: {
    allOffers: "/offers/eligible",
    issues: "/issues",
  },
  actions: {
    reminder: "reminder",
    checkForOffers: "checkForOffers",
    acceptOffers: "acceptOffers",
    openTab: "openTab",
  },
  selectors: {
    amex: {
      offerButtonClass: "offer-cta",
      offerButtonText: "add to card",
    },
  },
  storageKeys: {
    reminderCadence: "reminderCadence",
    remindedAt: "remindedAt",
  },
} as const;
