import { UserRoundX } from "lucide-react";
import drink from "../assets/drink.svg";
import useChat from "../hooks/useChat";
import { CurrentChatUser } from "../types/user";

const Contact = ({ userInfo }: { userInfo: CurrentChatUser }) => {
    const { setCurrentChatInfo, currentChatInfo } = useChat();

    const setCurrentChat = () => {
        return setCurrentChatInfo(userInfo);
    };
    const handleCurrentChatBtn = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        if (currentChatInfo?.id == userInfo.id) {
            console.log("clicked");

            return setCurrentChatInfo(null);
        }
    };
    return (
        <div
            onClick={setCurrentChat}
            className={`p-2 w-full h-[5rem] group relative grid grid-cols-5 gap-2 bg-primary/20 rounded-2xl hover:bg-primary border-[1px] border-primary duration-150 hover:scale-[1.03]`}
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
                <div className=" px-3 py-2 w-full h-full absolute flexbox justify-between opacity-0 group-hover:opacity-[1]  bg-background z-20 rounded-2xl  duration-300 cursor-pointer group-hover:animate-fade-top ">
                    <button
                        onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => handleCurrentChatBtn(e)}
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
