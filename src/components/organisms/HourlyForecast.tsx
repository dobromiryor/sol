import clsx from "clsx";
import { useWeatherStore } from "../../stores/weather.store";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { WeatherIcon } from "../atoms/WeatherIcon";

export const HourlyForecast = () => {
  const { data } = useWeatherStore();

  return (
    <div className="flex flex-col gap-2 select-none">
      <span>Hourly forecast</span>

      <ul className="flex gap-6 px-4 py-4 max-w-full overflow-x-scroll scrollbar-none bg-primary text-inverted-text dark:text-text rounded-xl transition-all">
        {data.hourly.map((item, index) => (
          <li
            className={clsx(
              "flex-shrink-0 flex flex-col justify-between items-center min-w-10",
              data.isFallback && "blur"
            )}
            key={`Hourly__Forecast__${item.dt}__${index}`}
          >
            <span aria-label="Temperature">{item.temp.toFixed()}°</span>
            {Math.round(item.pop * 10) * 10 > 0 ? (
              <span
                aria-label="Probability of precipitation"
                className="text-sm text-blue-300"
              >
                {Math.round(item.pop * 10) * 10}%
              </span>
            ) : (
              <div className="w-1 h-5" />
            )}
            <div className="flex flex-col justify-center items-center">
              <WeatherIcon
                icon={item.weather[0].icon}
                alt={item.weather[0].description}
              />
              <span className="text-sm text-inverted-text/75 dark:text-text/75">
                {index === 0
                  ? "Now"
                  : new Date(
                      getAdjustedTime(data.timezone_offset, item.dt)
                    ).toLocaleTimeString("en-gb", {
                      timeStyle: "short",
                    })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
