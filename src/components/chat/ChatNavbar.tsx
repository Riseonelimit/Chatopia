import { useClerk } from "@clerk/clerk-react";
import { Bell, LogOut, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

const ChatNavbar = () => {
    const { isConnected } = useSocket();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    const { socket } = useSocket();

    return (
        <div className=" z-50 p-5 w-3/4 bg-primary/10 backdrop-blur-md flexbox gap-3 rounded-3xl border-[2px] border-primary/70">
            <h2 className=" mr-auto text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
                Chatopia
            </h2>

            {isConnected ? (
                <h2 className=" px-2 py-2 rounded-xl text-sm border-green-400 border-[1px] text-green-300 bg-green-700/50 font-[400] animate-fade-in">
                    🟢 Realtime Updates
                </h2>
            ) : (
                <h2 className="px-2 py-2 rounded-xl text-sm border-yellow-400 border-[1px] text-yellow-300 bg-yellow-700/50 font-[400] animate-fade-in">
                    🟡 Polling 1s
                </h2>
            )}
            <div className="p-2 rounded-xl border-[1px] border-primary hover:cursor-pointer">
                <Bell
                    absoluteStrokeWidth
                    className=" text-purple-300 hover:text-white duration-150"
                />
            </div>
            <div className="p-2 rounded-xl border-[1px] border-primary hover:cursor-pointer">
                <UserPlus
                    absoluteStrokeWidth
                    className=" text-purple-300 hover:text-white duration-150"
                />
            </div>
            <button
                onClick={() => {
                    socket?.disconnect();
                    signOut(() => {
                        navigate("/", { replace: true });
                    });
                }}
                className="p-2 rounded-xl border-[1px] border-primary group hover:border-red-400 hover:cursor-pointer duration-150 "
            >
                <LogOut
                    absoluteStrokeWidth
                    className=" text-purple-300 group-hover:text-red-400 duration-175 duration-150"
                />
            </button>
        </div>
    );
};

export default ChatNavbar;
