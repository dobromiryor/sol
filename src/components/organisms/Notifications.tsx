import { useCallback, useMemo } from "react";
import { useWeatherStore } from "../../stores/weather.store";
import { Daily } from "../../types/weather.type";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { RainNotification } from "../molecules/RainNotification";
import { TrendNotification } from "../molecules/TrendNotification";

export const Notifications = () => {
  const { data } = useWeatherStore();

  const currentHour = useMemo(
    () =>
      Number(
        new Date(
          getAdjustedTime(data.timezone_offset, data.current.dt)
        ).toLocaleTimeString("en-gb", { hour: "numeric", hourCycle: "h24" })
      ),
    [data]
  );

  const beforeEndOfDay = useMemo(
    () => currentHour > 20 && currentHour < 24,
    [currentHour]
  );

  const nextThreeDays = useMemo(
    () => data.daily.filter((_, index) => index <= 2),
    [data.daily]
  );

  const hasIncreasingTrend = useCallback((arr: Daily[]) => {
    let isIncreasing = true;

    for (let i = 1; i < arr.length; i++) {
      const diff = arr[i].temp.max - arr[i - 1].temp.max;
      if (diff === 0) {
        continue;
      }
      if (isIncreasing && diff < 0) {
        return false;
      } else if (!isIncreasing && diff > 0) {
        return false;
      }
      isIncreasing = diff > 0;
    }

    return isIncreasing;
  }, []);

  const hasDecresingTrend = useCallback(
    (arr: Daily[]) => hasIncreasingTrend(arr.reverse()),
    [hasIncreasingTrend]
  );

  return beforeEndOfDay &&
    (hasIncreasingTrend(nextThreeDays) || hasDecresingTrend(nextThreeDays)) ? (
    <TrendNotification
      trend={hasIncreasingTrend(nextThreeDays) ? "increasing" : "deacreasing"}
    />
  ) : (
    <RainNotification />
  );
};
