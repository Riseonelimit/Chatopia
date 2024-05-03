import { SignUp, SignedOut } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useLocation, useParams } from "react-router-dom";

const SignUpPage = () => {
    const location = useLocation();
    const param = useParams();

    console.log(param);

    return (
        <SignedOut>
            <section className="bg-slate-700 w-full h-screen">
                <SignUp signInUrl="/login" redirectUrl={null} />
            </section>
        </SignedOut>
    );
};
export default SignUpPage;
