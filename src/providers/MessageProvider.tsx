import { ReactNode, createContext, useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { ChatMessage } from "../types/chat";
import useUserData from "../hooks/useUserData";

interface MessageContextProp {
    messageArray: ChatMessage[];
    setMessageArray: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    lastMessage: ChatMessage | null;
    setLastMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
}
    
export const MessageContext = createContext<MessageContextProp>({
    messageArray: [],
    setMessageArray: () => {},
    lastMessage: null,
    setLastMessage: () => {},
});

const MessageProvider = ({ children }: { children: ReactNode }) => {
    const [messageArray, setMessageArray] = useState<Array<ChatMessage>>([]);
    const [lastMessage, setLastMessage] = useState<ChatMessage | null>(null);
    const { socket } = useSocket();
    const { userInfo } = useUserData();

    useEffect(() => {
        socket?.on(`chat:receive-message:${userInfo?.id}`, (message) => {
            console.log(message.message);
            setMessageArray([...messageArray, message]);
        });

        return () => {
            socket?.off(`chat:receive-message:${localStorage.getItem("uuid")}`);
        };
    }, [socket, messageArray, setMessageArray, userInfo]);

    return (
        <MessageContext.Provider
            value={{
                messageArray,
                setMessageArray,
                lastMessage,
                setLastMessage,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
};

export default MessageProvider;
