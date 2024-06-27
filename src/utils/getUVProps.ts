import { getClosestItem } from "./getClosestItem";

export const getUVProps = (uv: number) => {
  const UVMapStyles: { [key: string]: string } = {
    "0": "fill-green-400 scale-y-0",
    "1": "fill-green-400 scale-y-[0.09]",
    "2": "fill-yellow-400 scale-y-[0.18]",
    "3": "fill-yellow-500 scale-y-[0.27]",
    "4": "fill-amber-400 scale-y-[0.36]",
    "5": "fill-amber-500 scale-y-[0.45]",
    "6": "fill-orange-400 scale-y-[0.54]",
    "7": "fill-orange-500 scale-y-[0.63]",
    "8": "fill-red-400 scale-y-[0.72]",
    "9": "fill-red-500 scale-y-[0.81]",
    "10": "fill-purple-400 scale-y-[0.90]",
    "11": "fill-purple-500 scale-y-100",
  };
  const UVBackgroundMapStyles: { [key: string]: string } = {
    "0": "fill-green-200",
    "1": "fill-green-200",
    "2": "fill-yellow-200",
    "3": "fill-yellow-300",
    "4": "fill-amber-200",
    "5": "fill-amber-300",
    "6": "fill-orange-200",
    "7": "fill-orange-300",
    "8": "fill-red-200",
    "9": "fill-red-300",
    "10": "fill-purple-200",
    "11": "fill-purple-300",
  };

  if (uv > 11) {
    return { bg: UVBackgroundMapStyles[11], fg: UVMapStyles[11] };
  }

  return {
    bg: UVBackgroundMapStyles[getClosestItem(uv, UVMapStyles)],
    fg: UVMapStyles[getClosestItem(uv, UVMapStyles)],
  };
};
