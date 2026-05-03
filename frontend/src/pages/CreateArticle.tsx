import { useEffect, useState } from "react";
import { createArticle } from "../services/articles";
import { getCategories } from "../services/categories";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Layout from "../components/Layout";
import type { Category } from "../types/category";

const CreateArticle = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);

    const [form, setForm] = useState({
        title: "",
        intro: "",
        content: "",
        status: "draft",
        categories: [] as string[],
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = (id: string) => {
        setForm((prev) => ({
            ...prev,
            categories: prev.categories.includes(id)
                ? prev.categories.filter((catId) => catId !== id)
                : [...prev.categories, id],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if (!form.title.trim() || !form.content.trim()) {
            setError("El título y el contenido son obligatorios");
            return;
        }

        try {
            setSubmitting(true);

            const article = await createArticle({
                ...form,
                categories: form.categories,
            });

        navigate(`/${article.author.username}/${article.slug}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <p>Cargando categorías...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 style={{ marginBottom: "24px" }}>Crear artículo</h1>

            {error && <ErrorMessage message={error} />}

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    maxWidth: "800px",
                }}
            >
                <input
                    name="title"
                    placeholder="Título"
                    value={form.title}
                    onChange={handleChange}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                    }}
                />

                <input
                    name="intro"
                    placeholder="Introducción"
                    value={form.intro}
                    onChange={handleChange}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                    }}
                />

                <textarea
                    name="content"
                    rows={12}
                    placeholder="Contenido"
                    value={form.content}
                    onChange={handleChange}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        resize: "vertical",
                    }}
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                    }}
                >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                </select>

                <div>
                    <h3 style={{ marginBottom: "12px" }}>Categorías</h3>

                    {categories.length === 0 ? (
                        <p>No hay categorías disponibles</p>
                    ) : (
                        categories.map((category) => (
                            <label
                                key={category.id}
                                style={{
                                    display: "block",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={form.categories.includes(category.id)}
                                    onChange={() =>
                                        handleCategoryChange(category.id)
                                    }
                                    style={{ marginRight: "8px" }}
                                />
                                {category.name}
                            </label>
                        ))
                    )}
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        padding: "12px 20px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: submitting ? "not-allowed" : "pointer",
                        opacity: submitting ? 0.7 : 1,
                    }}
                >
                    {submitting ? "Creando..." : "Crear artículo"}
                </button>
            </form>
        </Layout>
    );
};

export default CreateArticle;