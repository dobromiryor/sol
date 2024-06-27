import { useWeatherStore } from "../../stores/weather.store";
import { getUVIntensity } from "../../utils/getUVIntensity";
import { Card } from "../atoms/Card";
import { SunIcon } from "./SunIcon";

export const UVCard = () => {
  const { data } = useWeatherStore();

  return (
    <Card
      title="UV index"
      value={data.current.uvi.toFixed()}
      additionalDescription={getUVIntensity(data.current.uvi)}
      isFallback={data.isFallback}
      visualizationTopDescription={"11+"}
      visualizationIcon={<SunIcon uv={data.current.uvi} />}
      visualizationBottomDescription="0"
    />
  );
};
