import { HumidityCard } from "../molecules/HumidityCard";
import { PressureCard } from "../molecules/PressureCard";
import { SunriseAndSunsetCard } from "../molecules/SunriseAndSunsetCard";
import { UVCard } from "../molecules/UVCard";

import { WindCard } from "../molecules/WindCard";

export const CurrentConditions = () => {
  return (
    <div className="flex flex-col gap-2 select-none">
      <span>Current Conditions</span>
      <div className="grid grid-cols-2 gap-2">
        <WindCard />
        <HumidityCard />
        <UVCard />
        <PressureCard />
        <SunriseAndSunsetCard />
      </div>
    </div>
  );
};
