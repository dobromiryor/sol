import clsx from "clsx";
import { useWeatherStore } from "../../stores/weather.store";
import { Hourly } from "../../types/weather.type";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { getClosestItem } from "../../utils/getClosestItem";
import { getHumidityColor } from "../../utils/getHumidityProps";

export const HumidityChart = () => {
  const { data } = useWeatherStore();

  const getHumidityProps = (item: Hourly) => {
    const styles = {
      "0": "rounded-[2px] h-0.5",
      "10": "rounded-[4px] h-1",
      "20": "rounded-[5px] h-2",
      "30": "rounded-[6px] h-3",
      "40": "rounded-[7px] h-4",
      "50": "rounded-[8px] h-5",
      "60": "rounded-[9px] h-6",
      "70": "rounded-[10px] h-7",
      "80": "rounded-[12px] h-8",
      "90": "rounded-[14px] h-9",
      "100": "rounded-[16px] h-10",
    };

    const closestItem = getClosestItem(
      item.humidity,
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
          <span
            aria-label="Humidity"
            className="text-xs text-inverted-text/75 dark:text-text/75"
          >
            {item.humidity}%
          </span>

          <div
            className={clsx(
              "p-0.5 w-8 transition-all duration-1000",
              getHumidityColor(item.humidity),
              getHumidityProps(item)
            )}
          />
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
