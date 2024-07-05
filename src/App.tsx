import clsx from "clsx";
import { Alerts } from "./components/organisms/Alerts";
import { CurrentConditions } from "./components/organisms/CurrentConditions";
import { DailyForecast } from "./components/organisms/DailyForecast";
import { HourlyDetails } from "./components/organisms/HourlyDetails";
import { HourlyForecast } from "./components/organisms/HourlyForecast";
import { Navbar } from "./components/organisms/Navbar";
import { Now } from "./components/organisms/Now";
import { useModal } from "./hooks/useModal";

function App() {
  const [isOpen] = useModal();

  return (
    <main
      className={clsx("mx-auto p-4 flex flex-col max-w-screen-sm gap-4")}
      tabIndex={isOpen ? -1 : 0}
    >
      <Navbar />
      <Now />
      <Alerts />
      <HourlyForecast />
      <DailyForecast />
      <CurrentConditions />
      <HourlyDetails />
    </main>
  );
}

export default App;
