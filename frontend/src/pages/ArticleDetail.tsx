import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleBySlug, deleteArticle } from "../services/articles";
import { useAuth } from "../context/AuthContext";
import type { Article } from "../types/article";

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

        const confirmed = window.confirm(
            "¿Seguro que quieres borrar este artículo?"
        );

        if (!confirmed) return;

        try {
            await deleteArticle(article.id);
            navigate("/articles");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading)
        return (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                Cargando artículo...
            </div>
        );

    if (!article) return <h1>Artículo no encontrado</h1>;

    const isOwner = user?.id === article.author.id;

    return (
        <div
            style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "30px 20px",
            }}
        >
            <h1 style={{ marginBottom: "10px" }}>
                {article.title}
            </h1>

            <p style={{ color: "#999", marginBottom: "20px" }}>
                {new Date(article.createdAt).toLocaleDateString()}
            </p>

            <p style={{ color: "#666", marginBottom: "20px" }}>
                <strong>
                    By {article.author.username}
                </strong>
            </p>

            {isOwner && (
                <div style={{ marginBottom: "20px" }}>
                    <button
                        onClick={() =>
                            navigate(`/articles/edit/${article.id}`)
                        }
                        style={{ marginRight: "10px" }}
                    >
                        Editar
                    </button>

                    <button onClick={handleDelete}>
                        Borrar
                    </button>
                </div>
            )}

            <div
                style={{
                    lineHeight: "1.7",
                    fontSize: "16px",
                    color: "#333",
                    whiteSpace: "pre-wrap",
                }}
            >
                {article.content}
            </div>
        </div>
    );
};

export default ArticleDetail;