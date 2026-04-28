import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav
        style={{
            borderBottom: "1px solid #ddd",
            padding: "10px 20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}
        >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <h2>InkFlow</h2>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {user ? (
            <>
                <Link to="/articles/create">
                <button
                    style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                    }}
                >
                    Crear artículo
                </button>
                </Link>

                <span>{user.username}</span>

                <button onClick={logout}>Cerrar Sesión</button>
            </>
            ) : (
            <>
                <Link to="/login" style={{ marginRight: "10px" }}>
                Login
                </Link>
                <Link to="/register">Registro</Link>
            </>
            )}
        </div>
        </nav>
    );
};

export default Navbar;