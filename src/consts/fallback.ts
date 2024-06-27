import { Daily, Hourly, Minutely, WeatherDTO } from "../types/weather.type";
import { getRandomNumber } from "../utils/randomNumber";
import { randomObjectItem } from "../utils/randomObjectItem";
import { weatherFallback } from "./weatherFallback";

const TEMP_MIN = getRandomNumber(-10, 25);
const TEMP_MAX = getRandomNumber(TEMP_MIN, TEMP_MIN + 15);
const TEMP = getRandomNumber(TEMP_MIN, TEMP_MAX);
const WEATHER = randomObjectItem(weatherFallback);
const PRESSURE = getRandomNumber(900, 1100);
const HUMIDITY = getRandomNumber(0, 100);
const DEW_POINT = getRandomNumber(0, 15);
const CLOUDS = getRandomNumber(0, 100);
const UVI = getRandomNumber(0, 11);
const VISIBILITY = getRandomNumber(0, 10000);

const WIND_DEG = getRandomNumber(0, 359);
const WIND_SPEED = getRandomNumber(0, 20);
const WIND_GUST = getRandomNumber(WIND_SPEED, 40);

export const fallback: WeatherDTO = {
  lat: 42.1593,
  lon: 24.7497,
  alerts: [],
  hourly: Array(48)
    .fill(null)
    .map((_, index): Hourly => {
      const TEMP_MIN = getRandomNumber(-10, 25);
      const TEMP_MAX = getRandomNumber(TEMP_MIN, TEMP_MIN + 15);
      const TEMP = getRandomNumber(TEMP_MIN, TEMP_MAX);
      const WEATHER = randomObjectItem(weatherFallback);
      const PRESSURE = getRandomNumber(900, 1100);
      const HUMIDITY = getRandomNumber(0, 100);
      const DEW_POINT = getRandomNumber(0, 15);
      const CLOUDS = getRandomNumber(0, 100);
      const UVI = getRandomNumber(0, 11);
      const POP = getRandomNumber(0, 1);
      const WIND_DEG = getRandomNumber(0, 359);
      const WIND_SPEED = getRandomNumber(0, 20);
      const WIND_GUST = getRandomNumber(WIND_SPEED, 40);

      return {
        dt: Date.now() + 1000 * 60 * 60 * (index + 1),
        temp: TEMP,
        feels_like: TEMP,
        pressure: PRESSURE,
        humidity: HUMIDITY,
        dew_point: DEW_POINT,
        wind_speed: WIND_SPEED,
        wind_gust: WIND_GUST,
        wind_deg: WIND_DEG,
        clouds: CLOUDS,
        visibility: VISIBILITY,
        uvi: UVI,
        pop: POP,
        weather: [WEATHER],
      };
    }),
  minutely: Array(60)
    .fill(null)
    .map((_, index): Minutely => {
      return {
        dt: Date.now() + 1000 * 60 * (index + 1),
        precipitation: getRandomNumber(0, 3),
      };
    }),
  timezone: "Europe/Sofia",
  timezone_offset: 10800,
  daily: Array(8)
    .fill(null)
    .map((_, index): Daily => {
      const TEMP_MIN = getRandomNumber(-10, 25);
      const TEMP_MAX = getRandomNumber(TEMP_MIN, TEMP_MIN + 15);
      const TEMP = getRandomNumber(TEMP_MIN, TEMP_MAX);
      const WEATHER = randomObjectItem(weatherFallback);
      const PRESSURE = getRandomNumber(900, 1100);
      const HUMIDITY = getRandomNumber(0, 100);
      const DEW_POINT = getRandomNumber(0, 15);
      const CLOUDS = getRandomNumber(0, 100);
      const UVI = getRandomNumber(0, 11);
      const POP = getRandomNumber(0, 1);
      const MOON_PHASE = getRandomNumber(0, 1);
      const WIND_DEG = getRandomNumber(0, 359);
      const WIND_SPEED = getRandomNumber(0, 20);
      const WIND_GUST = getRandomNumber(WIND_SPEED, 40);

      return {
        dt: Date.now() + 1000 * 60 * 60 * 24 * (index + 1),
        sunrise: Date.now() - 1000 * 60 * 60 * 6,
        sunset: Date.now() + 1000 * 60 * 60 * 6,
        moon_phase: MOON_PHASE,
        moonrise: Date.now() + 1000 * 60 * 60 * 6,
        moonset: Date.now() - 1000 * 60 * 60 * 6,
        summary: "There will be clear sky today",
        temp: {
          min: TEMP_MIN,
          max: TEMP_MAX,
          day: TEMP,
          eve: TEMP,
          morn: TEMP_MIN,
          night: TEMP_MIN,
        },
        feels_like: {
          day: TEMP,
          eve: TEMP,
          morn: TEMP_MIN,
          night: TEMP_MIN,
        },
        pressure: PRESSURE,
        humidity: HUMIDITY,
        dew_point: DEW_POINT,
        wind_speed: WIND_SPEED,
        wind_gust: WIND_GUST,
        wind_deg: WIND_DEG,
        clouds: CLOUDS,
        uvi: UVI,
        pop: POP,
        weather: [WEATHER],
      };
    }),
  current: {
    dt: Date.now(),
    sunrise: Date.now() - 1000 * 60 * 60 * 6,
    sunset: Date.now() + 1000 * 60 * 60 * 6,
    temp: TEMP,
    feels_like: TEMP,
    pressure: PRESSURE,
    humidity: HUMIDITY,
    dew_point: DEW_POINT,
    clouds: CLOUDS,
    uvi: UVI,
    visibility: VISIBILITY,
    wind_deg: WIND_DEG,
    wind_gust: WIND_GUST,
    wind_speed: WIND_SPEED,
    weather: [WEATHER],
  },
  isFallback: true,
};
