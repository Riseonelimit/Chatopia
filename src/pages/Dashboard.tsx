import bg from "../assets/dashboard_blur.svg";
import grid from "../assets/leaves.svg";
import ChatContainer from "../components/chat/ChatContainer";
import ChatNavbar from "../components/chat/ChatNavbar";
import { DialogBox } from "../components/dialogbox/DialogBox";

const Dashboard = () => {
    return (
        <section className=" p-3 w-full h-screen bg-background text-white relative flex flex-col items-center justify-start gap-8 overflow-hidden">
            {/* NAVBAR */}
            <ChatNavbar />

            {/* CHAT BOX CONTAINER */}
            <ChatContainer />

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
                className="absolute z-10 select-none top-0 object-cover w-full h-full opacity-80 animate-pulse-slow duration-1000 "
            />

            <DialogBox />
        </section>
    );
};

export default Dashboard;
