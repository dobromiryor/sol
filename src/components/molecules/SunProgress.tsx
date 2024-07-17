import { SVGProps, memo, useMemo } from "react";
import { getEndOfDay } from "../../utils/getEndOfDay";
import { getPercentage } from "../../utils/getPercentage";
import { getStartOfDay } from "../../utils/getStartOfDay";

interface SunProgressProps extends SVGProps<SVGSVGElement> {
  dt: number;
  sunrise: number;
  sunset: number;
}

const ARC_RADIUS = 163;
const ARC_CIRC = Math.PI * ARC_RADIUS;

const SvgComponent = ({ dt, sunrise, sunset, ...props }: SunProgressProps) => {
  const isTheSunOut = useMemo(() => {
    if (sunrise < dt && sunset > dt) {
      return true;
    }

    return false;
  }, [dt, sunrise, sunset]);

  const beforeSunriseScale = useMemo(
    () => getPercentage(getStartOfDay(), sunrise, dt),
    [dt, sunrise]
  );

  const afterSunsetScale = useMemo(
    () => getPercentage(sunset, getEndOfDay(), dt),
    [dt, sunset]
  );

  const daylightPercentage = useMemo(
    () => getPercentage(sunrise, sunset, dt),
    [dt, sunrise, sunset]
  );

  const dayTimeScale = useMemo(() => {
    const sunArcPosition = Math.cos(-Math.PI * (daylightPercentage / 100));

    return Math.abs(-1 + sunArcPosition) / 2;
  }, [daylightPercentage]);

  const strokeDashOffset = useMemo(() => {
    const pathMin = -ARC_CIRC;
    const pathMax = 0;
    const pathPercentage = ((pathMax - pathMin) / 100) * daylightPercentage;

    return Math.abs(pathMin + pathPercentage);
  }, [daylightPercentage]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 303"
      fill="none"
      width="100%"
      {...props}
    >
      <g clipPath="url(#night)">
        <mask
          id="day"
          width={642}
          height={269}
          x={-1}
          y={33}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "alpha",
          }}
        >
          <path
            fill="#fff"
            d="M156.733 194.872C156.733 194.872 153.966 33 320 33C486.034 33 483.267 194.872 483.267 194.872H641V301.872H585.655C585.655 301.872 483.267 301.872 483.267 194.872H156.733C156.733 301.872 54.3448 301.872 54.3448 301.872H-1V194.872H156.733Z"
          />
        </mask>
        <g mask="url(#day)">
          {/* Before sunrise */}
          <rect
            style={{
              transform: `scaleX(${beforeSunriseScale / 100})`,
            }}
            className="fill-cyan-800"
            y="195"
            width="157"
            height="108"
          />
          {/* Day */}
          <rect
            className="fill-cyan-400 transition-all duration-1000"
            x={157}
            y={33}
            width="326"
            height="162"
            style={{
              transform: `scaleX(${dayTimeScale})`,
              transformOrigin: "157px 33px",
            }}
          />
          {/* After sunset */}
          <rect
            style={{
              transform: `scaleX(${afterSunsetScale / 100})`,
              transformOrigin: "483px 157px",
            }}
            className="fill-cyan-800"
            x="483"
            y="195"
            width="157"
            height="108"
          />
        </g>
        <path
          className="stroke stroke-cyan-400"
          d="M-1 302V194.949H641V302H585.655C585.655 302 483.267 302 483.267 194.949C483.267 194.949 486.034 33 320 33C153.966 33 156.733 194.949 156.733 194.949C156.733 302 54.3448 302 54.3448 302H-1Z"
        />
        {isTheSunOut && (
          <path
            className="stroke-amber-400 stroke-[48px] transition-all duration-1000"
            strokeLinecap="round"
            strokeDasharray={`0 ${Math.ceil(ARC_CIRC)}`}
            strokeDashoffset={strokeDashOffset}
            d="M157.003 195C157.003 195 154.263 33 320 33C485.737 33 482.997 195 482.997 195"
          />
        )}
      </g>
      <defs>
        <clipPath id="night">
          <rect width="640" height="303" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Memo = memo(SvgComponent);
export { Memo as SunProgress };
