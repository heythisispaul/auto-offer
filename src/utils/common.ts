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
  actions: {
    reminder: "reminder",
    acceptOffers: "acceptOffers",
  },
  selectors: {
    offerLists: {},
  },
  storageKeys: {
    reminderCadence: "reminderCadence",
    remindedAt: "remindedAt",
  },
} as const;
