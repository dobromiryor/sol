import clsx from "clsx";
import { useMemo } from "react";

interface MoonIconProps {
  lat: number;
  phase: number;
}

const ease = (x: number) => 1 - Math.sqrt(1 - Math.pow(x, 2));

export const MoonIcon = ({ lat, phase }: MoonIconProps) => {
  const isGibbous = useMemo(() => phase >= 0.25 && phase < 0.75, [phase]);

  const scale = useMemo(() => {
    const min = 1;
    const max = 4;

    if (phase < 0.25) {
      return min + (phase / 0.25) * (max - min);
    } else if (phase < 0.5) {
      return max - ((phase - 0.25) / 0.25) * (max - min);
    } else if (phase < 0.75) {
      return min + ((phase - 0.5) / 0.25) * (max - min);
    } else {
      return max - ((phase - 0.75) / 0.25) * (max - min);
    }
  }, [phase]);

  const translation = useMemo(() => {
    if (phase < 0.25) {
      const min = 32;
      const max = 36;

      return min + (phase / 0.25) * (max - min);
    } else if (phase < 0.5) {
      const min = 64;
      const max = 36;

      return max - ease((phase - 0.25) / 0.25) * (max - min);
    } else if (phase < 0.75) {
      const min = 64;
      const max = 68;

      return min + ((phase - 0.5) / 0.25) * (max - min);
    } else {
      const min = 96;
      const max = 68;

      return max - ease((phase - 0.75) / 0.25) * (max - min);
    }
  }, [phase]);

  const maskStyles = "w-8 h-8 rounded-full";

  return (
    <div
      className="relative flex justify-center items-center h-8 w-8 rounded-full pointer-events-none overflow-hidden origin-center"
      style={{ rotate: `-${90 - lat}deg` }}
    >
      {/* Background */}
      <div
        className={clsx(
          "h-8 w-8 rounded-full transition-all",
          !isGibbous ? "bg-zinc-700" : "bg-primary"
        )}
      />

      <div
        className="absolute left-8 flex origin-left transition-all"
        style={{
          transform: `scale(${scale}) translateX(${-translation}px)`,
        }}
      >
        {/* Right mask */}
        <div className={clsx(maskStyles, "bg-primary")} />

        {/* Center mask */}
        <div className={clsx(maskStyles, "bg-zinc-700")} />

        {/* Left mask */}
        <div className={clsx(maskStyles, "bg-primary")} />
      </div>

      {/* Shadow overlay */}
      <div className="absolute w-8 h-8 rounded-full shadow-center-inset-2 shadow-primary" />
    </div>
  );
};
