import useSWR from "swr";
import { GeocodingDTO } from "../types/geolocations.type";

const API_URL = import.meta.env.VITE_OWM_URL;
const KEY = import.meta.env.VITE_OWM_KEY;

interface FetchGeocodeOptions {
  q: string | undefined;
  limit?: string | number;
}

const geocodingFetcher = async (
  key: string
): Promise<GeocodingDTO | undefined> => {
  return await fetch(key).then((res) => {
    return res.json();
  });
};

export const useGeocoding = ({ q, limit = 5 }: FetchGeocodeOptions) => {
  const input = new URL("/geo/1.0/direct", API_URL);

  input.searchParams.set("q", q ?? "");
  input.searchParams.set("appid", KEY);
  input.searchParams.set("limit", String(limit));

  const key = input.href;

  const res = useSWR<GeocodingDTO | undefined>(
    typeof q === "string" && q.length > 0 ? key : null,
    geocodingFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return res;
};
