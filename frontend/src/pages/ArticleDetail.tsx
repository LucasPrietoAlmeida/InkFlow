import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleBySlug, deleteArticle } from "../services/articles";
import { useAuth } from "../context/AuthContext";
import Comments from "../components/Comments";
import type { Article } from "../types/article";
import toast from "react-hot-toast";

const ArticleDetail = () => {
    const { username, slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (!username || !slug) return;

                const data = await getArticleBySlug(username, slug);
                setArticle(data);
            } catch (error) {
                console.error(error);
                setArticle(null);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [username, slug]);

    const handleDelete = async () => {
        if (!article) return;

        const confirmDelete = window.confirm(
            "¿Seguro que quieres borrar este artículo?"
        );

        if (!confirmDelete) return;

        try {
            await deleteArticle(article.id);

            toast.success("Artículo eliminado");

            navigate("/articles");
        } catch (error) {
            toast.error("Error al eliminar el artículo");
            console.error(error);
        }
    };

    if (loading) return <h1>Cargando...</h1>;
    if (!article) return <h1>Artículo no encontrado</h1>;

    const isOwner = user?.id === article.author.id;

    return (
        <div>
            <h1>{article.title}</h1>

            <p>
                <strong>By {article.author.username}</strong>
            </p>

            {isOwner && (
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        margin: "20px 0",
                    }}
                >
                    <button
                        onClick={() =>
                            navigate(`/articles/edit/${article.id}`)
                        }
                        style={{
                            padding: "8px 14px",
                            borderRadius: "6px",
                            border: "1px solid #ddd",
                            background: "#f5f5f5",
                            cursor: "pointer",
                            transition: "0.2s",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#eaeaea")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = "#f5f5f5")
                        }
                    >
                        Editar
                    </button>

                    <button
                        onClick={handleDelete}
                        style={{
                            padding: "8px 14px",
                            borderRadius: "6px",
                            border: "1px solid #ffdddd",
                            background: "#ffe5e5",
                            color: "#b00020",
                            cursor: "pointer",
                            transition: "0.2s",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#ffd6d6")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = "#ffe5e5")
                        }
                    >
                        Borrar
                    </button>
                </div>
            )}

            <p>{article.content}</p>
            <Comments articleId={article.id} />
        </div>
    );
};

export default ArticleDetail;