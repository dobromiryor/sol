export const getClosestItem = <T extends { [key: string]: string }>(
  value: number,
  map: T
) => {
  return Object.keys(map).reduce((prev, curr) => {
    const prevDiff = Math.abs(value - parseInt(prev));
    const currDiff = Math.abs(value - parseInt(curr));
    return currDiff < prevDiff ? curr : prev;
  });
};
