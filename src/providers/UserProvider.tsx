import { useUser } from "@clerk/clerk-react";
import { ReactNode, createContext } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const { user, isSignedIn } = useUser();

    return (
        <UserContext.Provider value={{ user, isSignedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
