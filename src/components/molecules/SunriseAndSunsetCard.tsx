import clsx from "clsx";
import { useWeatherStore } from "../../stores/weather.store";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { SunProgress } from "./SunProgress";

export const SunriseAndSunsetCard = () => {
  const { data } = useWeatherStore();

  if (!data.current.sunrise || !data.current.sunset) {
    return null;
  }

  const getDaylightLeft = (
    dt: number,
    sunset: number,
    timezoneOffset: number
  ) => {
    const localDt = new Date(dt * 1000 + timezoneOffset * 1000);
    const localSunset = new Date(sunset * 1000 + timezoneOffset * 1000);

    if (localDt >= localSunset) {
      return "00:00";
    }

    const msLeft = localSunset.getTime() - localDt.getTime();

    const h = Math.floor(msLeft / (1000 * 60 * 60)) % 24;
    const m = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));

    const formatedH = h.toString().padStart(2, "0");
    const formatedM = m.toString().padStart(2, "0");

    return `${formatedH}:${formatedM}`;
  };

  return (
    <li
      className="col-span-2 flex flex-col gap-1 p-4 bg-primary text-inverted-text dark:text-text rounded-xl text-sm"
      tabIndex={0}
    >
      <span>Sunrise & sunset</span>

      <div
        className={clsx(
          "flex justify-between items-center gap-4 transition-all h-full",
          data.isFallback && "blur"
        )}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <span className="text-xs text-inverted-text/75 dark:text-text/75">
              Sunlight left
            </span>
            <span className="text-2xl">
              {getDaylightLeft(
                data.current.dt,
                data.current.sunset,
                data.timezone_offset
              )}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-inverted-text/75 dark:text-text/75">
              Local time
            </span>
            <span className="text-2xl">
              {new Date(
                getAdjustedTime(data.timezone_offset, data.current.dt)
              ).toLocaleTimeString("en-gb", {
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SunProgress
            aria-hidden
            dt={getAdjustedTime(data.timezone_offset, data.current.dt)}
            sunrise={getAdjustedTime(
              data.timezone_offset,
              data.current.sunrise
            )}
            sunset={getAdjustedTime(data.timezone_offset, data.current.sunset)}
          />
          <div className="flex justify-between text-xs text-inverted-text/75 dark:text-text/75">
            <div className="flex flex-col items-center">
              <span>Sunrise</span>
              <span className="text-sm">
                {new Date(
                  getAdjustedTime(data.timezone_offset, data.current.sunrise)
                ).toLocaleTimeString("en-gb", {
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span>Sunset</span>
              <span className="text-sm">
                {new Date(
                  getAdjustedTime(data.timezone_offset, data.current.sunset)
                ).toLocaleTimeString("en-gb", {
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
