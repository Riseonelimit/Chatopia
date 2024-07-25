import useChat from "../../hooks/useChat";
import useUserData from "../../hooks/useUserData";
import { filterCurrentUser } from "../../utils/helper";
import Contact from "../Contact";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";

const ChatContainer = () => {
    const { userChats, userInfo } = useUserData();
    const { onlineUsers } = useChat();
    console.log(userChats);

    return (
        <div className=" z-50 p-3 h-[85vh] relative md:w-[90%] lg:w-3/4 bg-zinc-800/40 backdrop-blur-md grid grid-cols-4 gap-3 rounded-3xl border-[2px] border-primary/70 animate-fade-in ">
            {/* CONTACTS */}
            <div className="py-3 px-2 col-span-1 w-full h-full  flexbox flex-col items-center justify-start gap-4 rounded-2xl overflow-y-auto no-scrollbar">
                {userChats?.map((data, idx) => {
                    return (
                        <Contact
                            key={idx}
                            chatInfo={data}
                            isOnline={
                                data.isGroup
                                    ? false
                                    : onlineUsers?.includes(
                                          filterCurrentUser(
                                              data.participants,
                                              userInfo
                                          ).id
                                      )
                            }
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