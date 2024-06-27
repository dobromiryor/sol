import { Geocoding } from "./geolocations.type";

export interface Geocode {
  coords: GeolocationCoordinates | undefined;
  location: Geocoding | undefined;
}
