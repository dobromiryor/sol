import { getClosestItem } from "./getClosestItem";

export const getWindDirection = (
  deg: number | undefined
): string | undefined => {
  if (deg === undefined) return;

  const normalizedDeg = (deg + 360) % 360;

  const sectors: { [key: string]: string } = {
    "0": "From north",
    "45": "From northeast",
    "90": "From east",
    "135": "From southeast",
    "180": "From south",
    "225": "From southwest",
    "270": "From west",
    "315": "From northwest",
  };

  return sectors[getClosestItem(normalizedDeg, sectors)];
};
