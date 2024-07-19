import ChatContainer from "../components/chat/ChatContainer";
import ChatNavbar from "../components/chat/ChatNavbar";
import { DialogBox } from "../components/dialogbox/DialogBox";
import useUserData from "../hooks/useUserData";

const Dashboard = () => {
    const { theme } = useUserData();

    return (
        <section
            className={`p-3 w-full h-screen bg-background text-white relative flex flex-col items-center justify-start gap-8 overflow-hidden ease-in-out duration-1000 ${theme}`}
        >
            {/* NAVBAR */}
            <ChatNavbar />

            {/* CHAT BOX CONTAINER */}
            <ChatContainer />

            <img
                src={`/images/${theme}.svg`}
                alt=""
                draggable={false}
                className="absolute z-20 select-none top-0 object-cover w-full h-full opacity-80 animate-pulse-slow  duration-1000 "
            />

            <DialogBox />
        </section>
    );
};

export default Dashboard;
