import { ApiResult } from "./auth/user";
import { axiosInstance } from "./axios";

export const addUser = async (userData: {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
}): Promise<ApiResult> => {
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
