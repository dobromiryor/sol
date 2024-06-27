import clsx from "clsx";
import { getHumidityProps } from "../../utils/getHumidityProps";

interface HumidityBarProps {
  humidity: number;
}

export const HumidityBar = ({ humidity }: HumidityBarProps) => {
  return (
    <div className="w-7 h-14 bg-amber-200 rounded-xl overflow-hidden">
      <div
        className={clsx(
          "w-7 h-14 duration-1000 transition-all origin-bottom",
          getHumidityProps(humidity)
        )}
      />
    </div>
  );
};
