import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REQUEST_URL || "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});
