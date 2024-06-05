import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    if (!isSignedIn) {
        return navigate("/login", { replace: true });
    } else return <>{children}</>;
};

export default ProtectedRoute;
