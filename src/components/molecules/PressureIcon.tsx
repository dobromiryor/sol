import { SVGProps, memo, useMemo } from "react";

interface PressureIconProps extends SVGProps<SVGSVGElement> {
  pressure: number;
  size?: number;
}

/* Gauge */
const SIZE = 100;
const STROKE = 20;
const BG_STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CROPPED_CIRCUMFERENCE = (CIRCUMFERENCE / 4) * 3;

/* Pressure */
/* Average pressure - 1013.25 hPa */
const MIN = 913.25;
const MAX = 1113.25;
const OVERALL_DIFFERENCE = MAX - MIN;

const SvgComponent = ({ pressure, size = 56, ...props }: PressureIconProps) => {
  const strokeDashOffset = useMemo(() => {
    const pressureDiff = pressure - MIN;
    const pressurePercentage = (pressureDiff / OVERALL_DIFFERENCE) * 100;

    const emptyGauge = -1000; // min value
    const fullGauge = emptyGauge + CROPPED_CIRCUMFERENCE; // max value
    const gaugePercentage =
      ((fullGauge - emptyGauge) / 100) * pressurePercentage; // pressure in relation to gauge

    return Math.abs(emptyGauge + gaugePercentage);
  }, [pressure]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      fill="none"
      {...props}
    >
      <circle
        className="stroke-cyan-400 origin-center rotate-[135deg]"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={BG_STROKE}
        strokeLinecap="round"
        strokeDasharray={CROPPED_CIRCUMFERENCE}
      />

      <circle
        className="stroke-cyan-800 rotate-[135deg] origin-center transition-all duration-1000"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE}
        strokeDasharray={1000}
        strokeDashoffset={strokeDashOffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

const Memo = memo(SvgComponent);
export { Memo as PressureIcon };
