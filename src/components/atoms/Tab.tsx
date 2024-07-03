import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { type TabType } from "../../types/tab.type";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tab: { selectedId: number } & TabType;
}

export const Tab = ({ tab, ...props }: TabProps) => {
  const { icon, id, selectedId, title } = tab;

  return (
    <Button
      role="tab"
      className={clsx(
        selectedId === id
          ? "bg-accent hover:bg-accent/80"
          : "hover:bg-accent/50"
      )}
      {...props}
    >
      <Icon
        className="text-inverted-text dark:text-text"
        icon={icon}
        aria-hidden
      />
      <span className="text-inverted-text dark:text-text">{title}</span>
    </Button>
  );
};
