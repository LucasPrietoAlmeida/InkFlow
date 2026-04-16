import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        username: "",
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
        const user = await registerRequest(form);

        const loginRes = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: form.email,
            password: form.password,
            }),
        });

        const data = await loginRes.json();

        login(data);
        navigate("/");
        } catch (err: any) {
        setError(err.response?.data?.error || "Register error");
        }
    };

    return (
        <div>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
            <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            />

            <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            />

            <button type="submit">Register</button>
        </form>

        {error && <p>{error}</p>}
        </div>
    );
};

export default Register;