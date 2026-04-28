import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById, updateArticle } from "../services/articles";
import { getCategories } from "../services/categories";
import ErrorMessage from "../components/ErrorMessage";

type Category = {
    id: string;
    name: string;
    slug: string;
};

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
            navigate(`/articles/${article.slug}`);
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>Editar artículo</h1>

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

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>

                <h3>Categorías</h3>

                {categories.map((category) => (
                    <label
                        key={category.id}
                        style={{
                            display: "block",
                            marginBottom: "8px",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={form.categories.includes(category.id)}
                            onChange={() =>
                                handleCategoryChange(category.id)
                            }
                        />{" "}
                        {category.name}
                    </label>
                ))}

                <button type="submit">
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};

export default EditArticle;