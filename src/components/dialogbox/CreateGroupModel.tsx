import { X } from "lucide-react";
import { useState } from "react";
import { useDialogBox } from "../../hooks/useDialogBox";
import { Chat } from "../../types/user";
import GroupName from "../group/GroupName";
import GroupImage from "../group/GroupImage";
import GroupParticipants from "../group/GroupParticipants";

export type GroupModelChildrenProps = {
    newGroup: Pick<Chat, "groupName" | "chatIcon" | "isGroup">;
    progress: Progress;
    setProgress: React.Dispatch<React.SetStateAction<Progress>>;
    setNewGroup: React.Dispatch<
        React.SetStateAction<Pick<Chat, "groupName" | "chatIcon" | "isGroup">>
    >;
};

type Progress = {
    name: boolean;
    image: boolean;
    participants: boolean;
};

const CreateGroupModel = () => {
    const { setBoxType, setIsOpen } = useDialogBox();

    const [newGroup, setNewGroup] = useState<
        Pick<Chat, "groupName" | "chatIcon" | "isGroup">
    >({
        groupName: "",
        isGroup: true,
        chatIcon: "",
    });

    const [progress, setProgress] = useState<Progress>({
        name: true,
        image: false,
        participants: false,
    });

    return (
        <div className=" px-3 py-2 lg:w-[20vw] md:w-[50%] lg:min-w-[20vw] bg-primary/30 relative flexbox gap-3 flex-col rounded-2xl border-primary  border-2">
            <h2 className=" self-start text-2xl font-semibold text-secondary">
                Create Group
            </h2>
            {progress.name ? (
                <GroupName
                    newGroup={newGroup!}
                    progress={progress}
                    setNewGroup={setNewGroup}
                    setProgress={setProgress}
                />
            ) : progress.image ? (
                <GroupImage
                    newGroup={newGroup!}
                    progress={progress}
                    setNewGroup={setNewGroup}
                    setProgress={setProgress}
                />
            ) : progress.participants ? (
                <GroupParticipants
                    newGroup={newGroup!}
                    progress={progress}
                    setNewGroup={setNewGroup}
                    setProgress={setProgress}
                />
            ) : null}
            <div className=" flexbox flex-col justify-between w-full gap-3">
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
        </div>
    );
};

export default CreateGroupModel;
