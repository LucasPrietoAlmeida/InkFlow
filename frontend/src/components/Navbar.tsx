import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav
            style={{
                borderBottom: "1px solid #eaeaea",
                padding: "12px 24px",
                marginBottom: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Link
                    to="/articles"
                    style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    InkFlow
                </Link>

                {user && (
                    <Link
                        to="/articles/create"
                        style={{
                            textDecoration: "none",
                            color: "#333",
                            fontSize: "14px",
                        }}
                    >
                        Crear artículo
                    </Link>
                )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {user ? (
                    <>
                        <Link
                            to={`/${user.username}`}
                            style={{
                                textDecoration: "none",
                                color: "#333",
                                fontWeight: "500",
                            }}
                        >
                            {user.username}
                        </Link>

                        <button
                            onClick={handleLogout}
                            style={{
                                padding: "6px 12px",
                                borderRadius: "6px",
                                border: "1px solid #ddd",
                                background: "white",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            style={{
                                textDecoration: "none",
                                color: "#333",
                            }}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            style={{
                                textDecoration: "none",
                                color: "#333",
                            }}
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;