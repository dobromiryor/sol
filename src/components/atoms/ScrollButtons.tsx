import clsx from "clsx";
import {
	cloneElement,
	ReactElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Icon } from "./Icon";

interface ScrollButtonProps {
  children: ReactElement;
}

export const ScrollButtons = ({ children }: ScrollButtonProps) => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const ref = useRef<HTMLUListElement>(null);

  const renderChildren = useCallback(() => {
    if (!children) {
      return null;
    }

    return cloneElement(children as ReactElement, { ref });
  }, [children]);

  const handleScroll = (direction: "left" | "right") => {
    ref.current?.scrollBy({
      left:
        direction === "left"
          ? -ref.current?.clientWidth / 2
          : ref.current?.clientWidth / 2,
      behavior: "smooth",
    });

    console.log(ref.current?.offsetWidth);
  };

  const buttonStyles =
    "group-hover:translate-x-0 focus:translate-x-0 flex justify-center items-center h-6 w-6 rounded-full backdrop-blur transition-all bg-transparent hover:bg-background focus:bg-background shadow-sm hover:shadow-md focus:shadow-md dark:shadow-md dark:hover:shadow-lg dark:focus:shadow-lg";

  const handleButtonVisibility = useCallback(() => {
    if (ref.current) {
      setIsLeftVisible(ref.current.scrollLeft !== 0);
      setIsRightVisible(
        ref.current.scrollLeft + ref.current.clientWidth !==
          ref.current.scrollWidth
      );
    }
  }, []);

  const { debouncedCallback } = useDebounce({
    callback: handleButtonVisibility,
  });

  useEffect(() => {
    debouncedCallback?.();
  }, [debouncedCallback]);

  useEffect(() => {
    window.addEventListener("resize", () => debouncedCallback?.());

    return () =>
      window.removeEventListener("resize", () => debouncedCallback?.());
  }, [debouncedCallback]);

  useEffect(() => {
    const currentRef = ref.current;

    ref.current?.addEventListener("scrollend", handleButtonVisibility);

    return () =>
      currentRef?.removeEventListener("scrollend", handleButtonVisibility);
  }, [handleButtonVisibility]);

  const canHover = matchMedia("(hover: hover)").matches;

  if (!canHover) return children;

  return (
    <div className="relative overflow-hidden">
      <div
        className={clsx(
          "absolute h-full w-10 group z-10 initial-opacity-0 transition-all duration-300 [transition-behavior:allow-discrete]",
          isLeftVisible ? "block opacity-100" : "hidden opacity-0"
        )}
      >
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
      <div
        className={clsx(
          "absolute right-0 h-full w-10 group z-10 initial-opacity-0 transition-all duration-300 [transition-behavior:allow-discrete]",
          isRightVisible ? "block opacity-100" : "hidden opacity-0"
        )}
      >
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
