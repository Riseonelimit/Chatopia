import { ReactNode, createContext, useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { CurrentChatUser } from "../types/user";

interface ChatContext {
    onlineUsers: string[] | null;
    currentChatInfo: CurrentChatUser | null;
    setCurrentChatInfo: React.Dispatch<
        React.SetStateAction<CurrentChatUser | null>
    >;
}

export const ChatContext = createContext<ChatContext>({
    onlineUsers: null,
    setCurrentChatInfo: () => {},
    currentChatInfo: null,
});

const ChatProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChatInfo, setCurrentChatInfo] =
        useState<CurrentChatUser | null>(null);

    useEffect(() => {
        socket?.on("online-users", (args) => {
            console.log(args);
            setOnlineUsers(args);
        });

        return () => {
            socket?.off("online-users", () => {});
        };
    }, [socket, onlineUsers, setOnlineUsers]);

    return (
        <ChatContext.Provider
            value={{ onlineUsers, currentChatInfo, setCurrentChatInfo }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
