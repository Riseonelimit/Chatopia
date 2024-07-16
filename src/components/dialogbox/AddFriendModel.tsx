import { Search, X } from "lucide-react";
import { useState } from "react";
import useChat from "../../hooks/useChat";
import { useDialogBox } from "../../hooks/useDialogBox";
import useSocket from "../../hooks/useSocket";
import useUserData from "../../hooks/useUserData";
import FindUserItem from "../FindUserItem";

const AddFriendModel = () => {
    const { setBoxType, setIsOpen } = useDialogBox();
    const [searchName, setSearchName] = useState("");

    const { socket } = useSocket();
    const { userInfo } = useUserData();
    const { findUserList } = useChat();

    const searchFriend = () => {
        console.log("find friend");
        console.log(searchName);

        socket?.emit(`chat:find-user:${userInfo?.id}`, {
            id: userInfo?.id,
            searchName,
        });
    };

    return (
        <div className=" px-3 py-2 lg:w-[20vw] md:w-[50%] lg:min-w-[20vw] bg-primary/30 relative flexbox gap-3 flex-col rounded-2xl border-primary  border-2">
            <div className=" flexbox justify-between w-full gap-3">
                <input
                    type="text"
                    name="findContacts"
                    autoComplete="off"
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="FInd People..."
                    className=" w-full px-3 py-2  outline-none text-xl bg-background/70 rounded-xl self-center placeholder:text-secondary/60 placeholder:font-normal "
                />
                <div className="p-2 rounded-xl border-[2px] border-primary hover:cursor-pointer  animate-fade-in duration-150  ">
                    {" "}
                    <Search
                        onClick={searchFriend}
                        absoluteStrokeWidth
                        className=" text-secondary hover:text-white  duration-150"
                    />
                </div>

                <div
                    onClick={() => {
                        setIsOpen(false);
                        setBoxType(null);
                    }}
                    className="p-2 rounded-xl opacity-[45%] border-[2px] border-red-500 hover:cursor-pointer bg-red-800/30 hover:opacity-[100]   absolute top-1 right-[-14%] animate-fade-in duration-150  "
                >
                    <X
                        absoluteStrokeWidth
                        className=" text-red-400   duration-150"
                    />
                </div>
            </div>
            <div className=" px-2 py-2 flexbox flex-col justify-start gap-2 bg-background/50 h-[40rem] w-full rounded-2xl overflow-y-auto no-scrollbar">
                {findUserList?.map((userDetails) => (
                    <FindUserItem
                        key={userDetails.id}
                        userDetails={userDetails}
                    />
                ))}
            </div>
        </div>
    );
};

export default AddFriendModel;
