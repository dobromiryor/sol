import clsx from "clsx";
import { useWeatherByCoords } from "../../hooks/useWeather";
import { useGeocodeStore } from "../../stores/geocoding.store";
import { useGeolocationStore } from "../../stores/geolocation.store";
import { useWeatherStore } from "../../stores/weather.store";
import { WeatherIcon } from "../atoms/WeatherIcon";

export const Now = () => {
  const { data, isLocal, unit } = useWeatherStore();
  const { coords } = useGeolocationStore();
  const { geocode } = useGeocodeStore();

  useWeatherByCoords({
    coords:
      !isLocal && geocode
        ? { latitude: geocode.lat, longitude: geocode.lon }
        : undefined,
    unit,
  });
  useWeatherByCoords({
    coords:
      isLocal && coords
        ? { latitude: coords.latitude, longitude: coords.longitude }
        : undefined,
    unit,
  });

  return (
    <div
      className={clsx(
        "mb-20 flex justify-between transition-all select-none",
        data.isFallback && "blur"
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-end">
          <span className="text-6xl font-bold">
            {data.current.temp.toFixed()}°
          </span>
          <WeatherIcon
            icon={data.current.weather[0].icon}
            scale={2}
            alt={data.current.weather[0].description}
          />
        </div>
        <div className="flex gap-1 text-sm text-text/75">
          <span>High: {data.daily[0].temp.max.toFixed()}°</span>
          <span>•</span>
          <span>Low: {data.daily[0].temp.min.toFixed()}°</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="capitalize">
          {data.current.weather[0].description}
        </span>
        <span className="text-sm text-text/75">
          Feels like {data.current.feels_like.toFixed()}°
        </span>
      </div>
    </div>
  );
};
