import { useWeatherStore } from "../../stores/weather.store";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { WindIcon } from "./WindIcon";

export const WindChart = () => {
  const { data, unit } = useWeatherStore();

  return (
    <ul className="flex gap-4 px-4 max-w-full overflow-x-scroll scrollbar-none ">
      {data.hourly.map((item) => (
        <li
          className="flex flex-col justify-end items-center gap-1 h-28"
          key={`Hourly__Wind__${item.dt}`}
        >
          <WindIcon
            degree={item.wind_deg}
            speed={item.wind_speed}
            unit={unit}
          />
          <span className="text-xs">{item.wind_speed.toFixed()}</span>
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
