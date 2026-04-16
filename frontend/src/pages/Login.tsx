import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
        const data = await loginRequest(form);
        login(data);

        navigate("/");
        } catch (err: any) {
        setError(err.response?.data?.error || "Login error");
        }
    };

    return (
        <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            />

            <button type="submit">Login</button>
        </form>

        {error && <p>{error}</p>}
        </div>
    );
};

export default Login;