import { Unit } from "../../enums/unit.enum";
import { useWeatherStore } from "../../stores/weather.store";
import { getWindDirection } from "../../utils/getWindDirection";
import { getWindIntensity } from "../../utils/getWindIntensity";
import { Card } from "../atoms/Card";
import { WindIcon } from "./WindIcon";

export const WindCard = () => {
  const { data, unit } = useWeatherStore();

  return (
    <Card
      title="Wind"
      value={data.current.wind_speed.toFixed()}
      valueDescription={unit === Unit.IMPERIAL ? "mph" : "m/s"}
      additionalDescription={`${getWindIntensity(
        data.current.wind_speed
      )} • ${getWindDirection(data.current.wind_deg)}`}
      isFallback={data.isFallback}
      visualizationIcon={
        <WindIcon
          aria-hidden
          degree={data.current.wind_deg}
          speed={data.current.wind_speed}
          unit={unit}
        />
      }
      visualizationTopDescription="N"
      visualizationSRDescription={`Wind direction, degrees (meteorological): ${data.current.wind_deg}`}
    />
  );
};
