import { ArrowBigRightIcon } from "lucide-react";
import { GroupModelChildrenProps } from "../dialogbox/CreateGroupModel";

const GroupName = ({
    setNewGroup,
    newGroup,
    setProgress,
    progress,
}: GroupModelChildrenProps) => {
    return (
        <>
            <input
                type="text"
                name="findContacts"
                autoComplete="off"
                value={newGroup?.groupName}
                onChange={(e) =>
                    setNewGroup({ ...newGroup!, groupName: e.target.value })
                }
                placeholder="Group Name"
                className=" w-full px-3 py-2  outline-none text-lg bg-background/70 rounded-xl self-center placeholder:text-secondary/60 placeholder:font-normal "
            />

            <button
                onClick={() =>
                    setProgress({ ...progress, name: false, image: true })
                }
                className="p-2 rounded-xl border-[2px] bg-green-900/30 border-green-400 hover:cursor-pointer group animate-fade-in duration-150  "
            >
                {" "}
                <ArrowBigRightIcon
                    absoluteStrokeWidth
                    className=" text-green-400 group-hover:text-white  duration-150"
                />
            </button>
        </>
    );
};

export default GroupName;
