import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function App() {
    const socket = useRef(io("http://localhost:8000")).current;
    const [message, setMessage] = useState<any>("");
    const [messages, setMessages] = useState<any>([]);
    const [clientID, setClientID] = useState<Number | null>(null);

    // console.log(user);  
    
    let users = new Map();
    users.set(0, "Lele Ome");
    users.set(1, "John Doe");
    users.set(2, "Foo bar");

    const handleClick = () => {
        console.log(localStorage.getItem("uuid"));

        socket.emit("message", {
            uuid: Number(localStorage.getItem("uuid")),
            message: message,
        });
    };

    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

    if (!PUBLISHABLE_KEY) {
        throw new Error("Missing Publishable Key");
    }

    useEffect(() => {
        setClientID(+localStorage.getItem("uuid"));
        socket.on("connect", () => {
            console.log("Connected: ", socket.id);
        });
    }, []);

    socket.on("message", (message) => {
        setMessages([...messages, message]);
    });
    const navigate = useNavigate()

    return (
        <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
            <section className=" w-full flex flex-col items-center gap-5 justify-center bg-slate-700 h-screen text-white">
                <h1>{users.get(clientID) + clientID}</h1>
                <input
                    className=" text-black"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    onClick={handleClick}
                    className=" bg-teal-500 px-3 py-2 rounded-lg"
                >
                    Send
                </button>
                <div className=" border-2 w-full h-[30%] flex flex-col items-start p-3">
                    {messages.map((e: any, idx: any) => {
                        if (e.uuid == clientID) {
                            return (
                                <h1
                                    key={idx}
                                    className=" bg-green-500 p-3 rounded-lg self-end font-semibold"
                                >
                                    {e.message}
                                </h1>
                            );
                        }
                        return (
                            <h1
                                key={idx}
                                className="bg-cyan-500 p-3 rounded-lg"
                            >
                                {users.get(e.uuid) + " : " + e.message}
                            </h1>
                        );
                    })}
                </div>

                <SignedIn>
                    <Link to="/dashboard">Dashboard</Link>
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>


                <Outlet/>
            </section>
        </ClerkProvider>
    );
}

export default App;
