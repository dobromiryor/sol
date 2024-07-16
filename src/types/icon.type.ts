type MiscIcon = "settings" | "close" | "chevron_left" | "chevron_right";

type GeolocationIcon =
  | "location_on" // SUCCESS
  | "location_off" // DENIED/TIMEOUT
  | "not_listed_location" // IN_PROGRESS
  | "fmd_bad" // UNAVAILABLE
  | "person_pin_circle"; // isLocal

type TabIcon = "rainy" | "near_me" | "humidity_mid";

type AlertTagIcon =
  | "severe_cold"
  | "emergency_heat_2" /* extreme high temperature */
  | "sailing"
  | "tsunami"
  | "flood"
  | "rainy"
  | "weather_hail"
  | "thunderstorm"
  | "air" /* wind */
  | "tornado"
  | "cyclone"
  | "ac_unit"
  | "landslide" /* avalanches */
  | "airwave" /* air quality */
  | "snowing_heavy" /* sand/dust */
  | "mist"
  | "emergency_heat" /* fire warning */
  | "warning" /* other/fallback */;

export type IconType = MiscIcon | GeolocationIcon | TabIcon | AlertTagIcon;
