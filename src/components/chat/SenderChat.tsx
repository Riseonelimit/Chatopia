import { ChatMessage } from "../../types/chat";

const SenderChat = ({ messageData }: { messageData: ChatMessage }) => {
    console.log(messageData.createdAt);
    console.log(new Date(messageData.createdAt).toLocaleTimeString());

    return (
        <div className="flexbox flex-col w-full items-end">
            <div className="px-4 py-3 relative ml-auto animate-send-chat bg-primary/70 shadow-md max-w-[60%] rounded-l-2xl rounded-tr-2xl">
                <span className=" ">{messageData.content}</span>
            </div>
            <p className="  -bottom-[30%] text-xs">
                {new Date(messageData.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </p>
        </div>
    );
};

export default SenderChat;
