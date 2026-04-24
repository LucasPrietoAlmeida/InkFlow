import { useState } from "react";
import { createArticle } from "../services/articles";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const CreateArticle = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        intro: "",
        content: "",
        status: "draft",
    });

    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.content) {
        setError("Title and content are required");
        return;
        }

        try {
        const article = await createArticle(form);
        navigate(`/articles/${article.slug}`);
        } catch (err: any) {
        setError(err.message);
        }
    };

    return (
        <div>
        <h1>Creando Articulo</h1>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit}>
            <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            />

            <input
            name="intro"
            placeholder="Intro"
            value={form.intro}
            onChange={handleChange}
            />

            <textarea
            name="content"
            rows={10}
            value={form.content}
            onChange={handleChange}
            />

            <select name="status" value={form.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            </select>

            <button type="submit">Crear</button>
        </form>
        </div>
    );
};

export default CreateArticle;