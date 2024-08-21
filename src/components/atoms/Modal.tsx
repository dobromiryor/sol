import clsx from "clsx";
import {
	MouseEvent,
	ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { useModal } from "../../hooks/useModal";
import { Icon } from "./Icon";

interface ModalProps {
	title: string;
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
	children,
	wrapperId = "portal-root",
}: ModalProps) => {
	const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
		null
	);

	const modalRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useModal();

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

	const handleDismiss = useCallback(() => setIsOpen(false), [setIsOpen]);
	const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		return false;
	};

	useEffect(() => {
		if (isOpen) {
			modalRef.current?.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			const handleKeypress = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					handleDismiss();
				}
			};

			document.addEventListener("keyup", handleKeypress);

			return () => document.removeEventListener("keyup", handleKeypress);
		}
	}, [handleDismiss, isOpen]);

	if (wrapperElement === null) return null;

	return createPortal(
		<div
			className={clsx(
				"fixed justify-center items-center top-0 left-0 w-full h-full bg-black/25 origin-center transition-all transition-allow-discrete duration-300 z-50",
				isOpen
					? "flex starting:opacity-0 starting:backdrop-blur-0 opacity-100 backdrop-blur"
					: "hidden starting:opacity-100 starting:backdrop-blur opacity-0 backdrop-blur-0"
			)}
			onClick={handleDismiss}>
			<div
				ref={modalRef}
				role="dialog"
				aria-modal={isOpen}
				aria-labelledby={`modal-${title}`}
				className={clsx(
					"flex flex-col gap-4 w-full max-w-screen-sm max-h-screen p-4 m-4 rounded-xl bg-primary text-inverted-text dark:text-text origin-center transition-all duration-300 shadow-2xl",
					isOpen
						? "starting:-translate-y-8 translate-y-0"
						: "starting:translate-y-0 translate-y-8"
				)}
				onClick={handleStopPropagation}
				tabIndex={isOpen ? 0 : -1}>
				<div className="flex justify-between items-center">
					<h1 id={`modal-${title}`} className="font-bold text-xl">
						{title}
					</h1>
					<button
						className="flex justify-center items-center w-6 h-6	"
						aria-label="Close modal"
						onClick={handleDismiss}>
						<Icon icon="close" size="24" aria-hidden />
					</button>
				</div>
				{children}
			</div>
		</div>,
		wrapperElement
	);
};
