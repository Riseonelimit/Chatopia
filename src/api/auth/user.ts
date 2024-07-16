import { ResultData } from "../../providers/UserDataProvider";
import { axiosInstance } from "../axios";

export interface ApiResult<T> {
    success: boolean;
    data: T;
    message?: string;
}

export const authUser = async (
    email: string | undefined
): Promise<ApiResult<ResultData | null>> => {
    try {
        const { data, status } = await axiosInstance.get("/auth", {
            params: {
                email: email,
            },
        });

        if (status != 200) {
            console.log(data);
            throw new Error(data.data);
        }
        if (data.data == null) {
            throw new Error("Not Found");
        }
        return { success: true, data: data.data, message: "Found" };
    } catch (e) {
        console.log("AUTH CATCH : " + e);
        return { success: false, data: null, message: e as string };
    }
};
