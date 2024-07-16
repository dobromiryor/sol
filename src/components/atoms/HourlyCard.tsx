import clsx from "clsx";
import { ReactNode } from "react";
import { useWeatherStore } from "../../stores/weather.store";

interface HourlyCardProps {
  description: string;
  value: number | string;
  unit?: string;
  valueDescription?: string;
  chart: ReactNode;
  valueSize?: "uniform" | "differ";
}

export const HourlyCard = ({
  description,
  value,
  unit,
  valueDescription,
  valueSize = "differ",
  chart,
}: HourlyCardProps) => {
  const { data } = useWeatherStore();

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 text-inverted-text dark:text-text overflow-hidden",
        data.isFallback && "blur"
      )}
    >
      <div className="flex flex-col">
        <span className="px-4 text-xs text-inverted-text/75 dark:text-text/75">
          {description}
        </span>
        <div className="px-4">
          <span className="text-2xl">{value}</span>
          {unit && (
            <span
              className={clsx(valueSize === "uniform" ? "text-2xl" : "text-sm")}
            >
              {" "}
              {unit}
            </span>
          )}
          {valueDescription && (
            <span
              className={clsx(valueSize === "uniform" ? "text-2xl" : "text-sm")}
            >
              {" "}
              • {valueDescription}
            </span>
          )}
        </div>
      </div>
      {chart}
    </div>
  );
};
