import clsx from "clsx";
import { useWeatherStore } from "../../stores/weather.store";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { ScrollButtons } from "../atoms/ScrollButtons";
import { SkipToContent } from "../atoms/SkipToContent";
import { WeatherIcon } from "../atoms/WeatherIcon";

export const HourlyForecast = () => {
  const { data } = useWeatherStore();

  return (
    <article
      id="hourly-forecast"
      aria-labelledby="hourly-forecast-title"
      className="flex flex-col gap-2 select-none overflow-clip"
    >
      <h1 id="hourly-forecast-title">Hourly forecast</h1>
      <SkipToContent href="#daily-forecast" destination="daily forecast" />

      <ScrollButtons>
        <ul
          aria-label="Forecast list"
          className="flex gap-6 px-4 py-4 max-w-full overflow-x-scroll scrollbar-none bg-primary text-inverted-text dark:text-text rounded-xl transition-all snap-x snap-proximity"
          tabIndex={0}
        >
          {data.hourly.map((item, index) => (
            <li
              className={clsx(
                "flex-shrink-0 flex flex-col justify-between items-center gap-1 min-w-10 snap-center",
                data.isFallback && "blur"
              )}
              key={`Hourly__Forecast__${item.dt}__${index}`}
              tabIndex={0}
            >
              <span aria-description="Temperature">{item.temp.toFixed()}°</span>
              {Math.round(item.pop * 10) * 10 > 0 ? (
                <span
                  aria-description="Probability of precipitation"
                  className="text-xs text-blue-300"
                >
                  {Math.round(item.pop * 10) * 10}%
                </span>
              ) : (
                <div className="w-1 h-4" />
              )}
              <div className="flex flex-col justify-center items-center">
                <WeatherIcon
                  icon={item.weather[0].icon}
                  alt={item.weather[0].description}
                />
                <time
                  id={`time-${index}`}
                  className="text-xs text-inverted-text/75 dark:text-text/75"
                >
                  {index === 0
                    ? "Now"
                    : new Date(
                        getAdjustedTime(data.timezone_offset, item.dt)
                      ).toLocaleTimeString("en-gb", {
                        timeStyle: "short",
                      })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      </ScrollButtons>
    </article>
  );
};
