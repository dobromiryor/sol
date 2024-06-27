import { Unit } from "../enums/unit.enum";

interface IntensityMap {
  standard: { [key: number]: string };
  metric: { [key: number]: string };
  imperial: { [key: number]: string };
}

export const getWindIntensity = (
  speed: number | undefined,
  unit = Unit.METRIC
): string | undefined => {
  if (!speed) return;

  const intensityMap: IntensityMap = {
    standard: {
      0: "Calm",
      0.3: "Light air",
      1.6: "Light breeze",
      3.4: "Gentle breeze",
      5.5: "Moderate breeze",
      8: "Fresh breeze",
      10.8: "Strong breeze",
      13.9: "Moderate gale",
      17.2: "Fresh gale",
      20.8: "Strong gale",
      24.5: "Whole gale",
      28.5: "Storm",
      32.7: "Hurricane",
    },
    metric: {
      0: "Calm",
      0.3: "Light air",
      1.6: "Light breeze",
      3.4: "Gentle breeze",
      5.5: "Moderate breeze",
      8: "Fresh breeze",
      10.8: "Strong breeze",
      13.9: "Moderate gale",
      17.2: "Fresh gale",
      20.8: "Strong gale",
      24.5: "Whole gale",
      28.5: "Storm",
      32.7: "Hurricane",
    },
    imperial: {
      0: "Calm",
      1: "Light air",
      4: "Light breeze",
      8: "Gentle breeze",
      13: "Moderate breeze",
      19: "Fresh breeze",
      25: "Strong breeze",
      32: "Moderate gale",
      39: "Fresh gale",
      47: "Strong gale",
      55: "Whole gale",
      64: "Storm",
      73: "Hurricane",
    },
  };

  for (const threshold in intensityMap[unit]) {
    if (speed <= parseFloat(threshold)) {
      return intensityMap[unit][threshold];
    }
  }

  const intensityMapKeys = Object.keys(
    intensityMap[unit]
  ) as unknown as number[];

  return intensityMap[unit][intensityMapKeys.slice(-1)[0]];
};
