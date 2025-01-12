import { useState } from "react";
import useChat from "../hooks/useChat";
import useMessage from "../hooks/useMessage";
import useSocket from "../hooks/useSocket";
import useUserData from "../hooks/useUserData";
import { ChatMessage, MessageType } from "../types/chat";
import { filterCurrentUser } from "../utils/helper";

const MessageInput = () => {
    const { socket } = useSocket();

    const [chatMessage, setChatMessage] = useState("");
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const { currentChatInfo } = useChat();
    const { messageArray, setMessageArray, setLastMessage } = useMessage();

    const { userInfo } = useUserData();
    const { sendMessage } = useSocket();

    const debounced = (callback: any, delay = 1000) => {
        let timeout: any;
        return (...args: any) => {
            clearTimeout(timeout);
            if (!isTyping) {
                callback(...args);
                setIsTyping(true);
            }
            timeout = setTimeout(() => {
                socket?.emit(`chat:typing`, {
                    chatId: currentChatInfo?.id,
                    receiverId: chatUser.id,
                    isTyping: false,
                });
                setIsTyping(false);
            }, delay);
        };
    };
    const typingEvent = debounced(() => {
        socket?.emit(`chat:typing`, {
            chatId: currentChatInfo?.id,
            receiverId: chatUser.id,
            isTyping: true,
        });
        console.log("typing");
    });

    if (!currentChatInfo) return null;
    const chatUser = filterCurrentUser(currentChatInfo.participants, userInfo);

    return (
        <div className="p-3  w-full h-[10%] bg-zinc-800/50 duration-150  flexbox rounded-2xl ">
            <textarea
                value={chatMessage}
                placeholder={`Type a message...`}
                onChange={(e) => {
                    typingEvent();

                    setChatMessage(e.target.value.trimStart());
                }}
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
                        id: "",
                        chatId: currentChatInfo?.id || "",
                        senderId: userInfo?.id || "",
                        receiverId: chatUser.id,
                        content: chatMessage,
                        type: MessageType.TEXT,
                        isGroup: currentChatInfo.isGroup,
                        createdAt: new Date(),
                        isDeleted: false,
                        isSeen: false,
                        sender: {
                            name: userInfo?.name,
                            Profile: {
                                image: userInfo?.Profile.image,
                            },
                        },
                    };
                    const participants = currentChatInfo.participants.map(
                        (user) => user.id
                    );
                    console.log(participants);
                    if (sendMessage)
                        sendMessage(message, {
                            participants,
                        });
                    setLastMessage(message);
                    setMessageArray([...messageArray, message]);
                    setChatMessage("");
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
