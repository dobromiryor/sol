import clsx from "clsx";
import { IconType } from "../../types/icon.type";
import { Icon } from "./Icon";

interface NotificationProps {
  icon: IconType;
  content: string;
}

export const Notification = ({ icon, content }: NotificationProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-secondary select-none">
      <div className="flex items-center gap-2">
        <div className="relative flex-shrink-0 flex justify-center items-center box-content p-2 w-6 h-6 bg-text text-secondary rounded-full">
          <Icon
            className={clsx("absolute")}
            icon={icon}
            size="24"
            aria-hidden
          />
        </div>
        <span>{content}</span>
      </div>
    </div>
  );
};
