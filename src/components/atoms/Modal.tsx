import clsx from "clsx";
import {
	Dispatch,
	MouseEvent,
	ReactNode,
	SetStateAction,
	useLayoutEffect,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";

interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  wrapperId?: string;
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export const Modal = ({
  title,
  isOpen,
  setIsOpen,
  children,
  wrapperId = "portal-root",
}: ModalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  const handleDismiss = () => setIsOpen(false);
  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    return false;
  };

  if (wrapperElement === null) return null;

  return createPortal(
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full bg-black/25 origin-center transition-all duration-300",
        "[transition-behavior:allow-discrete] initial-opacity-0 initial-backdrop-blur-0 z-50",
        isOpen
          ? "flex justify-center items-center opacity-100 backdrop-blur"
          : "hidden opacity-0 backdrop-blur-0"
      )}
      onClick={handleDismiss}
    >
      <div
        className={clsx(
          "flex flex-col gap-4 w-full max-w-screen-sm max-h-screen p-4 m-4 rounded-xl bg-primary text-inverted-text dark:text-text origin-center transition-all duration-150 initial-scale-0 shadow-2xl",
          isOpen ? "scale-100" : "scale-0"
        )}
        onClick={handleStopPropagation}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">{title}</h1>
          <button aria-label="Close" onClick={handleDismiss}>
            <Icon icon="close" size="24" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    wrapperElement
  );
};
