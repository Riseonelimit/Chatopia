import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ReactProps } from "../types/react";

const ProtectedRoute = ({ children }: ReactProps) => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    if (!isSignedIn) {
        return navigate("/login", { replace: true });
    } else return <>{children}</>;
};

export default ProtectedRoute;
