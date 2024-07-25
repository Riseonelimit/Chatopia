import { UserButton } from "@clerk/clerk-react";
import { Bell, Paintbrush, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";
import { useDialogBox } from "../../hooks/useDialogBox";
import useSocket from "../../hooks/useSocket";
import useUserData from "../../hooks/useUserData";
import { THEME } from "../../types/user";
import Tooltip from "../message/Tooltip";
import { BoxType } from "../../types/chat";

const ChatNavbar = () => {
    const { isConnected, socket } = useSocket();
    const { setIsOpen, setBoxType } = useDialogBox();

    const [themeBox, setThemeBox] = useState<boolean>(false);
    const { setTheme, setUserInfo, userInfo } = useUserData();

    const handleThemeChange = (theme: THEME) => {
        socket?.emit("user:update-theme", { theme, userId: userInfo?.id });
        setUserInfo({
            ...userInfo!,
            Profile: { ...userInfo!.Profile, theme: theme },
        });
        setTheme(theme);
        localStorage.setItem("theme", theme);
    };

    const themeEntries = Object.keys(THEME);
    return (
        <div className=" z-[70] p-5 w-3/4 bg-primary/10 backdrop-blur-md flexbox gap-3  rounded-3xl border-[2px] border-primary/70 animate-fade-in">
            <h2 className=" mr-auto text-3xl font-bold bg-gradient-to-r from-primary/60 to-primary text-transparent bg-clip-text">
                Chatopia
            </h2>

            {isConnected ? (
                <h2 className=" px-2 py-2 rounded-xl text-sm border-green-400 border-[1px] text-green-300 bg-green-700/50 font-[400] animate-fade-in">
                    🟢 Realtime Updates
                </h2>
            ) : (
                <h2 className="px-2 py-2 rounded-xl text-sm border-yellow-400 border-[1px] text-yellow-300 bg-yellow-700/50 font-[400] animate-fade-in">
                    🟡 Polling 1s
                </h2>
            )}
            <div className="p-2 rounded-xl flexbox flex-col group border-[1px] border-primary hover:cursor-pointer">
                <Bell
                    absoluteStrokeWidth
                    className=" text-secondary/70 group-hover:text-white duration-150"
                />
                <Tooltip message="Notifications" />
            </div>
            <div className="p-2 rounded-xl flexbox flex-col border-[1px] border-primary hover:cursor-pointer group">
                <UserPlus
                    onClick={() => {
                        setIsOpen(true);
                        setBoxType(BoxType.ADD_FRIEND);
                    }}
                    absoluteStrokeWidth
                    className=" text-secondary/70 group-hover:text-white duration-150"
                />
                <Tooltip message="New Contact" />
            </div>
            <div className="p-2 rounded-xl flexbox flex-col border-[1px] border-primary hover:cursor-pointer group">
                <Users
                    onClick={() => {
                        setIsOpen(true);
                        setBoxType(BoxType.CREATE_GROUP);
                    }}
                    absoluteStrokeWidth
                    className=" text-secondary/70 group-hover:text-white duration-150"
                />
                <Tooltip message="New Group" />
            </div>
            <div className=" relative flexbox ">
                <div
                    onClick={() => setThemeBox(!themeBox)}
                    className={`p-2 rounded-xl border-[1px] hover:cursor-pointer flexbox relative flex-col group ${
                        themeBox ? "border-red-500" : "border-primary"
                    }`}
                >
                    {themeBox ? (
                        <X absoluteStrokeWidth className=" text-red-500" />
                    ) : (
                        <>
                            <Paintbrush
                                absoluteStrokeWidth
                                className=" text-secondary/70 group-hover:text-white duration-150"
                            />
                            <Tooltip message="Themes" />
                        </>
                    )}
                </div>
                {themeBox ? (
                    <div className=" p-2 absolute z-[99] -bottom-[150%] flexbox gap-3 rounded-2xl  border-primary border-[1px] bg-background/60 animate-fade-in ">
                        {themeEntries.map((theme, idx) => (
                            <button
                                key={idx}
                                onClick={() =>
                                    handleThemeChange(theme as THEME)
                                }
                                className=" px-3 py-2 w-full text-sm font-semibold text-center rounded-xl "
                            >
                                {theme}
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="p-2 rounded-xl border-[1px] border-primary hover:cursor-pointer">
                <UserButton afterSignOutUrl="/" userProfileMode="modal" />
            </div>
        </div>
    );
};

export default ChatNavbar;
