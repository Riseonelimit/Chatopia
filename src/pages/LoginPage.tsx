import { SignIn, SignedOut } from "@clerk/clerk-react";
import React from "react";

const LoginPage = () => {
    return (
        <SignedOut>
            <section className="bg-slate-700 w-full h-screen">
                <SignIn signUpUrl="/signin" redirectUrl={"/dashboard"} />
            </section>
        </SignedOut>
    );
};

export default LoginPage;
