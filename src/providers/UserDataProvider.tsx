import { useUser } from "@clerk/clerk-react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/POST";
import { authUser } from "../api/auth/user";
import useSocket from "../hooks/useSocket";
import { Chat, InsertUser, THEME, User } from "../types/user";

interface UserContext {
    isAuth: boolean;
    userInfo: User | null;
    friendList: User[] | null;
    userChats: Chat[] | null;
    theme: THEME;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
    setFriendList: React.Dispatch<React.SetStateAction<User[] | null>>;
    setUserChats: React.Dispatch<React.SetStateAction<Chat[] | null>>;
    setTheme: React.Dispatch<React.SetStateAction<THEME>>;
}

export const UserDataContext = createContext<UserContext>({
    isAuth: false,
    theme: THEME.DEFAULT,
    userInfo: null,
    friendList: null,
    userChats: null,
    setIsAuth: () => {},
    setUserInfo: () => {},
    setFriendList: () => {},
    setUserChats: () => {},
    setTheme: () => {},
});

export interface ResultData {
    userInfo: User;
    userChats: Chat[];
}

const UserDataProvider = ({ children }: { children: ReactNode }) => {
    const cacheTheme = localStorage.getItem("theme") as THEME;

    const [theme, setTheme] = useState<THEME>(cacheTheme || THEME.DEFAULT);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [friendList, setFriendList] = useState<User[] | null>(null);
    const [userChats, setUserChats] = useState<Chat[] | null>(null);

    const navigate = useNavigate();

    const { isSignedIn, user } = useUser();

    const { socket } = useSocket();

    useEffect(() => {
        const checkIfUserExist = async () => {
            if (!user) return;

            const res = await authUser(user?.emailAddresses[0].emailAddress);

            if (res.success && res.data) {
                setIsAuth(true);
                setUserInfo(res.data?.userInfo);
                setUserChats(res.data?.userChats);
                setTheme(res.data?.userInfo.Profile.theme);
                // navigate("/dashboard", { replace: true });
            } else {
                const userData: InsertUser = {
                    name: user?.username || user?.fullName,
                    email: user?.emailAddresses[0].emailAddress,
                    Profile: {
                        image: user?.imageUrl,
                        theme: THEME.DEFAULT,
                    },
                };
                const result = await addUser(userData);
                if (result.success) {
                    setIsAuth(true);
                    // navigate("/dashboard", { replace: true });
                }
            }
        };
        if (isSignedIn && !isAuth) checkIfUserExist();

        if (!isSignedIn) {
            console.log("signed out called ");

            socket?.disconnect();
            setIsAuth(false);
        }
    }, [user, navigate, isAuth, isSignedIn, socket, cacheTheme]);

    useEffect(() => {}, [isSignedIn, user]);
    return (
        <UserDataContext.Provider
            value={{
                isAuth,
                setIsAuth,
                userInfo,
                setUserInfo,
                friendList,
                setFriendList,
                userChats,
                setUserChats,
                theme,
                setTheme,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataProvider;
