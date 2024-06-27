import clsx from "clsx";
import { HTMLAttributes } from "react";
import { IconType } from "../../types/icon.type";

const sizeStyles = {
  "14": "text-sm leading-[14px] h-[14px] w-[14px]",
  "16": "text-base leading-4 h-4 w-4",
  "20": "text-xl leading-5 h-5 w-5",
  "24": "text-2xl leading-6 h-6 w-6",
  "36": "text-4xl leading-9 h-9 w-9",
};

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: IconType;
  size?: keyof typeof sizeStyles;
}

export const Icon = ({ className, icon, size = "16", ...props }: IconProps) => {
  return (
    <span
      {...props}
      className={clsx(
        "material-symbols-rounded select-none",
        sizeStyles[size],
        className
      )}
    >
      {icon}
    </span>
  );
};
