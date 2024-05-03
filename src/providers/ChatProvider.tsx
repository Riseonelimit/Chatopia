import { ReactNode, createContext, useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export const chatContext = createContext<string[] | null>(null);

const ChatProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket();

    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket?.on("online-users", (args): any => {
            console.log("getusers");
            setOnlineUsers(args);
            console.log({ args });
        });
    }, [socket, onlineUsers]);

    return (
        <chatContext.Provider value={onlineUsers}>
            {children}
        </chatContext.Provider>
    );
};

export default ChatProvider;
