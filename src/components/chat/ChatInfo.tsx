import useChat from "../../hooks/useChat";
import useUserData from "../../hooks/useUserData";
import { filterCurrentUser } from "../../utils/helper";

const ChatInfo = () => {
    const { onlineUsers } = useChat();
    const { currentChatInfo } = useChat();
    const { userInfo } = useUserData();

    if (!currentChatInfo) {
        return null;
    }
    const chatUser = filterCurrentUser(currentChatInfo.participants, userInfo);

    if (currentChatInfo.isGroup) {
    }
    return (
        <div className="px-2 py-4 w-[14%] -right-[15%] top-0 absolute  z-50 flexbox flex-col gap-2 bg-primary/10 rounded-2xl hover:bg-primary/40 border-[1px] border-primary duration-150 ">
            <div className="bg-red-300 col-span-1 w-full h-[6rem]  flexbox rounded-xl overflow-hidden">
                <img
                    src={chatUser.Profile.image}
                    alt=""
                    className=" w-full h-full object-cover animate-fade-in"
                />
            </div>
            <div className=" col-span-4 w-full flexbox flex-col items-start  ">
                <h2 className=" text-2xl font-semibold">{chatUser.name}</h2>
                <p className=" text-xs line-clamp-1 ">
                    {onlineUsers?.includes(chatUser.id) ? "Online" : "Offline"}
                </p>
            </div>
        </div>
    );
};

export default ChatInfo;
