import clsx from "clsx";
import { ImgHTMLAttributes } from "react";

interface WeatherIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  icon: string;
  scale?: 1 | 2 | 4;
}

export const WeatherIcon = ({
  className,
  icon,
  scale = 1,
  ...props
}: WeatherIconProps) => {
  const src = new URL(
    `/img/wn/${icon}${scale !== 1 ? `@${scale}x` : ""}.png`,
    "https://openweathermap.org/"
  );

  return (
    <img
      /* Using scale to get rid of the unnecessary padding */
      className={clsx("scale-150", className)}
      src={src.href}
      /* Scaling down to avoid blurred icons */
      width={(50 * scale) / 2}
      height={(50 * scale) / 2}
      {...props}
    />
  );
};
