import clsx from "clsx";
import { useWeatherStore } from "../../stores/weather.store";
import { Hourly } from "../../types/weather.type";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { getClosestItem } from "../../utils/getClosestItem";

export const RainChart = () => {
  const { data } = useWeatherStore();

  const getRainProps = (item: Hourly) => {
    const noRainStyles = "border-blue-200 bg-transparent rounded h-0";

    if (item.rain?.["1h"] === undefined || item.rain?.["1h"] < 0.25)
      return noRainStyles;

    const styles = {
      "0": "border-blue-200 bg-blue-200 rounded-lg h-1",
      "1": "border-blue-300 bg-blue-300 rounded-lg h-2",
      "2": "border-blue-400 bg-blue-400 rounded-lg h-3",
      "3": "border-blue-500 bg-blue-500 rounded-lg h-4",
      "4": "border-blue-500 bg-blue-500 rounded-lg h-5",
      "5": "border-blue-600 bg-blue-600 rounded-lg h-6",
      "6": "border-blue-600 bg-blue-600 rounded-lg h-7",
      "7": "border-blue-700 bg-blue-700 rounded-lg h-8",
      "8": "border-blue-800 bg-blue-800 rounded-lg h-9",
      "9": "border-blue-900 bg-blue-900 rounded-lg h-10",
      "10": "border-blue-950 bg-blue-950 rounded-lg h-12",
    };

    if (item.rain["1h"] > 10) return styles["10"];

    const closestItem = getClosestItem(
      item.rain?.["1h"],
      styles
    ) as keyof typeof styles;

    return styles[closestItem];
  };

  return (
    <ul
      className="flex gap-4 px-4 max-w-full overflow-x-scroll scrollbar-none"
      tabIndex={0}
    >
      {data.hourly.map((item) => (
        <li
          className="flex flex-col justify-end items-center gap-1 h-28"
          key={`Hourly__Rain__${item.dt}`}
        >
          {item.rain?.["1h"] ? (
            <span
              aria-label="Precipitation, mm/h"
              className="text-xs text-inverted-text/75 dark:text-text/75"
            >
              {item.rain?.["1h"] >= 0.25
                ? item.rain?.["1h"].toFixed(1)
                : "<0.25"}
            </span>
          ) : (
            <div className="w-4 h-4" />
          )}
          <div
            className={clsx(
              "border p-0.5 w-8 transition-all duration-1000",
              getRainProps(item)
            )}
          />
          <span aria-label="Probability of precipitation" className="text-xs">
            {Math.round(item.pop * 10) * 10}%
          </span>
          <span className="text-xs text-inverted-text/75 dark:text-text/75">
            {new Date(
              getAdjustedTime(data.timezone_offset, item.dt)
            ).toLocaleTimeString("en-gb", { timeStyle: "short" })}
          </span>
        </li>
      ))}
    </ul>
  );
};
