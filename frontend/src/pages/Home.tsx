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

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const fetchArticles = async () => {
        setLoading(true);

        try {
            const data = await getArticles(page, 6);

            setArticles(data.articles);
            setPages(data.pagination.pages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchArticles();
    }, [page]);

    if (loading) return <p>Cargando artículos...</p>;

    return (
        <Layout>
        <h1 style={{ marginBottom: "20px" }}>Últimos artículos</h1>

        {articles.length === 0 && <p>Aún no hay artículos</p>}

        {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
        ))}

        {pages > 1 && (
            <div
            style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
            }}
            >
            <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
            >
                ← Anterior
            </button>

            <span>
                Página {page} de {pages}
            </span>

            <button
                disabled={page === pages}
                onClick={() => setPage((prev) => prev + 1)}
            >
                Siguiente →
            </button>
            </div>
        )}
        </Layout>
    );
};

export default Home;