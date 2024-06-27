import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fallback } from "../consts/fallback";
import { Unit } from "../enums/unit.enum";
import { WeatherDTO } from "../types/weather.type";

interface WeatherState {
  unit: Unit;
  setUnit: (unit: Unit) => void;
  data: WeatherDTO;
  setData: (data: WeatherDTO) => void;
  isLocal: boolean;
  setIsLocal: (isLocal: boolean) => void;
}

const getWeatherFromStorage = () => {
  try {
    const weatherString = localStorage.getItem("weather");
    if (weatherString) {
      const weather: {
        state: Omit<WeatherState, "setUnit" | "setData" | "setIsLocal">;
      } = JSON.parse(weatherString);

      return weather.state;
    }
  } catch (error) {
    console.error("Error retrieving theme data from localStorage", error);
  }

  return undefined;
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      unit: getWeatherFromStorage()?.unit ?? Unit.METRIC,
      setUnit: (unit) => set({ unit }),
      data: getWeatherFromStorage()?.data ?? fallback,
      setData: (data) => set(() => ({ data })),
      isLocal: getWeatherFromStorage()?.isLocal ?? true,
      setIsLocal: (isLocal) => set({ isLocal }),
    }),
    {
      name: "weather",
      partialize: ({ data, isLocal, unit }) => ({ data, isLocal, unit }),
    }
  )
);
