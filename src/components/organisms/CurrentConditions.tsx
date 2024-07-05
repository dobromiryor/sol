import { SkipToContent } from "../atoms/SkipToContent";
import { HumidityCard } from "../molecules/HumidityCard";
import { PressureCard } from "../molecules/PressureCard";
import { SunriseAndSunsetCard } from "../molecules/SunriseAndSunsetCard";
import { UVCard } from "../molecules/UVCard";

import { WindCard } from "../molecules/WindCard";

export const CurrentConditions = () => {
  return (
    <article
      id="current-conditions"
      aria-labelledby="current-conditions-title"
      className="flex flex-col gap-2 select-none"
    >
      <h1 id="current-conditions-title">Current Conditions</h1>
      <SkipToContent href="#hourly-details" destination="hourly details" />

      <ul className="grid grid-cols-2 gap-2">
        <WindCard />
        <HumidityCard />
        <UVCard />
        <PressureCard />
        <SunriseAndSunsetCard />
      </ul>
    </article>
  );
};
