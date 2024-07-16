import { ResultData } from "../providers/UserDataProvider";
import { Chat, User, UserSearchList } from "../types/user";
import { ApiResult } from "./auth/user";
import { axiosInstance } from "./axios";

export const addUser = async (
    userData: Omit<User, "id">
): Promise<ApiResult<ResultData | null>> => {
    try {
        const { data, status } = await axiosInstance.post(
            "/user/new_user",
            userData
        );

        console.log(data);
        if (status != 201) {
            throw new Error(data.data);
        }
        if (data.data == null) {
            throw new Error("Something went wrong");
        }
        return { success: true, data: data.data, message: "User Added" };
    } catch (e) {
        return { success: false, data: null, message: e as string };
    }
};

export const createNewChat = async (
    currentUser: User | null,
    userDetails: UserSearchList
): Promise<ApiResult<Chat | null>> => {
    try {
        const { data, status } = await axiosInstance.post("/chat", {
            currentUser,
            userDetails,
        });

        console.log(data);
        if (status != 201) {
            throw new Error(data.data);
        }
        if (data.data == null) {
            throw new Error("Something went wrong");
        }
        return {
            success: true,
            data: data.data.chat,
            message: "Chat Created Successfully",
        };
    } catch (e) {
        return { success: false, data: null, message: e as string };
    }
};
