import { useUser } from "@clerk/clerk-react";
import { useContext, useState } from "react";
import useSocket from "../hooks/useSocket";
import useUserData from "../hooks/useUserData";
import { MessageContext } from "../providers/MessageProvider";
import useChat from "../hooks/useChat";
import { ChatMessage, MessageType } from "../types/chat";

const MessageInput = () => {
    const { user } = useUser();
    const [chatMessage, setChatMessage] = useState("");

    const { currentChatInfo } = useChat();
    const { messageArray, setMessageArray } = useContext(MessageContext);

    const { userInfo } = useUserData();
    const { sendMessage } = useSocket();
    return (
        <div className="p-3  w-full h-[10%] bg-zinc-800/70 duration-150  flexbox rounded-2xl">
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

                    const message: ChatMessage = {
                        chatId: currentChatInfo?.id || "",
                        senderId: userInfo?.id || "",
                        receiverId: currentChatInfo?.id || "",
                        content: chatMessage,
                        type: MessageType.IMAGE,
                        isGroup: false,
                        userName: user?.fullName || user?.username || "",
                    };
                    if (sendMessage) sendMessage(message.senderId, message);

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
