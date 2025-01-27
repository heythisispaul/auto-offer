export const chunkArray = <T extends unknown>(
  array: T[],
  chunkSize: number
) => {
  const chunks = [];
  const arrayCopy = [...array];

  while (arrayCopy.length) {
    chunks.push(arrayCopy.splice(0, chunkSize));
  }

  return chunks;
};

export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
