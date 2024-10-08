import clsx from "clsx";
import { useState } from "react";
import { useWeatherStore } from "../../stores/weather.store";
import { Button } from "../atoms/Button";
import { Alert } from "../molecules/Alert";

export const Alerts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data } = useWeatherStore();

  if (!data.alerts || data.alerts.length === 0) {
    return null;
  }

  return (
    <div className="relative select-none">
      <div className="flex flex-col gap-1">
        {isExpanded ? (
          data.alerts.map((item, index) => (
            <Alert
              key={`Alert__${item.event}__${item.start}__${item.end}__${index}`}
              item={item}
              className={clsx(data.alerts!.length > 1 && "last:pb-[66px]")}
            />
          ))
        ) : (
          <Alert
            item={data.alerts[0]}
            className={clsx(data.alerts.length > 1 && "last:pb-[66px]")}
          />
        )}
      </div>

      {data.alerts.length > 1 && (
        <Button
          buttonStyle="alert"
          className="absolute bottom-4 right-4"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={isExpanded ? "Show less alerts" : "Show more alerts"}
        >
          {isExpanded ? "See less" : "See more"}
        </Button>
      )}
    </div>
  );
};
