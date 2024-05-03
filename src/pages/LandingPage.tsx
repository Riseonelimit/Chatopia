import { useClerk, useUser } from "@clerk/clerk-react";
import bg from "../assets/background_blur.svg";
import grid from "../assets/grid.svg";
import cheeky from "../assets/emojie_cheeky.svg";
import love from "../assets/love.svg";
import chat from "../assets/chat.svg";
import drink from "../assets/drink.svg";
import { HOMEPAGE_URL } from "../utils/const";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const { openSignIn, openSignUp } = useClerk();
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    return (
        <section className=" w-full h-screen overflow-y-hidden bg-background relative flex flex-col items-center justify-center">
            <div className="z-[100] flexbox flex-col gap-10 w-[40%] text-center">
                <h1 className=" font-bold bg-gradient-to-r from-purple-200 to-stone-400 text-transparent bg-clip-text">
                    Chatopia
                </h1>
                <p className=" text-secondary text-normal font-[400]">
                    Connect with your in a new way of Chatting Looking for a new
                    way to connect with your loved ones ? <br />
                    Connect with your{" "}
                    <span className="font-semibold">
                        Friends, Family and Colleagues
                    </span>{" "}
                    in a new and exciting way - join us today!
                </p>

                <div className="flexbox gap-3">
                    <button
                        onClick={(e) => {
                            if (isSignedIn) {
                                navigate(HOMEPAGE_URL);
                            }
                            openSignIn({ redirectUrl: HOMEPAGE_URL });
                        }}
                        className=" primary-btn"
                    >
                        LogIn
                    </button>
                    <button
                        onClick={(e) => {
                            if (isSignedIn) {
                                navigate(HOMEPAGE_URL);
                            }
                            openSignUp({ redirectUrl: HOMEPAGE_URL });
                        }}
                        className=" secondary-btn"
                    >
                        SignUp
                    </button>
                </div>
            </div>
            <img
                src={bg}
                alt=""
                draggable={false}
                className="absolute z-10 select-none top-0 object-cover w-full h-full"
            />
            <img
                src={grid}
                alt=""
                draggable={false}
                className="absolute z-20 select-none top-0 object-cover w-full h-full opacity-25"
            />
            <img
                src={cheeky}
                alt=""
                draggable={false}
                className="absolute z-20 select-none -bottom-[10%] right-[10%] w-[10%]  hover:-rotate-12 hover:-translate-y-[100px] duration-150  backdrop-blur-lg rotate-12"
            />
            <img
                src={drink}
                alt=""
                draggable={false}
                className="absolute z-20 select-none -bottom-[10%] right-[50%] w-[10%]  hover:-rotate-12 hover:-translate-y-[100px] duration-150  backdrop-blur-lg rotate-6"
            />
            <img
                src={love}
                alt=""
                draggable={false}
                className="absolute z-20 select-none -bottom-[10%] right-[30%] hover:rotate-12 hover:-translate-y-[100px] duration-150  w-[10%] backdrop-blur-lg -rotate-12"
            />
            <div className="absolute  -bottom-[10%] right-[70%] group   w-[10%] flexbox flex-col gap-1">
                <span className=" px-3 py-2 rounded-2xl bg-primary/10 border-[1px] border-primary/70 text-white font-[400] text-center backdrop-blur-md group-hover:-translate-y-[130px] group-hover:visible invisible duration-300 group-hover:opacity-100 opacity-0">
                    Be a cool
                </span>
                <img
                    src={chat}
                    alt=""
                    draggable={false}
                    className=" z-20 select-none  group-hover:rotate-12 group-hover:-translate-y-[100px] duration-300 w-full -rotate-12 "
                />
            </div>
        </section>
    );
};

export default LandingPage;
