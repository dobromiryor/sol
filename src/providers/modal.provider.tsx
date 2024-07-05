import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

type ModalContextProps =
  | [isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>]
  | undefined;

export const ModalContext = createContext<ModalContextProps>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </ModalContext.Provider>
  );
};
