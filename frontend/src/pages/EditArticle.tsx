import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, updateArticle } from "../services/articles";
import { getCategories } from "../services/categories";
import ErrorMessage from "../components/ErrorMessage";
import Layout from "../components/Layout";

type Category = {
    id: string;
    name: string;
    slug: string;
};

const EditArticle = () => {
    const { id } = useParams<{ id: string }>();
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
        const fetchData = async () => {
            try {
                const [article, categoriesData] = await Promise.all([
                    getArticleById(id!),
                    getCategories(),
                ]);

                setCategories(categoriesData);

                setForm({
                    title: article.title || "",
                    intro: article.intro || "",
                    content: article.content || "",
                    status: article.status || "draft",
                    categories:
                        article.categories?.map(
                            (item: any) => item.category.id
                        ) ?? [],
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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

    const handleCategoryChange = (categoryId: string) => {
        setForm((prev) => ({
            ...prev,
            categories: prev.categories.includes(categoryId)
                ? prev.categories.filter((id) => id !== categoryId)
                : [...prev.categories, categoryId],
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

            const article = await updateArticle(id!, {
                ...form,
                categories: form.categories,
            });

            navigate(`/articles/${article.slug}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <p>Cargando artículo...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 style={{ marginBottom: "24px" }}>Editar artículo</h1>

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
                    {submitting ? "Guardando..." : "Guardar cambios"}
                </button>
            </form>
        </Layout>
    );
};

export default EditArticle;