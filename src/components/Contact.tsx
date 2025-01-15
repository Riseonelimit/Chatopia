import { UserRoundX, Users } from "lucide-react";
import useChat from "../hooks/useChat";
import useMessage from "../hooks/useMessage";
import useSocket from "../hooks/useSocket";
import useUserData from "../hooks/useUserData";
import { filterCurrentUser } from "../utils/helper";
import { Chat } from "../types/chat";

const Contact = ({
    chatInfo,
    isOnline,
}: {
    chatInfo: Chat;
    isOnline: boolean | undefined;
}) => {
    const { setCurrentChatInfo, currentChatInfo } = useChat();
    const { userInfo } = useUserData();
    const { lastMessage } = useMessage();
    const { socket } = useSocket();

    const setCurrentChat = () => {
        socket?.emit("chat:get-messages", chatInfo.id);
        return setCurrentChatInfo(chatInfo);
    };
    const handleCloseChat = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        if (currentChatInfo?.id == chatInfo.id) {
            return setCurrentChatInfo(null);
        }
    };

    const chatUser = filterCurrentUser(chatInfo.participants, userInfo);
 
    return (
        <div
            onClick={setCurrentChat}
            className={`p-2 w-full h-[5rem] group relative grid grid-cols-5 gap-2 bg-primary/20 rounded-2xl hover:bg-primary border-[1px] border-primary  hover:scale-[1.02] animate-fade-top-delayed  `}
        >
            <div className="bg-red-300 col-span-1 w-full  flexbox rounded-xl overflow-hidden">
                <img
                    src={
                        chatInfo.isGroup
                            ? chatInfo.chatIcon
                            : chatUser.Profile.image
                    }
                    alt=""
                    className=" w-full h-full object-cover"
                />
            </div>
            <div className=" col-span-4 w-full flexbox flex-col items-start  ">
                <h2 className=" font-semibold">
                    {chatInfo.isGroup ? chatInfo.groupName : chatUser.name}
                </h2>
                <p className=" text-xs line-clamp-1 ">
                    {chatInfo?.isTyping
                        ? "Typing"
                        : lastMessage
                        ? lastMessage.content
                        : ""}
                </p>
            </div>

            {!chatInfo.isGroup ? (
                <div className=" absolute -top-2 -right-2 shadow-lg p-[1px] z-[99] rounded-full">
                    {isOnline ? "🟢" : "🔴"}
                </div>
            ) : (
                <div className="p-1 absolute -right-2 -top-2  shadow-lg  z-[99] rounded-full bg-background border-[1px] border-primary">
                    <Users absoluteStrokeWidth />
                </div>
            )}

            {currentChatInfo?.id == chatInfo.id ? (
                <div className=" px-3 py-2 w-full h-full absolute flexbox justify-between opacity-0 group-hover:opacity-[1]  bg-background z-20 rounded-2xl  duration-300 cursor-pointer group-hover:animate-fade-top ">
                    <button
                        onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => handleCloseChat(e)}
                        className="px-3 py-2 rounded-lg text-md text-red-100 bg-red-800 font-[500]"
                    >
                        Close chat
                    </button>

                    <div className=" flexbox gap-2">
                        <div className="p-2 rounded-xl border-[1px] border-primary hover:cursor-pointer">
                            <UserRoundX
                                absoluteStrokeWidth
                                className=" text-red-300 hover:text-white duration-150"
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Contact;
