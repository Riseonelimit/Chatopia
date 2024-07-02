import { X } from "lucide-react";
import { useDialogBox } from "../../hooks/useDialogBox";

const AddFriendModel = () => {
    const { setBoxType, setIsOpen } = useDialogBox();

    return (
        <div className=" px-3 py-2 w-[40%] bg-primary/30 flexbox gap-3 flex-col rounded-2xl border-primary border-2">
            <div className=" flexbox justify-between w-full gap-3">
                <input
                    type="text"
                    name="findContacts"
                    placeholder="FInd People..."
                    className=" w-full px-3 py-2  outline-none text-xl bg-background/70 rounded-md self-center placeholder:text-secondary placeholder:font-normal "
                />
                <div
                    onClick={() => {
                        setIsOpen(false);
                        setBoxType(null);
                    }}
                    className="p-2 rounded-xl border-[2px] border-primary hover:cursor-pointer "
                >
                    <X
                        absoluteStrokeWidth
                        className=" text-red-300 hover:text-white  duration-150"
                    />
                </div>
            </div>
            <div className=" px-3 py-2 bg-background/50 h-[20rem] w-full rounded-2xl">
                0000
            </div>
        </div>
    );
};

export default AddFriendModel;
