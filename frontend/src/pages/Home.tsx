import { useEffect, useState } from "react";
import { getArticles } from "../services/articles";
import { getCategories } from "../services/categories";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import CategoryBar from "../components/CategoryBar";
import type { Article } from "../types/article";
import type { Category } from "../types/category";

const Home = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const [articlesData, categoriesData] = await Promise.all([
                    getArticles(page, 6),
                    getCategories(),
                ]);

                setArticles(articlesData.articles);
                setPages(articlesData.pagination.pages);
                setCategories(categoriesData);

                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    if (loading) return <p>Cargando artículos...</p>;

    return (
        <Layout>
            <h1 style={{ marginBottom: "10px" }}>
                Últimos artículos
            </h1>

            <CategoryBar categories={categories} active={null} />

            {articles.length === 0 && (
                <p>No hay artículos</p>
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

export default Home;