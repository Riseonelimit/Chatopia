import useChat from "../../hooks/useChat";
import useUserData from "../../hooks/useUserData";
import Contact from "../Contact";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";

const ChatContainer = () => {
    const { friendList } = useUserData();
    const { onlineUsers } = useChat();

    // console.log(friendList);

    return (
        <div className=" z-50 p-3 h-[85vh] relative md:w-[90%] lg:w-3/4 bg-zinc-800/40 backdrop-blur-md grid grid-cols-4 gap-3 rounded-3xl border-[2px] border-primary/70 ">
            {/* CONTACTS */}
            <div className="py-3 px-2 col-span-1 w-full h-full  flexbox flex-col items-center justify-start gap-4 rounded-2xl overflow-y-auto no-scrollbar">
                {friendList?.map((data, idx) => {
                    return (
                        <Contact
                            key={idx}
                            userInfo={{
                                ...data,
                                isOnline: onlineUsers?.includes(data.id),
                            }}
                        />
                    );
                })}
            </div>

            {/* CHAT-SECTION */}
            <ChatBox />

            <ChatInfo />
        </div>
    );
};

export default ChatContainer;