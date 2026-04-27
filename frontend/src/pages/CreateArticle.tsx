import { useEffect, useState } from "react";
import { createArticle } from "../services/articles";
import { getCategories } from "../services/categories";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

type Category = {
    id: string;
    name: string;
    slug: string;
};

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

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

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
            <h1>Crear artículo</h1>

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

                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CreateArticle;