import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByCategory } from "../services/categories";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import type { Article } from "../types/article";

const CategoryPage = () => {
    const { slug } = useParams();

    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const data = await getArticlesByCategory(slug!, page, 6);

                setArticles(data.articles);
                setPages(data.pagination.pages);

                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, page]);

    if (loading) return <p>Cargando categoría...</p>;

    return (
        <Layout>
            <h1 style={{ marginBottom: "20px" }}>
                Categoría: {slug}
            </h1>

            {articles.length === 0 && (
                <p>No hay artículos en esta categoría</p>
            )}

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

export default CategoryPage;