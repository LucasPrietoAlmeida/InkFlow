import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest, loginRequest } from "../services/auth";
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
        // registrar
        await registerRequest(form);

        // auto login
        const data = await loginRequest({
            email: form.email,
            password: form.password,
        });

        login(data);
        navigate("/");
        } catch (err: any) {
        setError(err.message || "Register error");
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
            required
            />

            <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            />

            <button type="submit">Register</button>
        </form>

        {error && <p>{error}</p>}
        </div>
    );
};

export default Register;