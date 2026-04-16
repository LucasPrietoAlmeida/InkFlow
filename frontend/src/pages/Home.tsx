import { useEffect, useState } from "react";
import { getArticles } from "../services/articles";
import { useNavigate } from "react-router-dom";

type Article = {
    id: string;
    title: string;
    slug: string;
    intro?: string;
    createdAt: string;
    author: {
        username: string;
    };
};

const Home = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
        try {
            const data = await getArticles();
            setArticles(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchArticles();
    }, []);

    if (loading) return <h1>Loading...</h1>;

    return (
        <div>
        <h1>InkFlow</h1>

        {articles.length === 0 && <p>No articles yet</p>}

        {articles.map((article) => (
            <div
            key={article.id}
            style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}
            >
            <h2
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/articles/${article.slug}`)}
            >
                {article.title}
            </h2>

            <p>{article.intro}</p>

            <small>By {article.author.username}</small>
            </div>
        ))}
        </div>
    );
};

export default Home;