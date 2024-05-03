import { ReactNode, createContext, useEffect, useState } from "react";
import { ChatMessage } from "../pages/Dashboard";
import useSocket from "../hooks/useSocket";

interface MessageContextProp {
    messageArray: ChatMessage[];
    setMessageArray: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const MessageContext = createContext<MessageContextProp>({
    messageArray: [],
    setMessageArray: () => {},
});

const MessageProvider = ({ children }: { children: ReactNode }) => {
    const [messageArray, setMessageArray] = useState<Array<ChatMessage>>([]);

    const { socket } = useSocket();

    useEffect(() => {
        socket?.on(
            `chat:receive-message:${localStorage.getItem("uuid")}`,
            (message) => {
                console.log(message.message);
                setMessageArray([...messageArray, message]);
            }
        );

        return () => {
            socket?.off(`chat:receive-message:${localStorage.getItem("uuid")}`);
        };
    }, [socket, messageArray, setMessageArray]);

    return (
        <MessageContext.Provider value={{ messageArray, setMessageArray }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageProvider;
