import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, updateArticle } from "../services/articles";

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        intro: "",
        content: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
        try {
            if (!id) return;

            const article = await getArticleById(id);

            setForm({
            title: article.title,
            intro: article.intro || "",
            content: article.content,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchArticle();
    }, [id]);

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

        if (!id) return;

        if (!form.title || !form.content) {
        alert("Title and content are required");
        return;
        }

        try {
        const article = await updateArticle(id, form);
        navigate(`/articles/${article.slug}`);
        } catch (error) {
        console.error(error);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <div>
        <h1>Edit Article</h1>

        <form onSubmit={handleSubmit}>
            <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            />

            <input
            name="intro"
            value={form.intro}
            onChange={handleChange}
            placeholder="Intro"
            />

            <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={10}
            />

            <button type="submit">Actualizar</button>
        </form>
        </div>
    );
};

export default EditArticle;