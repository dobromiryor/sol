import clsx from "clsx";
import { useWeatherStore } from "../../stores/weather.store";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { WeatherIcon } from "../atoms/WeatherIcon";

export const DailyForecast = () => {
  const { data } = useWeatherStore();

  return (
    <div className="flex flex-col gap-2 select-none">
      <span>Daily Forecast</span>

      <ul className="flex flex-col gap-1 transition-all">
        {data.daily.map((item, index) => (
          <li
            className="bg-primary text-inverted-text dark:text-text rounded-sm first:rounded-t-xl last:rounded-b-xl"
            key={`Daily__Forecast__${item.dt}__${index}`}
          >
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-2",
                data.isFallback && "blur"
              )}
            >
              <span>
                {index === 0
                  ? "Today"
                  : new Date(
                      getAdjustedTime(data.timezone_offset, item.dt)
                    ).toLocaleDateString("en-gb", {
                      weekday: "long",
                    })}
              </span>
              <div className="flex items-center gap-2">
                {item.pop > 0 && (
                  <span className="text-sm text-blue-300">
                    {(item.pop * 100).toFixed()}%
                  </span>
                )}
                <WeatherIcon icon={item.weather[0].icon} />
                <div>
                  <span>{item.temp.max.toFixed()}°</span>
                  <span>/</span>
                  <span>{item.temp.min.toFixed()}°</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
