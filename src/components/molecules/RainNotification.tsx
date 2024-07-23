import { useMemo } from "react";
import { useWeatherStore } from "../../stores/weather.store";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { Notification } from "../atoms/Notification";

export const RainNotification = () => {
  const { data } = useWeatherStore();

  const expectedRain = useMemo(
    () =>
      data.hourly
        .filter((_, index) => index <= 12)
        .find(({ rain, pop }) => rain?.["1h"] && rain["1h"] > 0.5 && pop > 0.5),
    [data.hourly]
  );

  if (!expectedRain) return null;

  return (
    <a href="#hourly-details">
      <Notification
        icon="rainy"
        content={`Rain likely around ${new Date(
          getAdjustedTime(data.timezone_offset, expectedRain.dt)
        ).toLocaleTimeString("en-gb", { timeStyle: "short" })}`}
      />
    </a>
  );
};
