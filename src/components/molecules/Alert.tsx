import clsx from "clsx";
import { useEffect, useState } from "react";
import { useWeatherStore } from "../../stores/weather.store";
import { type Alert as AlertType } from "../../types/weather.type";
import { getAdjustedTime } from "../../utils/getAdjustedTime";
import { getAlertIcon } from "../../utils/getAlertIcon";
import { Icon } from "../atoms/Icon";

interface AlertProps {
  item: AlertType;
  className?: string;
}

export const Alert = ({ item, className }: AlertProps) => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(0);

  const { data } = useWeatherStore();

  useEffect(() => {
    if (item.tags.length > 0) {
      setVisibleIndex((prev) => (prev === null ? 0 : prev));

      let intervalId: ReturnType<typeof setInterval> | undefined = undefined;

      const handleCallback = () => {
        setVisibleIndex((prev) => {
          if (prev === null) {
            return 0;
          }

          if (prev === item.tags.length - 1) {
            return 0;
          }

          return prev + 1;
        });
      };

      intervalId = setInterval(handleCallback, 1500);

      return () => clearInterval(intervalId);
    }
  }, [item.tags.length]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 p-4 rounded-sm first:rounded-t-xl last:rounded-b-xl bg-red-800 text-rose-200 text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-shrink-0 flex justify-center items-center box-content p-2 w-6 h-6 bg-red-300 text-rose-950 rounded-lg">
          {item.tags.map((tag, index) => (
            <Icon
              className={clsx(
                "absolute transition-opacity duration-500",
                visibleIndex === index ? "opacity-100" : "opacity-0"
              )}
              key={`Alert__Icon__Tag__${tag}`}
              icon={getAlertIcon(tag)}
              size="24"
            />
          ))}
        </div>
        <span className="text-lg">{item.event}</span>
      </div>
      {item.event !== item.description && <span>{item.description}</span>}
      <div className="flex flex-wrap gap-1 text-red-300">
        <span>{item.sender_name}</span>
        <span>•</span>
        <div>
          <span>Start: </span>
          <span>
            {new Date(
              getAdjustedTime(data.timezone_offset, item.start)
            ).toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </div>
        <span>•</span>
        <div>
          <span>End: </span>
          <span>
            {new Date(
              getAdjustedTime(data.timezone_offset, item.end)
            ).toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
