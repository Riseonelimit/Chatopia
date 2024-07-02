import { ReactNode, createContext, useState } from "react";

interface DialogModelContextProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    boxType: BoxType | null;
    setBoxType: React.Dispatch<React.SetStateAction<BoxType | null>>;
}

export enum BoxType {
    ADD_FRIEND = "ADD_FRIEND",
    REMOVE_FRIEND = "REMOVE_FRIEND",
}

export const DialogBoxContext = createContext<DialogModelContextProps>({
    isOpen: false,
    setIsOpen: () => {},
    boxType: null,
    setBoxType: () => {},
});

const DialogBoxProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [boxType, setBoxType] = useState<BoxType | null>(null);
    return (
        <DialogBoxContext.Provider
            value={{ isOpen, setIsOpen, boxType, setBoxType }}
        >
            {children}
        </DialogBoxContext.Provider>
    );
};

export default DialogBoxProvider;
