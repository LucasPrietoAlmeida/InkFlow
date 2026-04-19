import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav
        style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #ccc",
        }}
        >
        <Link to="/">InkFlow</Link>

        <div style={{ display: "flex", gap: "10px" }}>
            {user ? (
            <>
                <span>{user.username}</span>

                <Link to="/create">Create</Link>

                <button onClick={logout}>Logout</button>
            </>
            ) : (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
            )}
        </div>
        </nav>
    );
};

export default Navbar;