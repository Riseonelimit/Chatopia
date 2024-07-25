import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";
import useUserData from "../../hooks/useUserData";
import { GroupModelChildrenProps } from "../dialogbox/CreateGroupModel";
import AddParticipant from "./AddParticipant";
import useSocket from "../../hooks/useSocket";
import { Chat, User } from "../../types/user";
import { useDialogBox } from "../../hooks/useDialogBox";

const GroupParticipants = ({
    newGroup,
    setProgress,
    progress,
}: GroupModelChildrenProps) => {
    const { friendList, setUserChats, userChats, userInfo } = useUserData();
    const { socket } = useSocket();
    const { setIsOpen } = useDialogBox();

    const groupParticipants = new Set<string>();

    if (!userInfo) return;

    const handleCreateGroup = () => {
        const participantArray = [] as Array<Pick<User, "id">>;
        participantArray.push({ id: userInfo.id });
        groupParticipants.forEach((value) =>
            participantArray.push({ id: value })
        );
        socket?.emit(
            "group:create-new",
            { groupDetails: newGroup, participantArray },
            (response: Chat) => {
                console.log("callback called");
                console.log(response);

                if (response) {
                    if (userChats) {
                        setUserChats([...userChats, response]);
                    } else {
                        setUserChats([response]);
                    }
                }
            }
        );

        setIsOpen(false);
    };

    return (
        <>
            <div className=" px-2 py-2 flexbox flex-col justify-start gap-2 bg-background/50 h-[40rem] w-full rounded-2xl overflow-y-auto no-scrollbar">
                {friendList && friendList.length > 0
                    ? friendList?.map(({ friend }) => (
                          <AddParticipant
                              key={friend.id}
                              groupParticipants={groupParticipants}
                              userDetails={{
                                  name: friend.name,
                                  id: friend.id,
                                  Profile: friend.Profile,
                              }}
                          />
                      ))
                    : null}
            </div>
            <div className=" flexbox gap-2">
                <button
                    onClick={() =>
                        setProgress({
                            ...progress,
                            participants: false,
                            image: true,
                        })
                    }
                    className="p-2 rounded-xl flexbox gap-1 border-[2px]  border-secondary hover:cursor-pointer group animate-fade-in duration-150 text-sm"
                >
                    <ArrowBigLeftIcon
                        absoluteStrokeWidth
                        className=" text-secondary group-hover:text-white  duration-150"
                    />
                    Back
                </button>
                <button
                    onClick={handleCreateGroup}
                    className="p-2 rounded-xl border-[2px] bg-green-900/30 border-green-400 hover:cursor-pointer group animate-fade-in duration-150 flexbox gap-2 "
                >
                    <ArrowBigRightIcon
                        absoluteStrokeWidth
                        className=" text-green-400 group-hover:text-white  duration-150"
                    />
                </button>
            </div>
        </>
    );
};

export default GroupParticipants;
