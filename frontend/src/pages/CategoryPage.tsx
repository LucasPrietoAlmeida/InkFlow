import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getArticlesByCategory,
    getCategories,
} from "../services/categories";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import CategoryBar from "../components/CategoryBar";
import type { Article } from "../types/article";
import type { Category } from "../types/category";

const CategoryPage = () => {
    const { slug } = useParams();

    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const [articlesData, categoriesData] = await Promise.all([
                    getArticlesByCategory(slug!, page, 6),
                    getCategories(),
                ]);

                setArticles(articlesData.articles);
                setPages(articlesData.pagination.pages);
                setCategories(categoriesData);

                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, page]);

    if (loading) {
        return (
            <Layout>
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "50px",
                        color: "#666",
                    }}
                >
                    Cargando categoría...
                </p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1
                style={{
                    marginBottom: "10px",
                    fontSize: "34px",
                }}
            >
                Categoría
            </h1>

            <p
                style={{
                    color: "#666",
                    marginBottom: "24px",
                    textTransform: "capitalize",
                }}
            >
                {slug?.replaceAll("-", " ")}
            </p>

            <CategoryBar
                categories={categories}
                active={slug || null}
            />

            {articles.length === 0 ? (
                <p style={{ color: "#666" }}>
                    No hay artículos en esta categoría
                </p>
            ) : (
                articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                    />
                ))
            )}

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