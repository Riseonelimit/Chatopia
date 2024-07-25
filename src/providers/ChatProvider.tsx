import { ReactNode, createContext, useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import useUserData from "../hooks/useUserData";
import { Chat, UserSearchList } from "../types/user";

interface ChatContext {
    onlineUsers: string[] | null;
    currentChatInfo: Chat | null;
    setCurrentChatInfo: React.Dispatch<React.SetStateAction<Chat | null>>;
    findUserList: UserSearchList[] | null;
    setFindUserList: React.Dispatch<React.SetStateAction<UserSearchList[]>>;
    chatLoading: boolean;
    setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatContext>({
    onlineUsers: null,
    setCurrentChatInfo: () => {},
    currentChatInfo: null,
    setFindUserList: () => {},
    findUserList: [],
    setChatLoading: () => {},
    chatLoading: false,
});

const ChatProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket();

    const { userChats, setUserChats } = useUserData();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [chatLoading, setChatLoading] = useState<boolean>(false);
    const [currentChatInfo, setCurrentChatInfo] = useState<Chat | null>(null);
    const [findUserList, setFindUserList] = useState<UserSearchList[]>([]);

    useEffect(() => {
        if (!socket) return;
        socket.on("online-users", (args) => {
            setOnlineUsers(args);
        });

        socket.on(`chat:find-user-result`, (result: UserSearchList[]) => {
            setFindUserList(result);
            setChatLoading(false);
        });

        socket?.on(`chat:typing-true`, ({ chatId, isTyping }) => {
            console.log("typing ");

            const filterChat = userChats?.map((chat) => {
                if (chat.id == chatId) {
                    chat.isTyping = isTyping;
                }
                return chat;
            });
            if (filterChat) setUserChats([...filterChat]);
        });

        return () => {
            socket?.off("chat:typing-true", () => {});
            socket?.off("online-users", () => {});
            socket?.off(`chat:find-user-result`, () => {});
        };
    }, [socket, userChats, setUserChats]);

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
