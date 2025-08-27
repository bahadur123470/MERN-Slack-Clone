import { createContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const { getToken } = useAuth();

    useEffect(() => {
        // Setup axios interceptor
        const interceptor = axiosInstance.interceptors.request.use(
            async (config) => {
                try {
                    const token = await getToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error) {
                    if (error.message?.toLowerCase().includes("auth") || error.message?.toLowerCase().includes("token")) {
                    toast.error("Authentication Error! Please refresh the page or login again.");
                    }
                    console.error("Error fetching token:", error);
                }
            return config;
            },
            (error) => {
                console.error("Axios request error:", error);
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor on unmount
        return () => {
            axiosInstance.interceptors.request.eject(interceptor);
        };
    }, [getToken]);

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}