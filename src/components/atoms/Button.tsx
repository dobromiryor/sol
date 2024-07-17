import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconType } from "../../types/icon.type";

type Style = "primary" | "alert";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType;
  children: ReactNode;
  isActive?: boolean;
  buttonStyle?: Style;
}

export const Button = ({
  className,
  children,
  isActive = false,
  buttonStyle = "primary",
  ...props
}: ButtonProps) => {
  const buttonStyles: Record<Style, string> = {
    alert:
      "border-red-800 hover:bg-red-800 focus:bg-red-800 dark:border-rose-200 dark:hover:bg-rose-200 dark:focus:bg-rose-200 text-red-800 hover:text-rose-200 focus:text-rose-200 dark:text-rose-200 dark:hover:text-red-800 dark:focus:text-red-800",
    primary: "border-background",
  };

  const buttonActiveStyles: Record<Style, string> = {
    alert: "",
    primary:
      "bg-background hover:bg-accent focus:bg-accent hover:border-accent focus:border-accent",
  };

  const buttonNonActiveStyles: Record<Style, string> = {
    alert: "",
    primary: "hover:bg-secondary focus:bg-secondary hover:border-secondary focus:border-secondary",
  };

  return (
    <button
      className={clsx(
        "p-1.5 flex justify-center items-center gap-1 rounded-lg border border-background text-sm transition-color duration-300",
        buttonStyles[buttonStyle],
        isActive
          ? buttonActiveStyles[buttonStyle]
          : buttonNonActiveStyles[buttonStyle],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
