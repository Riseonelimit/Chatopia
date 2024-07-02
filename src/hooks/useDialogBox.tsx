import { useContext } from "react";
import { DialogBoxContext } from "../providers/DialogBoxProvider";

export const useDialogBox = () => {
    return useContext(DialogBoxContext);
};
