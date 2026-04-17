import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../services/articles";

const CreateArticle = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        intro: "",
        content: "",
    });

    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
        const article = await createArticle(form);

        // redirigir al artículo recién creado
        navigate(`/articles/${article.slug}`);
        } catch (err: any) {
        setError(err.response?.data?.error || "Error creating article");
        }
    };

    return (
        <div>
        <h1>Create Article</h1>

        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            />

            <input
            type="text"
            name="intro"
            placeholder="Intro"
            onChange={handleChange}
            />

            <textarea
            name="content"
            placeholder="Content"
            rows={10}
            onChange={handleChange}
            />

            <button type="submit">Create</button>
        </form>

        {error && <p>{error}</p>}
        </div>
    );
};

export default CreateArticle;