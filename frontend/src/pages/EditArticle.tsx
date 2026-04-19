import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleBySlug, updateArticle } from "../services/articles";

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        intro: "",
        content: "",
    });

    useEffect(() => {
    }, []);

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

        try {
        const article = await updateArticle(id, form);
        navigate(`/articles/${article.slug}`);
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div>
        <h1>Edit Article</h1>

        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" onChange={handleChange} />
            <input name="intro" placeholder="Intro" onChange={handleChange} />
            <textarea name="content" rows={10} onChange={handleChange} />

            <button type="submit">Update</button>
        </form>
        </div>
    );
};

export default EditArticle;