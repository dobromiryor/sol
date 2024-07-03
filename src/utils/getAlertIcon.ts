import { IconType } from "../types/icon.type";
import { AlertTag } from "../types/weather.type";

export const getAlertIcon = (tag: AlertTag | string): IconType => {
  if (!Object.values(AlertTag).includes(tag as AlertTag)) {
    return "warning";
  }

  switch (tag) {
    case AlertTag.EXTREME_LOW_TEMPERATURE:
      return "severe_cold";
    case AlertTag.EXTREME_HIGH_TEMPERATURE:
      return "emergency_heat_2";
    case AlertTag.MARINE_EVENT:
      return "sailing";
    case AlertTag.COASTAL_EVENT:
      return "tsunami";
    case AlertTag.FLOOD:
      return "flood";
    case AlertTag.RAIN:
      return "rainy";
    case AlertTag.HAIL:
      return "weather_hail";
    case AlertTag.THUNDERSTORM:
      return "thunderstorm";
    case AlertTag.WIND:
      return "air";
    case AlertTag.TORNADO:
      return "tornado";
    case AlertTag.CYCLONE:
      return "cyclone";
    case AlertTag.SNOW_ICE:
      return "ac_unit";
    case AlertTag.AVALANCHES:
      return "landslide";
    case AlertTag.AIR_QUALITY:
      return "airwave";
    case AlertTag.SAND_DUST:
      return "snowing_heavy";
    case AlertTag.FOG:
      return "mist";
    case AlertTag.FIRE_WARNING:
      return "emergency_heat";
    default:
      return "warning";
  }
};
