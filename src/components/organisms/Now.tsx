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
    <article aria-labelledby="now-title" className="flex flex-col select-none">
      <h1 id="now-title">Now</h1>

      <div
        className={clsx(
          "mb-20 flex flex-col xs:flex-row justify-between gap-4 transition-all",
          data.isFallback && "blur"
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-end">
            <h2 className="text-7xl font-bold">
              {data.current.temp.toFixed()}°
            </h2>
            <WeatherIcon
              icon={data.current.weather[0].icon}
              scale={2}
              alt=""
              aria-hidden
            />
          </div>
          <div className="flex gap-1 text-sm text-text/75">
            <span>High: {data.daily[0].temp.max.toFixed()}°</span>
            <div aria-hidden>•</div>
            <span>Low: {data.daily[0].temp.min.toFixed()}°</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 xs:items-end">
          <span className="capitalize">
            {data.current.weather[0].description}
          </span>
          <span className="text-sm text-text/75">
            Feels like {data.current.feels_like.toFixed()}°
          </span>
        </div>
      </div>
    </article>
  );
};
