import { useContext } from "react";
import { chatContext } from "../providers/ChatProvider";

const useChat = () => {
    return useContext(chatContext);
};
export default useChat;
