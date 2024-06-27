import { useWeatherStore } from "../../stores/weather.store";
import { Card } from "../atoms/Card";
import { HumidityBar } from "./HumidityBar";

export const HumidityCard = () => {
  const { data } = useWeatherStore();

  return (
    <Card
      title="Humidity"
      isFallback={data.isFallback}
      value={data.current.humidity}
      valueDescription="%"
      additionalDescription={`
            Dew point ${data.current.dew_point.toFixed()}°`}
      visualizationIcon={<HumidityBar humidity={data.current.humidity} />}
      visualizationTopDescription="100"
      visualizationBottomDescription="0"
    />
  );
};
