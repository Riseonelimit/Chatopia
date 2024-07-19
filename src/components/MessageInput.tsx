import { useState } from "react";
import useChat from "../hooks/useChat";
import useMessage from "../hooks/useMessage";
import useSocket from "../hooks/useSocket";
import useUserData from "../hooks/useUserData";
import { ChatMessage, MessageType } from "../types/chat";
import { filterCurrentUser } from "../utils/helper";

const MessageInput = () => {
    const [chatMessage, setChatMessage] = useState("");

    const { currentChatInfo } = useChat();
    const { messageArray, setMessageArray, setLastMessage } = useMessage();

    const { userInfo } = useUserData();
    const { sendMessage } = useSocket();

    if (!currentChatInfo) return null;
    const chatUser = filterCurrentUser(currentChatInfo.participants, userInfo);

    return (
        <div className="p-3  w-full h-[10%] bg-zinc-800/50 duration-150  flexbox rounded-2xl ">
            <textarea
                value={chatMessage}
                placeholder={`Type a message...`}
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
                        receiverId: chatUser.id,
                        content: chatMessage,
                        type: MessageType.TEXT,
                        isGroup: currentChatInfo.isGroup,
                        createdAt: new Date(),
                        isDeleted: false,
                        isSeen: false,
                    };
                    if (sendMessage) sendMessage(message.senderId, message);
                    setLastMessage(message);
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
