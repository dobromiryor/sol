import { getRandomNumber } from "./randomNumber";

export const randomObjectItem = <T extends object>(obj: T) => {
  const objectKeys = Object.keys(obj);
  const selectedKeyIndex = getRandomNumber(0, objectKeys.length - 1);
  return obj[objectKeys[selectedKeyIndex] as keyof typeof obj];
};
