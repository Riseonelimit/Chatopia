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
    const [messageArray, setMessageArray] = useState<ChatMessage[]>([]);
    const [lastMessage, setLastMessage] = useState<ChatMessage | null>(null);
    const { socket } = useSocket();
    const { userInfo } = useUserData();

    useEffect(() => {
        socket?.on(
            `chat:receive-message:${userInfo?.id}`,

            (message: ChatMessage) => {
                console.log("receive message");

                setMessageArray([...messageArray, message]);
            }
        );

        socket?.on(`chat:get-all-messages`, (messages: ChatMessage[]) => {
            setMessageArray([...messages]);
        });

        return () => {
            socket?.off(`chat:receive-message:${userInfo?.id}`, () => {});
            socket?.off(`chat:get-all-message`, () => {});
        };
    }, [socket, messageArray, userInfo]);

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
