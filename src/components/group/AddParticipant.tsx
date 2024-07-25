import { Plus, X } from "lucide-react";
import { useState } from "react";
import { UserSearchList } from "../../types/user";

const AddParticipant = ({
    userDetails,
    groupParticipants,
}: {
    userDetails: UserSearchList;
    groupParticipants: Set<string>;
}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

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
                    onClick={() => {
                        if (groupParticipants.has(userDetails.id)) {
                            groupParticipants.delete(userDetails.id);
                        } else {
                            groupParticipants.add(userDetails.id);
                        }
                        console.log(groupParticipants);

                        setIsSelected(!isSelected);
                    }}
                    className={`p-2 rounded-xl border-[2px] hover:cursor-pointer  duration-300 disabled:cursor-not-allowed ${
                        isSelected
                            ? "border-red-400 bg-red-800/50 hover:bg-red-800 text-red-400"
                            : "border-lime-600 bg-green-800/50 hover:bg-green-800 text-lime-400"
                    }`}
                >
                    {isSelected ? <X /> : <Plus />}
                </button>
            </div>
        </div>
    );
};

export default AddParticipant;
