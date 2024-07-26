import { createContext, useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import useUserData from "../hooks/useUserData";
import { ReactProps } from "../types/react";

interface SocketContext {
    socket: Socket | null;
    isConnected: boolean;
    sendMessage?: (message: object, participants: Array<string>) => void;
    receiveMessage?: (chatId: string, message: string) => void;
}

export const SocketContext = createContext<SocketContext>({
    socket: null,
    isConnected: false,
});

const SocketProvider = ({ children }: ReactProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const { isAuth, userInfo } = useUserData();
    useEffect(() => {
        if (!isAuth) return;

        const connection = io(
            import.meta.env.VITE_CLERK_SOCKET_FETCH_URL as string,
            {
                query: {
                    uuid: userInfo?.id,
                    name: "Arhus",
                },
            }
        );
        connection.on("connect", () => {
            connection.emit("get-online-users");
            setIsConnected(true);
        });
        connection.on("disconnect", () => {
            console.log("even-disconnect");

            setIsConnected(false);
        });

        setSocket(connection);

        return () => {
            connection.disconnect();
        };
    }, [isAuth, userInfo?.id]);

    const sendMessage = useCallback(
        (message: object, participants: Array<string>) => {
            socket?.emit(`chat:send-message`, message, participants);
        },
        [socket]
    );

    return (
        <SocketContext.Provider
            value={{
                socket,
                isConnected,
                sendMessage,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
