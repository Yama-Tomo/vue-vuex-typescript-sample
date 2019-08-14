export const pluralize = (wordLength: number, word: string) =>
  wordLength === 1 ? word : word + 's';

export const objectToArray = <T extends Record<string, any>>(obj: T) => {
  const array: Array<{ key: keyof T; value: T[keyof T] }> = [];

  for (const key of Object.keys(obj) as Array<keyof T>) {
    array.push({ key, value: obj[key] });
  }

  return array;
};
