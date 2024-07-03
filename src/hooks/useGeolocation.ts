import { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { GeolocationStatus } from "../enums/geolocation-status.enum";
import { useGeolocationStore } from "../stores/geolocation.store";
import { useWeatherStore } from "../stores/weather.store";

export const useGeolocation = () => {
  const {
    coords,
    positionError,
    isGeolocationEnabled,
    isGeolocationAvailable,
  } = useGeolocated();

  const { setCoords, status, setStatus } = useGeolocationStore();
  const { setIsLocal } = useWeatherStore();

  useEffect(() => {
    setCoords(coords);
  }, [coords, setCoords]);

  useEffect(() => {
    if (
      !isGeolocationAvailable ||
      !isGeolocationEnabled ||
      positionError?.POSITION_UNAVAILABLE
    ) {
      setStatus(GeolocationStatus.UNAVAILABLE);
    }

    if (positionError?.PERMISSION_DENIED) {
      setStatus(GeolocationStatus.DENIED);
    }

    if (positionError?.TIMEOUT) {
      setStatus(GeolocationStatus.TIMEOUT);
    }

    if (
      coords &&
      isGeolocationAvailable &&
      isGeolocationEnabled &&
      positionError === undefined
    ) {
      setStatus(GeolocationStatus.SUCCESS);
    }
  }, [
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    setStatus,
  ]);

  useEffect(() => {
    if (status === GeolocationStatus.SUCCESS) {
      setIsLocal(true);
    }
  }, [setIsLocal, status]);

  return { coords, status };
};
