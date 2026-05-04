import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, updateArticle } from "../services/articles";
import { getCategories } from "../services/categories";
import ErrorMessage from "../components/ErrorMessage";
import toast from "react-hot-toast";
import type { Category } from "../types/category";

const EditArticle = () => {
    const { id } = useParams();
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
                    title: article.title,
                    intro: article.intro || "",
                    content: article.content,
                    status: article.status,
                    categories: article.categories.map((c: Category) => c.id),
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
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
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

        if (!form.title || !form.content) {
            setError("Title and content are required");
            return;
        }

        try {
            const article = await updateArticle(id!, form);

            toast.success("Artículo actualizado correctamente");

            navigate(`/articles/${article.slug}`);
        } catch (err: any) {
            toast.error("Error al actualizar el artículo");
            setError(err.message);
        }
    };

    if (loading) return <p>Cargando editor...</p>;

    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "20px",
            }}
        >
            <h1 style={{ marginBottom: "24px" }}>Editar artículo</h1>

            {error && <ErrorMessage message={error} />}

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                {/* TITLE */}
                <input
                    name="title"
                    placeholder="Título del artículo"
                    value={form.title}
                    onChange={handleChange}
                    style={{
                        padding: "14px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        fontWeight: "500",
                    }}
                />

                {/* INTRO */}
                <input
                    name="intro"
                    placeholder="Introducción (opcional)"
                    value={form.intro}
                    onChange={handleChange}
                    style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                    }}
                />

                {/* CONTENT */}
                <textarea
                    name="content"
                    rows={12}
                    placeholder="Escribe tu contenido aquí..."
                    value={form.content}
                    onChange={handleChange}
                    style={{
                        padding: "14px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        resize: "vertical",
                        fontSize: "14px",
                        lineHeight: "1.5",
                    }}
                />

                {/* STATUS */}
                <div>
                    <label style={{ fontWeight: "500" }}>Estado</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        style={{
                            marginTop: "6px",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            width: "200px",
                        }}
                    >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                    </select>
                </div>

                {/* CATEGORIES */}
                <div>
                    <h3 style={{ marginBottom: "10px" }}>Categorías</h3>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                        }}
                    >
                        {categories.map((category) => {
                            const active = form.categories.includes(
                                category.id
                            );

                            return (
                                <button
                                    type="button"
                                    key={category.id}
                                    onClick={() =>
                                        handleCategoryChange(category.id)
                                    }
                                    style={{
                                        padding: "6px 12px",
                                        borderRadius: "999px",
                                        border: "1px solid #ddd",
                                        background: active
                                            ? "#111"
                                            : "white",
                                        color: active ? "white" : "#333",
                                        cursor: "pointer",
                                        transition: "0.2s",
                                    }}
                                >
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ACTIONS */}
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "10px",
                    }}
                >
                    <button
                        type="submit"
                        style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#111",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        Guardar cambios
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            background: "white",
                            cursor: "pointer",
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditArticle;