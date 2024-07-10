import { getAdjustedTime } from "./getAdjustedTime";

export const getStartOfDay = () => {
  const date = new Date();

  const startOfDayDate = Date.parse(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    ).toISOString()
  );

  return getAdjustedTime(new Date().getTimezoneOffset(), startOfDayDate) / 1000;
};
