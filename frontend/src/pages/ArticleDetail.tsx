import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleBySlug } from "../services/articles";

type Article = {
    id: string;
    title: string;
    content: string;
    intro?: string;
    createdAt: string;
    author: {
        username: string;
    };
};

const ArticleDetail = () => {
    const { slug } = useParams();

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
        try {
            if (!slug) return;

            const data = await getArticleBySlug(slug);
            setArticle(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchArticle();
    }, [slug]);

    if (loading) return <h1>Loading...</h1>;

    if (!article) return <h1>Article not found</h1>;

    return (
        <div>
        <h1>{article.title}</h1>

        <p>
            <strong>By {article.author.username}</strong>
        </p>

        <p>{article.content}</p>
        </div>
    );
};

export default ArticleDetail;