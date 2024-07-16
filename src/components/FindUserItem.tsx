import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { createNewChat } from "../api/POST";
import useUserData from "../hooks/useUserData";
import { UserSearchList } from "../types/user";

const FindUserItem = ({ userDetails }: { userDetails: UserSearchList }) => {
    const { userInfo, userChats, setUserChats } = useUserData();
    const [loading, setLoading] = useState<boolean>(false);
    const [buttonStatus, setButtonStatus] = useState<string>("initial");
    const handleCreateContact = async () => {
        try {
            setLoading(true);
            const result = await createNewChat(userInfo, userDetails);
            if (!result) {
                throw new Error();
            }
            if (result.success && result.data && userChats) {
                setUserChats([...userChats, result.data]);
                setButtonStatus("added");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };
    return (
        <div className="p-2 w-full h-[5rem] border-primary border-2 group relative grid grid-cols-5 gap-2 bg-primary/20 rounded-2xl ">
            <div className="bg-red-300 w-full col-span-1  flexbox rounded-xl overflow-hidden">
                <img
                    src={userDetails.Profile.image}
                    alt=""
                    className=" w-full h-full object-cover"
                />
            </div>
            <div className=" col-span-3 flexbox justify-start font-medium text-lg">
                {userDetails.name}
            </div>
            <div className="flexbox justify-center col-span-1">
                <button
                    disabled={buttonStatus == "added" ? true : false}
                    onClick={handleCreateContact}
                    className="p-2 rounded-xl border-[2px] border-lime-600 bg-green-800/50 hover:cursor-pointer hover:bg-green-800 duration-300 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <LoaderCircle className=" animate-loading text-green-200" />
                    ) : buttonStatus == "initial" ? (
                        "Add"
                    ) : buttonStatus == "added" ? (
                        "Added"
                    ) : (
                        ""
                    )}
                </button>
            </div>
        </div>
    );
};

export default FindUserItem;
