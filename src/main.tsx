import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import {
    RouterProvider,
    createBrowserRouter,
    useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
          { path: "dashboard", element: <Dashboard /> }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </React.StrictMode>
);
