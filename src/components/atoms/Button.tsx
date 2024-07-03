import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconType } from "../../types/icon.type";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType;
  children: ReactNode;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "p-1.5 flex justify-center items-center gap-1 rounded-lg border border-accent hover:bg-accent/50 text-sm  transition-color duration-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
