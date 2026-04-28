import { useEffect, useState } from "react";
import { getArticles } from "../services/articles";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";

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

                setArticles(data?.articles ?? []);
                setPages(data?.pagination?.pages ?? 1);

                window.scrollTo({ top: 0, behavior: "smooth" });
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
            <h1>Últimos artículos</h1>

            {articles.length === 0 && <p>Aún no hay artículos</p>}

            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}

            <Pagination
                page={page}
                pages={pages}
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            />
        </Layout>
    );
};

export default Home;