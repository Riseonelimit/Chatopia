import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import useSocket from "../hooks/useSocket";
import { ChatMessage } from "../pages/Dashboard";

interface ReactArgs {
    setMessageArray: React.Dispatch<React.SetStateAction<Array<ChatMessage>>>;
    messageArray: Array<ChatMessage>;
}

const MessageInput = ({ setMessageArray, messageArray }: ReactArgs) => {
    const { user } = useUser();
    const [chatMessage, setChatMessage] = useState("");

    const { sendMessage } = useSocket();
    return (
        <div className="p-3 w-full h-[10%] bg-zinc-800/70 duration-150  flexbox rounded-2xl">
            <textarea
                value={chatMessage}
                placeholder={`Type a message ${user?.fullName}`}
                onChange={(e) => setChatMessage(e.target.value.trimStart())}
                className=" outline-none resize-none bg-transparent  w-full self-center"
                rows={1}
            />
            <button
                className={` ml-auto mr-2 secondary-btn h-full duration-300 ${
                    chatMessage ? " translate-x-0" : " translate-x-[70px] "
                } `}
            >
                📎
            </button>
            <button
                onClick={() => {
                    // console.log(ref.current);

                    const message = {
                        chatId: 10,
                        senderId: localStorage.getItem("uuid") || "0",
                        receiverId: "1",
                        message: chatMessage,
                        type: "text",
                        userName: user?.username || "You",
                    };
                    if (sendMessage) sendMessage(+message.senderId, message);

                    setMessageArray([...messageArray, message]);
                    console.log("done");
                }}
                className={`ml-auto primary-btn h-full ${
                    chatMessage
                        ? "opacity-100 visible animate-fade-in"
                        : "opacity-0 invisible "
                }`}
                disabled={chatMessage == "" ? true : false}
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
