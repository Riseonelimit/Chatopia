import { useContext } from "react";
import { UserDataContext } from "../providers/UserDataProvider";

const useUserData = () => {
    return useContext(UserDataContext);
};
export default useUserData;
