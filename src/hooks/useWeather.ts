import { useEffect } from "react";
import useSWR from "swr";
import { Unit } from "../enums/unit.enum";
import { useWeatherStore } from "../stores/weather.store";
import { WeatherDTO } from "../types/weather.type";

const API_URL = import.meta.env.VITE_OWM_URL;
const KEY = import.meta.env.VITE_OWM_KEY;

interface FetchWeatherOptions {
  coords:
    | {
        latitude: number | undefined;
        longitude: number | undefined;
      }
    | undefined;
  unit?: Unit;
}

const url = "/data/3.0/onecall";

const weatherFetcher = async (key: string): Promise<WeatherDTO | undefined> => {
  return await fetch(key).then((res) => {
    return res.json();
  });
};

export const useWeatherByCoords = ({ coords, unit }: FetchWeatherOptions) => {
  const { setData: setWeather } = useWeatherStore();
  const input = new URL(url, API_URL);

  input.searchParams.set("lat", String(coords?.latitude));
  input.searchParams.set("lon", String(coords?.longitude));
  input.searchParams.set("appid", KEY);
  input.searchParams.set("units", unit ?? Unit.METRIC);

  const key = input.href;

  const res = useSWR<WeatherDTO | undefined>(
    coords !== undefined ? key : null,
    weatherFetcher,
    {
      focusThrottleInterval: 1000 * 60 * 30 /* 30 minutes */,
			dedupingInterval: 1000 * 60 * 1 /* 1 minute */
    }
  );

  useEffect(() => {
    if (res.data !== undefined) {
      setWeather(res.data);
    }
  }, [res.data, setWeather]);

  return res;
};
