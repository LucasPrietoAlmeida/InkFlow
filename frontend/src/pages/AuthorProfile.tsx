import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import api from "../services/api";
import Pagination from "../components/Pagination";
import type { Profile } from "../types/profile";

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

                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
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
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                        color: "#666",
                    }}
                >
                    Cargando perfil...
                </p>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                    }}
                >
                    Usuario no encontrado
                </p>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* HERO */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    marginBottom: "40px",
                    paddingBottom: "30px",
                    borderBottom: "1px solid #eee",
                }}
            >
                <img
                    src={
                        data.avatar ||
                        "https://ui-avatars.com/api/?name=" +
                            data.username +
                            "&background=111&color=fff&size=160"
                    }
                    alt={data.username}
                    style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                    }}
                />

                <div>
                    <h1
                        style={{
                            marginBottom: "8px",
                            fontSize: "32px",
                        }}
                    >
                        {data.username}
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            lineHeight: "1.6",
                            marginBottom: "8px",
                        }}
                    >
                        {data.bio || "Todavía no ha añadido una biografía"}
                    </p>

                    <small style={{ color: "#999" }}>
                        {data.pagination.total} artículos publicados
                    </small>
                </div>
            </div>

            {/* ARTICLES */}
            <h2
                style={{
                    marginBottom: "24px",
                    fontSize: "24px",
                }}
            >
                Artículos publicados
            </h2>

            {data.articles.length === 0 ? (
                <p style={{ color: "#666" }}>
                    Este usuario aún no tiene artículos publicados
                </p>
            ) : (
                data.articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={{
                            ...article,
                            author: {
                                username: data.username,
                            },
                        }}
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