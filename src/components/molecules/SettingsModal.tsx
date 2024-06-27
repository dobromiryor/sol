import { Dispatch, SetStateAction } from "react";
import { Theme } from "../../enums/theme.enum";
import { Unit } from "../../enums/unit.enum";
import { useTheme } from "../../hooks/useTheme";
import { useThemeStore } from "../../stores/theme.store";
import { useWeatherStore } from "../../stores/weather.store";
import { Modal } from "../atoms/Modal";
import { SegmentedButton } from "../atoms/SegmentedButton";

interface SettingsModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SettingsModal = ({ isOpen, setIsOpen }: SettingsModalProps) => {
  const { setDark, setDefault, setLight } = useTheme();

  const { theme } = useThemeStore();
  const { unit, setUnit } = useWeatherStore();

  return (
    <Modal title="Settings" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-2">
        <SegmentedButton
          title="Units"
          buttons={[
            { id: 1, title: "Metric", onClick: () => setUnit(Unit.METRIC) },
            { id: 2, title: "Imperial", onClick: () => setUnit(Unit.IMPERIAL) },
          ]}
          selectedId={unit === Unit.IMPERIAL ? 2 : 1}
        />

        <SegmentedButton
          title="Theme"
          buttons={[
            { id: 1, title: "Light", onClick: () => setLight() },
            { id: 2, title: "Auto", onClick: () => setDefault() },
            { id: 3, title: "Dark", onClick: () => setDark() },
          ]}
          selectedId={theme !== Theme.AUTO ? (theme === Theme.DARK ? 3 : 1) : 2}
        />
      </div>
    </Modal>
  );
};