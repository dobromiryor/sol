import { getClosestItem } from "./getClosestItem";

export const getUVIntensity = (uv: number) => {
  const UVIntensityMap: { [key: string]: string } = {
    "0": "Low",
    "1": "Low",
    "2": "Low",
    "3": "Moderate",
    "4": "Moderate",
    "5": "Moderate",
    "6": "High",
    "7": "High",
    "8": "Very High",
    "9": "Very High",
    "10": "Very High",
    "11": "Extreme",
  };

  if (uv > 11) {
    return UVIntensityMap[11];
  }

  return UVIntensityMap[getClosestItem(uv, UVIntensityMap)];
};
