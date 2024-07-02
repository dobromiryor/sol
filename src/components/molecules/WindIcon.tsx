import clsx from "clsx";
import { SVGProps, memo } from "react";
import { Unit } from "../../enums/unit.enum";
import { getWindProps } from "../../utils/getWindProps";

interface WindIconProps extends SVGProps<SVGSVGElement> {
  degree: number;
  speed: number;
  unit: Unit;
  size?: number;
}

const SvgComponent = ({
  degree,
  speed,
  unit,
  size = 56,
  ...props
}: WindIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    style={{
      width: size,
      height: size,
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "1s",
    }}
    fill="none"
    transform={`rotate(${(degree ?? 0) - 180})`}
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        className={clsx(
          "transition-all duration-1000 stroke stroke stroke-slate-50",
          getWindProps(speed, unit)
        )}
        d="M39.364 22.693c4.278-9.126 17.219-9.233 21.646-.18l16.703 34.154 7.6 14.777c5.078 9.872-4.82 20.753-15.128 16.63l-12.757-5.103a20 20 0 0 0-14.856 0L30.79 87.684c-10.423 4.17-20.353-6.978-15.011-16.851l7.663-14.166 15.922-33.974Z"
      />
      <circle
        cx={50}
        cy={50}
        r={45}
        stroke="url(#b)"
        strokeDasharray="4 8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={16}
        strokeWidth={2}
        transform="rotate(7.5 50 50)"
      />
      <circle cx={50} cy={5} r={4} className="fill-slate-50" />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={55.895}
        x2={44.126}
        y1={94.953}
        y2={5.385}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.505} stopColor="#f8fafc" stopOpacity={0} />
        <stop offset={1} stopColor="#f8fafc" />
      </linearGradient>
      <clipPath id="a">
        <path d="M0 0h100v100H0z" />
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export { Memo as WindIcon };
