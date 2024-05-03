import { useContext } from "react";
import { MessageContext } from "../providers/MessageProvider";

const useMessage = () => {
    return useContext(MessageContext);
};
export default useMessage;
