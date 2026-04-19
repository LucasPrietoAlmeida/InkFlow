import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type User = {
    id: string;
    email: string;
    username: string;
};

type AuthData = {
    token: string;
    user: User;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (data: AuthData) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = (data: AuthData) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};