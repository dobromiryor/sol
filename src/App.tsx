import { Alerts } from "./components/organisms/Alerts";
import { CurrentConditions } from "./components/organisms/CurrentConditions";
import { DailyForecast } from "./components/organisms/DailyForecast";
import { HourlyDetails } from "./components/organisms/HourlyDetails";
import { HourlyForecast } from "./components/organisms/HourlyForecast";
import { Navbar } from "./components/organisms/Navbar";
import { Now } from "./components/organisms/Now";

function App() {
  return (
    <div className="mx-auto p-4 flex flex-col max-w-screen-sm gap-4">
      <Navbar />
      <Now />
      <Alerts />
      <HourlyForecast />
      <DailyForecast />
      <CurrentConditions />
      <HourlyDetails />
    </div>
  );
}

export default App;
