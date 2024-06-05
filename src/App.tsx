import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatProvider from "./providers/ChatProvider";
import MessageProvider from "./providers/MessageProvider";
import SocketProvider from "./providers/SocketProvider";
import UserDataProvider from "./providers/UserDataProvider";
import { CLERK_PUBLISHABLE_KEY } from "./utils/const";

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
            <UserDataProvider>
                <SocketProvider>
                    <ChatProvider>
                        <MessageProvider>
                            {pathname == "/" ? <LandingPage /> : <Outlet />}
                        </MessageProvider>
                    </ChatProvider>
                </SocketProvider>
            </UserDataProvider>
        </ClerkProvider>
    );
}

export default App;
