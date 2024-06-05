import { SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import { Replace } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    if (isSignedIn) {
        navigate("/dashboard", { replace: true });
    }
    return (
        <SignedOut>
            <section className="bg-slate-700 w-full h-screen">
                <SignIn signUpUrl="/signin" redirectUrl={"/dashboard"} />
            </section>
        </SignedOut>
    );
};

export default LoginPage;
