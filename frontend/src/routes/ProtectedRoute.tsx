import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

type Props = {
    children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
    const { user, loading } = useAuth();
    const token = localStorage.getItem("token");

    if (loading) return <p>Loading...</p>;

    if (!user && !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;