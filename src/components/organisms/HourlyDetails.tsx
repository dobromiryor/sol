import { useMemo, useState } from "react";
import { tabArr } from "../../consts/tabsArr";
import { Unit } from "../../enums/unit.enum";
import { useWeatherStore } from "../../stores/weather.store";
import { getWindIntensity } from "../../utils/getWindIntensity";
import { HourlyCard } from "../atoms/HourlyCard";
import { SkipToContent } from "../atoms/SkipToContent";
import { HumidityChart } from "../molecules/HumidityChart";
import { RainChart } from "../molecules/RainChart";
import { Tabs } from "../molecules/Tabs";
import { WindChart } from "../molecules/WindChart";

export const HourlyDetails = () => {
  const [selectedId, setSelectedId] = useState(tabArr[0].id);

  const { data, unit } = useWeatherStore();

  const todaysData = useMemo(
    () => data.hourly.filter((_, index) => index <= 23),
    [data.hourly]
  );

  const todaysRainAmount = useMemo(
    () => todaysData.reduce((prev, curr) => prev + (curr.rain?.["1h"] ?? 0), 0),
    [todaysData]
  );

  const todaysHighWind = useMemo(
    () => todaysData.reduce((prev, curr) => Math.max(prev, curr.wind_speed), 0),
    [todaysData]
  );

  const todaysAverageHumidity = useMemo(
    () =>
      todaysData.reduce((prev, curr) => prev + curr.humidity, 0) /
      todaysData.length,
    [todaysData]
  );

  const cards = useMemo(
    () => [
      <HourlyCard
        description="Today's amount"
        value={todaysRainAmount.toFixed(1)}
        unit="mm"
        chart={<RainChart />}
        valueSize="uniform"
      />,
      <HourlyCard
        description="Today's high"
        value={todaysHighWind.toFixed()}
        unit={unit === Unit.METRIC ? "m/s" : "mph"}
        valueDescription={getWindIntensity(todaysHighWind)}
        chart={<WindChart />}
      />,
      <HourlyCard
        description="Today's average"
        value={todaysAverageHumidity.toFixed()}
        unit="%"
        chart={<HumidityChart />}
      />,
    ],
    [todaysAverageHumidity, todaysRainAmount, unit, todaysHighWind]
  );

  return (
    <article
      id="hourly-details"
      aria-labelledby="#hourly-details-title"
      className="flex flex-col gap-2 select-none"
    >
      <h1 id="hourly-details-title">Hourly details</h1>

      <SkipToContent href="#top" destination="top" />

      <div className="flex flex-col gap-4 py-4 bg-primary rounded-xl">
        <Tabs selectedId={selectedId} setSelectedId={setSelectedId} />
        {cards[selectedId - 1]}
      </div>
    </article>
  );
};
