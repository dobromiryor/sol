import { Unit } from "../enums/unit.enum";

interface IntensityMap {
  standard: { [key: number]: string };
  metric: { [key: number]: string };
  imperial: { [key: number]: string };
}

export const getWindProps = (speed: number, unit = Unit.METRIC) => {
  if (!speed) return;

  const intensityMapStyles: IntensityMap = {
    standard: {
      0: "fill-cyan-50",
      0.3: "fill-cyan-200",
      1.6: "fill-teal-200",
      3.4: "fill-green-300",
      5.5: "fill-green-400",
      8: "fill-lime-500",
      10.8: "fill-lime-400",
      13.9: "fill-yellow-400",
      17.2: "fill-yellow-500",
      20.8: "fill-amber-500",
      24.5: "fill-orange-600",
      28.5: "fill-red-600",
      32.7: "fill-red-700",
    },
    metric: {
      0: "fill-cyan-50",
      0.3: "fill-cyan-200",
      1.6: "fill-teal-200",
      3.4: "fill-green-300",
      5.5: "fill-green-400",
      8: "fill-lime-500",
      10.8: "fill-lime-400",
      13.9: "fill-yellow-400",
      17.2: "fill-yellow-500",
      20.8: "fill-amber-500",
      24.5: "fill-orange-600",
      28.5: "fill-red-600",
      32.7: "fill-red-700",
    },
    imperial: {
      0: "fill-cyan-50",
      1: "fill-cyan-200",
      4: "fill-teal-200",
      8: "fill-green-300",
      13: "fill-green-400",
      19: "fill-lime-500",
      25: "fill-lime-400",
      32: "fill-yellow-400",
      39: "fill-yellow-500",
      47: "fill-amber-500",
      55: "fill-orange-600",
      64: "fill-red-600",
      73: "fill-red-700",
    },
  };

  for (const threshold in intensityMapStyles[unit]) {
    if (speed <= parseFloat(threshold)) {
      return intensityMapStyles[unit][threshold];
    }
  }

  const intensityMapKeys = Object.keys(
    intensityMapStyles[unit]
  ) as unknown as number[];

  return intensityMapStyles[unit][intensityMapKeys.slice(-1)[0]];
};
