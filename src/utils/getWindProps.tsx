import { Unit } from "../enums/unit.enum";

interface IntensityMap {
  standard: Record<string, string>;
  metric: Record<string, string>;
  imperial: Record<string, string>;
}

export const getWindProps = (speed: number, unit = Unit.METRIC) => {
  const metricStyles = {
    "0.0": "fill-slate-50",
    "0.3": "fill-slate-50",
    "1.6": "fill-slate-100",
    "3.4": "fill-slate-150",
    "5.5": "fill-slate-200",
    "8.0": "fill-slate-250",
    "10.8": "fill-slate-300",
    "13.9": "fill-slate-350",
    "17.2": "fill-slate-400",
    "20.8": "fill-slate-450",
    "24.5": "fill-slate-500",
    "28.5": "fill-slate-550",
    "32.7": "fill-slate-600",
  };

  const imperialStyles = {
    "0": "fill-slate-50",
    "1": "fill-slate-50",
    "4": "fill-slate-100",
    "8": "fill-slate-150",
    "13": "fill-slate-200",
    "19": "fill-slate-250",
    "25": "fill-slate-300",
    "32": "fill-slate-350",
    "39": "fill-slate-400",
    "47": "fill-slate-450",
    "55": "fill-slate-500",
    "64": "fill-slate-550",
    "73": "fill-slate-600",
  };

  const intensityMap: IntensityMap = {
    standard: metricStyles,
    metric: metricStyles,
    imperial: imperialStyles,
  };

  for (const threshold in intensityMap[unit]) {
    if (speed <= parseFloat(threshold)) {
      return intensityMap[unit][threshold];
    }
  }

  const intensityMapKeys = Object.keys(intensityMap[unit]);

  return intensityMap[unit][intensityMapKeys.slice(-1)[0]];
};
