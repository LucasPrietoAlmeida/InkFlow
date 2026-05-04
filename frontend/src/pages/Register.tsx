import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest, loginRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            await registerRequest(form);

            const data = await loginRequest({
                email: form.email,
                password: form.password,
            });

            login(data);

            toast.success("Cuenta creada correctamente");

            navigate("/");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div
                style={{
                    minHeight: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        background: "#fff",
                        border: "1px solid #eaeaea",
                        borderRadius: "14px",
                        padding: "40px",
                        boxShadow: "0 10px 30px rgba(0,0,0,.06)",
                    }}
                >
                    <h1
                        style={{
                            marginBottom: "8px",
                            fontSize: "30px",
                        }}
                    >
                        Crear cuenta
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginBottom: "30px",
                        }}
                    >
                        Únete a la comunidad de InkFlow
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            name="username"
                            placeholder="Usuario"
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            style={buttonStyle}
                        >
                            {loading ? "Creando..." : "Crear cuenta"}
                        </button>
                    </form>

                    <p
                        style={{
                            marginTop: "24px",
                            color: "#666",
                            textAlign: "center",
                        }}
                    >
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

const inputStyle = {
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
};

const buttonStyle = {
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    background: "#111",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "15px",
};

export default Register;