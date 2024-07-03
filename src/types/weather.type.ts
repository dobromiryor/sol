export interface WeatherDTO {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Minutely[];
  hourly: Hourly[];
  daily: Daily[];
  alerts?: Alert[];
  isFallback?: boolean;
}

export interface Current {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  rain?: CurrentRain;
  snow?: CurrentSnow;
  weather: Weather[];
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Minutely {
  dt: number;
  precipitation: number;
}

export interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  pop: number;
  rain?: CurrentRain;
  snow?: CurrentSnow;
  weather: Weather[];
}

export interface Daily {
  dt: number;
  sunrise?: number;
  sunset?: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export enum AlertTag {
  EXTREME_LOW_TEMPERATURE = "Extreme low temperature",
  EXTREME_HIGH_TEMPERATURE = "Extreme high temperature",
  MARINE_EVENT = "Marine event",
  COASTAL_EVENT = "Coastal event",
  FLOOD = "Flood",
  RAIN = "Rain",
  HAIL = "Hail",
  THUNDERSTORM = "Thunderstorm",
  WIND = "Wind",
  TORNADO = "Tornado",
  CYCLONE = "Cyclone",
  SNOW_ICE = "Snow ice",
  AVALANCHES = "Avalanches",
  AIR_QUALITY = "Air quality",
  SAND_DUST = "Sand dust",
  FOG = "Fog",
  FIRE_WARNING = "Fire warning",
  OTHER_DANGERS = "Other dangers",
}

export interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: (AlertTag | string)[];
}

interface RainOrSnow {
  "1h"?: number;
}

export interface CurrentRain extends RainOrSnow {}
export interface CurrentSnow extends RainOrSnow {}
