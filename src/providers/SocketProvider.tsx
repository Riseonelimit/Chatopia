import { createContext, useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ReactProps } from "../types/react";

interface SocketContext {
    socket: Socket | null;
    isConnected: boolean;
    sendMessage?: (chatId: number, message: object) => void;
    receiveMessage?: (chatId: number, message: string) => void;
}

export const SocketContext = createContext<SocketContext>({
    socket: null,
    isConnected: false,
});

const SocketProvider = ({ children }: ReactProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const connection = io(
            import.meta.env.VITE_CLERK_SOCKET_FETCH_URL as string,
            {
                query: {
                    uuid: localStorage.getItem("uuid"),
                    name: "Arhus",
                },
            }
        );
        connection.on("connect", () => {
            connection.emit("get-online-users");
            setIsConnected(true);
        });
        connection.on("disconnect", () => {
            connection.emit("get-online-users");
            setIsConnected(false);
        });

        setSocket(connection);

        return () => {
            connection.disconnect();
        };
    }, []);

    const sendMessage = useCallback(
        (chatId: number, message: object) => {
            socket?.emit(`chat:send-message:${chatId}`, message);
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
