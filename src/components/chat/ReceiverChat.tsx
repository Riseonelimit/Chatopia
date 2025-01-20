import { ChatMessage } from "../../types/chat";
import Tooltip from "../message/Tooltip";

const ReceiverChat = ({ messageData }: { messageData: ChatMessage }) => {
    return (
        <div className="flexbox items-center relative self-start w-full  gap-2">
            {messageData.isGroup ? (
                <img
                    src={messageData.sender.Profile.image}
                    className=" w-[1.8rem] rounded-full group "
                />
            ) : null}
            <div className="flexbox flex-col w-full items-start">
                <div className="px-4 py-3 mr-auto relative animate-receive-chat bg-background/70 shadow-md max-w-[60%] flexbox rounded-r-2xl rounded-tl-2xl">
                    <span className=" ">{messageData.content}</span>
                </div>
                {messageData.isGroup ? (
                    <Tooltip message={messageData.sender.name!} />
                ) : null}
                <p className=" ml-1 text-xs">
                    {new Date(messageData.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>{" "}
            </div>
        </div>
    );
};

export default ReceiverChat;
    