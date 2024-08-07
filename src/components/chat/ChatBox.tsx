import { useContext, useEffect, useRef } from "react";
import useUserData from "../../hooks/useUserData";
import { MessageContext } from "../../providers/MessageProvider";
import MessageInput from "../MessageInput";
import ReceiverChat from "./ReceiverChat";
import SenderChat from "./SenderChat";
import useChat from "../../hooks/useChat";
import { MessageCircleMore } from "lucide-react";

const ChatBox = () => {
    const chatRef = useRef<HTMLDivElement>(null);

    const { messageArray } = useContext(MessageContext);

    const { currentChatInfo } = useChat();

    const { userInfo } = useUserData();
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        });
    }, [messageArray]);


    if (!currentChatInfo || currentChatInfo == null) {
        return (
            <div className=" p-3 w-full h-[85vh relative col-span-3 bg-primary/20 rounded-2xl flexbox flex-col gap-8  overflow-hidden">
                <MessageCircleMore
                    size={150}
                    strokeWidth={1.4}
                    className=" text-secondary/50"
                />
                <h2 className=" text-3xl text-secondary/50 font-semibold">
                    Click on a contact to start a conversation
                </h2>
            </div>
        );
    }

    return (
        <div className=" p-3 w-full h-full relative col-span-3 bg-primary/20 rounded-2xl flexbox flex-col gap-3 overflow-hidden">
            {/* CONTACT OVERLAY ON CHAT */}

            {/* MESSAGE DIV */}
            <div className=" w-full h-[90%] flexbox flex-col  justify-start gap-2 rounded-2xl overflow-y-auto no-scrollbar">
                {messageArray?.length > 0 ? (
                    messageArray.map((messageData) => {
                        if (messageData.senderId == userInfo?.id) {
                            return (
                                <SenderChat
                                    key={messageData.id}
                                    messageData={messageData}
                                />
                            );
                        }
                        return (
                            <ReceiverChat
                                key={messageData.id}
                                messageData={messageData}
                            />
                        );
                    })
                ) : (
                    <h2 className="text-5xl font-semibold justify-self-center self-center text-secondary/30">
                        Start a conversation 🐰
                    </h2>
                )}
                <div ref={chatRef}></div>
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatBox;
