import { SVGProps, memo, useMemo } from "react";

interface SunProgressProps extends SVGProps<SVGSVGElement> {
  dt: number;
  sunrise: number;
  sunset: number;
}

const SvgComponent = ({ dt, sunrise, sunset, ...props }: SunProgressProps) => {
  const isTheSunOut = useMemo(() => {
    if (sunrise < dt && sunset > dt) {
      return true;
    }

    return false;
  }, [dt, sunrise, sunset]);

  const daylightPercentage = useMemo(() => {
    const min = sunrise;
    const max = sunset;
    const diff = max - min;
    const nowDiff = dt - min;

    return (nowDiff / diff) * 100;
  }, [dt, sunrise, sunset]);

  const strokeDashOffset = useMemo(() => {
    const pathMin = -189;
    const pathMax = 0;
    const pathPercentage = ((pathMax - pathMin) / 100) * daylightPercentage;

    return Math.abs(pathMin + pathPercentage);
  }, [daylightPercentage]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 232 110"
      fill="none"
      width="100%"
      {...props}
    >
      <g clipPath="url(#night)">
        <mask
          id="day"
          width={234}
          height={98}
          x={-1}
          y={11}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "alpha",
          }}
        >
          <path
            fill="#fff"
            d="M56.491 70S55.483 11 116 11s59.509 59 59.509 59H233v39h-20.172s-37.319 0-37.319-39H56.491c0 39-37.319 39-37.319 39H-1V70h57.491Z"
          />
        </mask>
        <g mask="url(#day)">
          {/* Night */}
          <path
            // className="fill-cyan-800"
            d="M-1 10h234v100H-1z"
          />
          {/* Day */}
          <path
            className="fill-cyan-400 transition-all duration-1000"
            // style={{
            //   transform: `scaleX(${daylightPercentage / 100})`,
            //   transformOrigin: "57px 10px",
            // }}
            d="M175 10H57v60h118z"
          />
        </g>
        <path
          className="stroke-inverted-text dark:stroke-text"
          d="M-1 109V70h234v39h-20.172s-37.319 0-37.319-39c0 0 1.008-59-59.509-59S56.491 70 56.491 70c0 39-37.319 39-37.319 39H-1Z"
        />
        {isTheSunOut && (
          <path
            className="stroke-amber-400 stroke-[20px] transition-all duration-1000"
            strokeLinecap="round"
            strokeDasharray="0 189"
            strokeDashoffset={strokeDashOffset}
            d="M56.5 70s-1-59 59.5-59 59.5 59 59.5 59"
          />
        )}
      </g>
      <defs>
        <clipPath id="night">
          <path fill="#fff" d="M0 0h232v110H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Memo = memo(SvgComponent);
export { Memo as SunProgress };
