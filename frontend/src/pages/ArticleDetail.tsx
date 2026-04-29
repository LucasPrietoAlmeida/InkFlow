import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleBySlug, deleteArticle } from "../services/articles";
import { useAuth } from "../context/AuthContext";

type Article = {
    id: string;
    title: string;
    content: string;
    intro?: string;
    createdAt: string;
    author: {
        id: string;
        username: string;
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

        try {
            await deleteArticle(article.id);
            navigate("/articles");
        } catch (error) {
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
                <div>
                    <button
                        onClick={() =>
                            navigate(`/articles/edit/${article.id}`)
                        }
                    >
                        Editar
                    </button>

                    <button onClick={handleDelete}>
                        Borrar
                    </button>
                </div>
            )}

            <p>{article.content}</p>
        </div>
    );
};

export default ArticleDetail;