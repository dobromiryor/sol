import clsx from "clsx";
import { cloneElement, ReactElement, useCallback, useRef } from "react";
import { Icon } from "./Icon";

interface ScrollButtonProps {
  children: ReactElement;
}

export const ScrollButtons = ({ children }: ScrollButtonProps) => {
  const ref = useRef<HTMLUListElement>(null);

  const renderChildren = useCallback(() => {
    if (!children) {
      return null;
    }

    return cloneElement(children as ReactElement, { ref });
  }, [children]);

  const handleScroll = (direction: "left" | "right") => {
    ref.current?.scrollBy({
      left: direction === "left" ? -512 : 512,
      behavior: "smooth",
    });
  };

  const canHover = matchMedia("(hover: hover)").matches;

  const buttonStyles =
    "group-hover:translate-x-0 focus:translate-x-0 flex justify-center items-center h-6 w-6 rounded-full backdrop-blur transition-all bg-transparent hover:bg-background focus:bg-background shadow-sm hover:shadow-md focus:shadow-md dark:shadow-md dark:hover:shadow-lg dark:focus:shadow-lg";

  if (!canHover) return children;

  return (
    <div className="relative">
      <div className="absolute h-full w-10 group z-10">
        <button
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 left-2 -translate-x-4",
            buttonStyles
          )}
          aria-label="Scroll left"
          onClick={() => handleScroll("left")}
        >
          <Icon icon="chevron_left" aria-hidden />
        </button>
      </div>
      <div className="absolute right-0 h-full w-10 group z-10">
        <button
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 left-2 translate-x-4",
            buttonStyles
          )}
          aria-label="Scroll right"
          onClick={() => handleScroll("right")}
        >
          <Icon icon="chevron_right" aria-hidden />
        </button>
      </div>
      {renderChildren()}
    </div>
  );
};
