import { UserSearchList } from "../types/user";

const FindUserItem = ({ userDetails }: { userDetails: UserSearchList }) => {
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
                <button className="p-2 rounded-xl border-[2px] border-lime-600 bg-green-800/50 hover:cursor-pointer hover:bg-green-800 duration-300 ">
                    Add
                </button>
            </div>
        </div>
    );
};

export default FindUserItem;
