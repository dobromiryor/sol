import { useEffect } from "react";
import useSWR from "swr";
import { useGeocodeStore } from "../stores/geocoding.store";
import { GeocodingDTO } from "../types/geolocations.type";

const API_URL = import.meta.env.VITE_OWM_URL;
const KEY = import.meta.env.VITE_OWM_KEY;

interface FetchGeocodeOptions {
  coords: GeolocationCoordinates | undefined;
  limit?: string | number;
}

const geocodingFetcher = async (
  key: string
): Promise<GeocodingDTO | undefined> => {
  return await fetch(key).then((res) => {
    return res.json();
  });
};

export const useReverseGeocoding = ({
  coords,
  limit = 1,
}: FetchGeocodeOptions) => {
  const { setGeocode } = useGeocodeStore();

  const input = new URL("/geo/1.0/reverse", API_URL);

  input.searchParams.set("lat", String(coords?.latitude));
  input.searchParams.set("lon", String(coords?.longitude));
  input.searchParams.set("appid", KEY);
  input.searchParams.set("limit", String(limit ?? 1));

  const key = input.href;

  const res = useSWR<GeocodingDTO | undefined>(
    coords !== undefined ? key : null,
    geocodingFetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (res.data?.[0]) {
      setGeocode(res.data?.[0]);
    }
  }, [coords, res.data, setGeocode]);

  return res;
};
