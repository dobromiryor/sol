import clsx from "clsx";
import { useWeatherStore } from "../../stores/weather.store";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { SkipToContent } from "../atoms/SkipToContent";
import { WeatherIcon } from "../atoms/WeatherIcon";

export const DailyForecast = () => {
  const { data } = useWeatherStore();

  return (
    <article
      id="daily-forecast"
      aria-labelledby="daily-forecast-title"
      className="flex flex-col gap-2 select-none"
    >
      <h1 id="daily-forecast-title">Daily Forecast</h1>

      <SkipToContent
        href="#current-conditions"
        destination="current conditions"
      />

      <ul className="flex flex-col gap-1 transition-all">
        {data.daily.map((item, index) => (
          <li
            className="bg-primary text-inverted-text dark:text-text rounded-sm first:rounded-t-xl last:rounded-b-xl"
            key={`Daily__Forecast__${item.dt}__${index}`}
            tabIndex={0}
          >
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-2",
                data.isFallback && "blur"
              )}
            >
              <time>
                {index === 0
                  ? "Today"
                  : new Date(
                      getAdjustedTime(data.timezone_offset, item.dt)
                    ).toLocaleDateString("en-gb", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    })}
              </time>
              <div className="flex items-center gap-2">
                {Math.round(item.pop * 10) * 10 > 0 && (
                  <span
                    aria-description="Probability of precipitation"
                    className="text-sm text-blue-300"
                  >
                    {Math.round(item.pop * 10) * 10}%
                  </span>
                )}
                <WeatherIcon
                  icon={item.weather[0].icon}
                  alt={item.weather[0].description}
                />
                <div>
                  <span aria-description="Highest">
                    {item.temp.max.toFixed()}°
                  </span>
                  <span aria-hidden>/</span>
                  <span aria-description="Lowest">
                    {item.temp.min.toFixed()}°
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};
