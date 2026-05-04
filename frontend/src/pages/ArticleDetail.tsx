import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticleBySlug, deleteArticle } from "../services/articles";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

type Article = {
    id: string;
    title: string;
    content: string;
    intro?: string;
    createdAt: string;
    categories?: {
        id: string;
        name: string;
        slug: string;
    }[];
    author: {
        id: string;
        username: string;
        bio?: string;
    };
};

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
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    if (loading) {
        return (
            <Layout>
                <p>Cargando artículo...</p>
            </Layout>
        );
    }

    if (!article) {
        return (
            <Layout>
                <p>Artículo no encontrado</p>
            </Layout>
        );
    }

    const isOwner = user?.id === article.author.id;

    return (
        <Layout>
            <article
                style={{
                    maxWidth: "760px",
                    margin: "0 auto",
                    paddingBottom: "80px",
                }}
            >
                <h1
                    style={{
                        fontSize: "44px",
                        lineHeight: 1.15,
                        marginBottom: "16px",
                    }}
                >
                    {article.title}
                </h1>

                                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                        padding: "18px 0",
                        borderTop: "1px solid #eee",
                        borderBottom: "1px solid #eee",
                        marginBottom: "40px",
                    }}
                >
                    <div>
                        <Link
                            to={`/${article.author.username}`}
                            style={{
                                textDecoration: "none",
                                color: "#111",
                                fontWeight: 600,
                                fontSize: "16px",
                            }}
                        >
                            {article.author.username}
                        </Link>

                        <p
                            style={{
                                marginTop: "6px",
                                color: "#777",
                                fontSize: "14px",
                            }}
                        >
                            {new Date(
                                article.createdAt
                            ).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    {isOwner && (
                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                            }}
                        >
                            <button
                                onClick={() =>
                                    navigate(
                                        `/articles/edit/${article.id}`
                                    )
                                }
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    border: "1px solid #ddd",
                                    background: "white",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                }}
                            >
                                Editar
                            </button>

                            <button
                                onClick={handleDelete}
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "8px",
                                    border: "none",
                                    background: "#d92d20",
                                    color: "white",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                }}
                            >
                                Borrar
                            </button>
                        </div>
                    )}
                </div>

                {article.intro && (
                    <p
                        style={{
                            fontSize: "22px",
                            lineHeight: 1.6,
                            color: "#666",
                            marginBottom: "30px",
                        }}
                    >
                        {article.intro}
                    </p>
                )}



                {article.categories &&
                    article.categories.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap",
                                marginBottom: "40px",
                            }}
                        >
                            {article.categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.slug}`}
                                    style={{
                                        textDecoration: "none",
                                        padding: "6px 14px",
                                        borderRadius: "999px",
                                        background: "#f5f5f5",
                                        color: "#333",
                                        fontSize: "14px",
                                    }}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    )}

                <div
                    style={{
                        fontSize: "19px",
                        lineHeight: 1.9,
                        color: "#222",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {article.content}
                </div>
                <CommentSection articleId={article.id} />
            </article>
        </Layout>
    );
};

export default ArticleDetail;