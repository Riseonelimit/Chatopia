import drink from "../assets/drink.svg";
import useChat from "../hooks/useChat";
import { CurrentChatUser } from "../types/user";

const Contact = ({ userInfo }: { userInfo: CurrentChatUser }) => {
    const { setCurrentChatInfo, currentChatInfo } = useChat();

    const setCurrentChat = () => {
        if (currentChatInfo?.id == userInfo.id) {
            return setCurrentChatInfo(null);
        }
        return setCurrentChatInfo(userInfo);
    };
    return (
        <div
            onClick={setCurrentChat}
            className={`p-2 w-full h-[5rem] group relative grid grid-cols-5 gap-2 bg-primary/20 rounded-2xl hover:bg-primary border-[1px] border-primary duration-150 hover:scale-[1.05] `}
        >
            <div className="bg-red-300 col-span-1 w-full  flexbox rounded-xl overflow-hidden">
                <img
                    src={userInfo.Profile?.image || drink}
                    alt=""
                    className=" w-full h-full object-cover"
                />
            </div>
            <div className=" col-span-4 w-full flexbox flex-col items-start  ">
                <h2 className=" font-semibold">{userInfo.name || "Name"}</h2>
                <p className=" text-xs line-clamp-1 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    officiis exercitationem, mollitia sapiente dolorem.
                </p>
            </div>

            <div className=" absolute -top-2 -right-2 shadow-lg p-[1px] z-[99] rounded-full">
                {userInfo.isOnline ? "🟢" : "🔴"}
            </div>
            {currentChatInfo?.id == userInfo.id ? (
                <div className=" w-full h-full absolute flexbox opacity-0 group-hover:opacity-[1]  bg-red-800 z-20 rounded-2xl  duration-150 group-hover:animate-fade-in cursor-pointer">
                    <h2 className="text-lg text-red-100 font-semibold">
                        Close chat
                    </h2>
                </div>
            ) : null}
        </div>
    );
};

export default Contact;
