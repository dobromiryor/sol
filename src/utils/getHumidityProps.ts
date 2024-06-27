import { getClosestItem } from "./getClosestItem";

export const getHumidityProps = (humidity: number) => {
  const humidityMapStyles: { [key: string]: string } = {
    "0": "bg-amber-200 scale-y-0",
    "5": "bg-amber-200 scale-y-[0.05]",
    "10": "bg-amber-200 scale-y-[0.1]",
    "15": "bg-amber-300 scale-y-[0.15]",
    "20": "bg-amber-300 scale-y-[0.2]",
    "25": "bg-amber-300 scale-y-[0.25]",
    "30": "bg-amber-300 scale-y-[0.3]",
    "35": "bg-amber-400 scale-y-[0.35]",
    "40": "bg-amber-400 scale-y-[0.4]",
    "45": "bg-amber-400 scale-y-[0.45]",
    "50": "bg-amber-500 scale-y-50",
    "55": "bg-amber-500 scale-y-55",
    "60": "bg-amber-500 scale-y-[0.6]",
    "65": "bg-amber-500 scale-y-[0.65]",
    "70": "bg-amber-600 scale-y-[0.7]",
    "75": "bg-amber-600 scale-y-[0.75]",
    "80": "bg-amber-600 scale-y-[0.8]",
    "85": "bg-amber-600 scale-y-[0.85]",
    "90": "bg-amber-700 scale-y-90",
    "95": "bg-amber-700 scale-y-95",
    "100": "bg-amber-700 scale-y-100",
  };

  return humidityMapStyles[getClosestItem(humidity, humidityMapStyles)];
};
