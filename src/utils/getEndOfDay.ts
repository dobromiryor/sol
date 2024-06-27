import { getAdjustedTime } from "./getAdjustedTime";

export const getEndOfDay = () => {
  const date = new Date();

  const endOfDayDate = Date.parse(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    ).toISOString()
  );

  return getAdjustedTime(new Date().getTimezoneOffset(), endOfDayDate) / 1000;
};
