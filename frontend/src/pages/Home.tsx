import { useEffect, useState } from "react";
import { getArticles } from "../services/articles";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";

type Article = {
    id: string;
    title: string;
    slug: string;
    intro?: string;
    createdAt: string;
    author?: {
        username: string;
    };
};

const Home = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p>Cargando artículos...</p>;

    return (
        <Layout>
        <h1 style={{ marginBottom: "20px" }}>Ultimos Artículos</h1>

        {articles.length === 0 && <p>Aún no hay artículos</p>}

        {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
        ))}
        </Layout>
    );
};

export default Home;