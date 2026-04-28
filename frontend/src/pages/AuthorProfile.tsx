import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import api from "../services/api";
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

type Profile = {
    username: string;
    bio?: string;
    avatar?: string;
    articles: Article[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
};

const AuthorProfile = () => {
    const { username } = useParams();

    const [data, setData] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);

                const res = await api.get(
                    `/users/${username}?page=${page}&limit=6`
                );

                setData(res.data);
            } catch (error) {
                console.error(error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username, page]);

    if (loading) {
        return (
            <Layout>
                <p>Cargando perfil...</p>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <p>Usuario no encontrado</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "24px",
                }}
            >
                <img
                    src={
                        data.avatar ||
                        "https://via.placeholder.com/80"
                    }
                    alt="avatar"
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />

                <div>
                    <h1>{data.username}</h1>
                    {data.bio && (
                        <p style={{ color: "#666" }}>{data.bio}</p>
                    )}
                </div>
            </div>

            <h2 style={{ marginBottom: "16px" }}>
                Artículos publicados
            </h2>

            {data.articles.length === 0 ? (
                <p>Este usuario aún no tiene artículos publicados</p>
            ) : (
                data.articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                    />
                ))
            )}

            <Pagination
                page={page}
                pages={data.pagination.pages}
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            />
        </Layout>
    );
};

export default AuthorProfile;