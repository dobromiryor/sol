import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Geocoding } from "../types/geolocations.type";

interface GeocodeState {
  geocode: Geocoding | undefined;
  setGeocode: (geocode: Geocoding | undefined) => void;
}

const getGeocodeFromStorage = () => {
  try {
    const geocodingString = localStorage.getItem("geocoding");
    if (geocodingString) {
      const geocoding: { state: { geocode: Geocoding | undefined } } =
        JSON.parse(geocodingString);

      return geocoding.state.geocode;
    }
  } catch (error) {
    console.error("Error retrieving geocoding data from localStorage", error);
  }

  return undefined;
};

export const useGeocodeStore = create<GeocodeState>()(
  persist(
    (set) => ({
      geocode: getGeocodeFromStorage(),
      setGeocode: (geocode) => set({ geocode }),
    }),
    {
      name: "geocoding",
      partialize: ({ geocode }) => ({ geocode }),
    }
  )
);
