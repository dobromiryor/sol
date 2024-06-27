import { useWeatherStore } from "../../stores/weather.store";
import { Card } from "../atoms/Card";
import { PressureIcon } from "./PressureIcon";

export const PressureCard = () => {
  const { data } = useWeatherStore();

  return (
    <Card
      title="Pressure"
      value={data.current.pressure}
      additionalDescription="hPa"
      isFallback={data.isFallback}
      visualizationIcon={<PressureIcon pressure={data.current.pressure} />}
      visualizationBottomDescription={
        <div className="flex w-full justify-between gap-1">
          <span>Low</span>
          <span>High</span>
        </div>
      }
    />
  );
};
