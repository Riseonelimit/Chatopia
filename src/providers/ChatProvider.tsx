import { ReactNode, createContext, useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { Chat, UserSearchList } from "../types/user";

interface ChatContext {
    onlineUsers: string[] | null;
    currentChatInfo: Chat | null;
    setCurrentChatInfo: React.Dispatch<React.SetStateAction<Chat | null>>;
    findUserList: UserSearchList[] | null;
    setFindUserList: React.Dispatch<
        React.SetStateAction<UserSearchList[] | null>
    >;
    chatLoading: boolean;
    setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatContext>({
    onlineUsers: null,
    setCurrentChatInfo: () => {},
    currentChatInfo: null,
    setFindUserList: () => {},
    findUserList: null,
    setChatLoading: () => {},
    chatLoading: false,
});

const ChatProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [chatLoading, setChatLoading] = useState<boolean>(false);
    const [findUserList, setFindUserList] = useState<UserSearchList[] | null>(
        []
    );
    const [currentChatInfo, setCurrentChatInfo] = useState<Chat | null>(null);

    useEffect(() => {
        if (!socket) return;
        socket.on("online-users", (args) => {
            setOnlineUsers(args);
        });

        socket.on(`chat:find-user-result`, (result: UserSearchList[]) => {
            setFindUserList(result);
            setChatLoading(false);
        });
        return () => {
            socket?.off("online-users", () => {});
            socket?.off(`chat:find-user-result`, () => {});
        };
    }, [socket]);

    return (
        <ChatContext.Provider
            value={{
                onlineUsers,
                currentChatInfo,
                setCurrentChatInfo,
                findUserList,
                setFindUserList,
                chatLoading,
                setChatLoading,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
