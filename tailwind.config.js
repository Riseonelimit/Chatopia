/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--color-background) / <alpha-value>)",
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                secondary: "rgb(var(--color-secondary) / <alpha-value>)",
            },
            keyframes: {
                wave_zoom: {
                    "0%": { opacity: 0.45, transform: "scale(1.1)" },

                    "50%": {
                        opacity: 1,
                        transform: "scale(1.1)",
                        transform: "rotate(1deg)",
                    },
                    "100%": { opacity: 0.45, transform: "scale(1.1)" },
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
                receive_chat: {
                    "0%": {
                        opacity: 0,
                        transform: ["translate(-20%)"],
                    },
                    "100%": { opacity: 1 },
                },
                fade_top: {
                    "0%": {
                        opacity: 0,
                        transform: ["translateY(20%)"],
                    },
                    "100%": { opacity: 1 },
                },
                loading: {
                    "0%": {
                        transform: "rotate(0deg)",
                    },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
            animation: {
                "pulse-slow": " wave_zoom 18s infinite ease-in-out",
                "fade-in": " fade_in 0.3s  ease-in",
                "send-chat": " sender_chat_add 0.2s  ",
                "fade-top": " fade_top 0.2s ease-in",
                "fade-top-delayed": " fade_top 0.6s ease-in-out",
                "receive-chat": " receive_chat 0.2s  ",
                loading: " loading 1s infinite ease-in-out ",
            },
        },
    },
    plugins: [],
};
