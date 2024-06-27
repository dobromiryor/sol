import { create } from "zustand";
import { GeolocationStatus } from "../enums/geolocation-status.enum";

interface GeolocationState {
  coords: GeolocationCoordinates | undefined;
  setCoords: (coords: GeolocationCoordinates | undefined) => void;
  status: GeolocationStatus;
  setStatus: (status: GeolocationStatus) => void;
}

export const useGeolocationStore = create<GeolocationState>((set) => ({
  coords: undefined,
  setCoords: (coords) => set(() => ({ coords })),
  status: GeolocationStatus.IN_PROGRESS,
  setStatus: (status) => set(() => ({ status })),
}));
