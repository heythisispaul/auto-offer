export const chunkArray = <T>(
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

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
