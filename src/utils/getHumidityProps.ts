import { getClosestItem } from "./getClosestItem";

export const getHumidityColor = (humidity: number) => {
  const humidityColorMapStyles: { [key: string]: string } = {
    "0": "bg-amber-200",
    "5": "bg-amber-300",
    "10": "bg-amber-300",
    "15": "bg-amber-300",
    "20": "bg-amber-300",
    "25": "bg-amber-300",
    "30": "bg-amber-400",
    "35": "bg-amber-400",
    "40": "bg-amber-400",
    "45": "bg-amber-400",
    "50": "bg-amber-400",
    "55": "bg-amber-500",
    "60": "bg-amber-500",
    "65": "bg-amber-500",
    "70": "bg-amber-500",
    "75": "bg-amber-500",
    "80": "bg-amber-600",
    "85": "bg-amber-600",
    "90": "bg-amber-600",
    "95": "bg-amber-600",
    "100": "bg-amber-600",
  };

  return humidityColorMapStyles[
    getClosestItem(humidity, humidityColorMapStyles)
  ];
};

export const getHumidityProps = (humidity: number) => {
  const humidityScaleMapStyles: { [key: string]: string } = {
    "0": "scale-y-[0]",
    "5": "scale-y-[0.05]",
    "10": "scale-y-[0.1]",
    "15": "scale-y-[0.15]",
    "20": "scale-y-[0.2]",
    "25": "scale-y-[0.25]",
    "30": "scale-y-[0.3]",
    "35": "scale-y-[0.35]",
    "40": "scale-y-[0.4]",
    "45": "scale-y-[0.45]",
    "50": "scale-y-[0.5]",
    "55": "scale-y-[0.55]",
    "60": "scale-y-[0.6]",
    "65": "scale-y-[0.65]",
    "70": "scale-y-[0.7]",
    "75": "scale-y-[0.75]",
    "80": "scale-y-[0.8]",
    "85": "scale-y-[0.85]",
    "90": "scale-y-[0.90]",
    "95": "scale-y-[0.95]",
    "100": "scale-y-[1]",
  };

  return {
    color: getHumidityColor(humidity),
    scale:
      humidityScaleMapStyles[getClosestItem(humidity, humidityScaleMapStyles)],
  };
};
