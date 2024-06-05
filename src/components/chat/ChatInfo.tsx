import useChat from "../../hooks/useChat";
import drink from "/src/assets/drink.svg";

const ChatInfo = () => {
    const { currentChatInfo } = useChat();

    if (!currentChatInfo) {
        return null;
    }
    return (
        <div className="px-2 py-4 w-[14%] -right-[15%] top-0 absolute  z-50 flexbox flex-col gap-2 bg-primary/10 rounded-2xl hover:bg-primary/40 border-[1px] border-primary duration-150 ">
            <div className="bg-red-300 col-span-1 w-full h-[6rem]  flexbox rounded-xl overflow-hidden">
                <img
                    src={currentChatInfo?.Profile?.image || drink}
                    alt=""
                    className=" w-full h-full object-cover"
                />
            </div>
            <div className=" col-span-4 w-full flexbox flex-col items-start  ">
                <h2 className=" text-2xl font-semibold">
                    {currentChatInfo?.name}
                </h2>
                <p className=" text-xs line-clamp-1 ">
                    {currentChatInfo?.isOnline ? "Online" : "Offline"}
                </p>
            </div>
        </div>
    );
};

export default ChatInfo;
