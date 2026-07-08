import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api";
import { toast } from "sonner";

interface AuthContextType {
    authed: boolean;
    user: any | null;
    loading: boolean;
    login: (data: any) => Promise<boolean>;
    register: (data: any, onSuccess?: () => void) => Promise<boolean>;
    logout: () => Promise<void>;
    setAuthed: (v: boolean) => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authed, setAuthed] = useState(false);
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initAuth();
    }, []);

    const initAuth = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            // Try refresh
            try {
                const res = await api.auth.refresh();
                if (res.accessToken) {
                    localStorage.setItem("access_token", res.accessToken);
                    await loadUser();
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
            }
            return;
        }
        await loadUser();
    };

    const loadUser = async () => {
        try {
            const data = await api.auth.getProfile();
            setUser(data);
            setAuthed(true);
        } catch (err) {
            console.error(err);
            // If profile fails, try refresh
            try {
                const res = await api.auth.refresh();
                if (res.accessToken) {
                    localStorage.setItem("access_token", res.accessToken);
                    const retryData = await api.auth.getProfile();
                    setUser(retryData);
                    setAuthed(true);
                } else {
                    setAuthed(false);
                }
            } catch (refreshErr) {
                setAuthed(false);
                localStorage.removeItem("access_token");
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: any) => {
        try {
            const res = await api.auth.login(data);
            if (res.accessToken) {
                localStorage.setItem("access_token", res.accessToken);
                await loadUser();
                return true;
            }
            return false;
        } catch (err: any) {
            toast.error(err.message || "Failed to login");
            return false;
        }
    };

    const register = async (data: any, onSuccess?: () => void) => {
        try {
            const res = await api.auth.register(data);
            if (res.accessToken) {
                localStorage.setItem("access_token", res.accessToken);
                if (onSuccess) onSuccess(); // Fire redirect BEFORE loadUser completes to beat the AuthLayout race condition
                await loadUser();
            }
            toast.success("Account created successfully!");
            return true;
        } catch (err: any) {
            toast.error(err.message || "Failed to register");
            return false;
        }
    };

    const logout = async () => {
        try {
            await api.auth.logout();
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem("access_token");
            setAuthed(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ authed, user, loading, login, register, logout, setAuthed, refreshUser: loadUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
