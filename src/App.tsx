import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CLERK_PUBLISHABLE_KEY } from "./utils/const";
import LandingPage from "./pages/LandingPage";
import SocketProvider from "./providers/SocketProvider";
import ChatProvider from "./providers/ChatProvider";
import MessageProvider from "./providers/MessageProvider";

function App() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (
        <ClerkProvider
            navigate={navigate}
            publishableKey={CLERK_PUBLISHABLE_KEY}
            signUpUrl="/signin"
            signInUrl="/login"
            appearance={{ baseTheme: dark }}
        >
            <SocketProvider>
                <ChatProvider>
                    <MessageProvider>
                        {pathname == "/" ? <LandingPage /> : <Outlet />}
                    </MessageProvider>
                </ChatProvider>
            </SocketProvider>
        </ClerkProvider>
    );
}

export default App;
