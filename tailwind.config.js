import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#191825",
                primary: "#810CA8",
                secondary: "#E5B8F4",
            },
            keyframes: {
                wave_zoom: {
                    "0%": { opacity: 0.45 },
                    "50%": {
                        opacity: 1,
                        transform: "scale(1.1)",
                        transform: "rotate(4deg)",
                    },
                    "100%": { opacity: 0.45 },
                },
                fade_in: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                sender_chat_add: {
                    "0%": {
                        opacity: 0,
                        transform: ["translate(20%)"],
                    },
                    "100%": { opacity: 1 },
                },
            },
            animation: {
                "pulse-slow": " wave_zoom 18s infinite ease-in-out",
                "fade-in": " fade_in 0.3s  ease-in",
                "sender-chat-add": " sender_chat_add 0.2s  ",
            },
        },
    },
    plugins: [],
};