import {
    ArrowBigLeftIcon,
    ArrowBigRightIcon,
    CircleAlert,
    Trash2,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { getBase64 } from "../../utils/helper";
import { GroupModelChildrenProps } from "../dialogbox/CreateGroupModel";

const GroupImage = ({
    setNewGroup,
    newGroup,
    setProgress,
    progress,
}: GroupModelChildrenProps) => {
    const [imageStatus, setImageStatus] = useState<string>("");
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Image");
        if (!e.target.files) {
            setImageStatus("Not Image Selected");
        }
        if (e.target.files) {
            const file = e.target.files[0];

            if (file.size > 800_000) {
                return setImageStatus("Image size must be less than 800kb");
            }
            const base64Image: string = (await getBase64(file)) as string;
            setNewGroup({ ...newGroup, chatIcon: base64Image });
        }
    };
    return (
        <>
            {newGroup.chatIcon ? (
                <div className="w-full h-[10rem] group animate-fade-in rounded-2xl mt-4 relative overflow-hidden">
                    <img
                        src={newGroup.chatIcon}
                        alt=""
                        className=" w-full h-full absolute object-cover top-0 left-0"
                    />
                    <button
                        onClick={() =>
                            setNewGroup({ ...newGroup, chatIcon: "" })
                        }
                        className=" w-full h-full flexbox gap-2 absolute group-hover:opacity-[1] opacity-0 duration-150 bg-background/90 text-2xl font-bold text-red-400"
                    >
                        <Trash2 />
                        Delete
                    </button>
                </div>
            ) : (
                <div className=" relative border-4 border-secondary  border-dashed rounded-2xl w-full h-[10rem] animate-fade-in mt-4">
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onClick={() => setImageStatus("")}
                            onChange={handleImageChange}
                            className="w-full h-full opacity-0 rounded-2xl font-semibold"
                        />
                        <h2 className=" -z-10 absolute top-[50%] left-[50%] text-lg font-semibold transform translate-x-[-50%] translate-y-[-50%]">
                            Add Image
                        </h2>
                    </>
                </div>
            )}
            {imageStatus != "" ? (
                <h2 className=" rounded-xl px-2 py-3 bg-background/80 w-full text-center text-sm font-semibold text-red-300 flexbox gap-2">
                    <CircleAlert /> {imageStatus}
                </h2>
            ) : null}
            <div className=" flexbox gap-2">
                <button
                    onClick={() =>
                        setProgress({ ...progress, name: true, image: false })
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
                    onClick={() =>
                        setProgress({
                            ...progress,
                            image: false,
                            participants: true,
                        })
                    }
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

export default GroupImage;
