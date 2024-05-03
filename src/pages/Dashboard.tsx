import { Bell, UserPlus } from "lucide-react";
import bg from "../assets/dashboard_blur.svg";
import grid from "../assets/leaves.svg";
import Contact from "../components/Contact";
import ChatBox from "../components/chat/ChatBox";
import useSocket from "../hooks/useSocket";

export type ChatMessage = {
    chatId: number;
    senderId: string;
    receiverId: string;
    message: string;
    userName: string;
    type: string;
};

const Dashboard = () => {
    const { isConnected } = useSocket();

    return (
        <section className=" p-3 w-full h-screen bg-background text-white relative flex flex-col items-center justify-start gap-8 overflow-hidden">
            {/* NAVBAR */}
            <div className=" z-50 p-5 w-3/4 bg-primary/10 backdrop-blur-md flexbox gap-3 rounded-3xl border-[2px] border-primary/70">
                <h2 className=" mr-auto text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 text-transparent bg-clip-text">
                    Chatopia
                </h2>

                {isConnected ? (
                    <h2 className=" px-2 py-2 rounded-xl text-sm border-green-400 border-[1px] text-green-300 bg-green-700/50 font-[400] ">
                        🟢 Realtime Updates
                    </h2>
                ) : (
                    <h2 className="px-2 py-2 rounded-xl text-sm border-yellow-400 border-[1px] text-yellow-300 bg-yellow-700/50 font-[400]">
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
            </div>

            {/* CHAT BOX CONTAINER */}
            <div className=" z-50 p-3 h-[85vh] md:w-[90%] lg:w-3/4 bg-zinc-800/40 backdrop-blur-md grid grid-cols-4 gap-3 rounded-3xl border-[2px] border-primary/70 ">
                {/* CONTACTS */}
                <div className="py-3 px-3 col-span-1 w-full h-full  flexbox flex-col items-center justify-start gap-4 rounded-2xl overflow-y-auto no-scrollbar">
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                </div>

                {/* CHAT-SECTION */}
                <ChatBox />
            </div>

            <img
                src={bg}
                alt=""
                draggable={false}
                className="absolute z-10 select-none top-0 object-cover w-full h-full"
            />
            <img
                src={grid}
                alt=""
                draggable={false}
                className="absolute z-10 select-none top-0 object-cover w-full h-full opacity-80 animate-pulse-slow duration-1000 "
            />
        </section>
    );
};

export default Dashboard;
