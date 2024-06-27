export const getAdjustedTime = (timezoneOffset: number, dt?: number) => {
  const localTimestamp = dt ? dt * 1000 : Date.now();
  const localTimezoneOffset = new Date().getTimezoneOffset() * 1000 * 60;
  const utc = localTimestamp + localTimezoneOffset;

  return utc + 1000 * timezoneOffset;
};
