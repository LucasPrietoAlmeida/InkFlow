import { Link } from "react-router-dom";
import type { Article } from "../types/article";

const ArticleCard = ({ article }: { article: Article }) => {
    return (
        <Link
            to={`/${article.author.username}/${article.slug}`}
            style={{
                textDecoration: "none",
                color: "inherit",
            }}
        >
            <div
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "18px",
                    backgroundColor: "#fff",
                    transition: "0.2s",
                    cursor: "pointer",
                }}
            >

                {article.coverImage && (
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "12px",
                        }}
                    />
                )}

                <h2 style={{ marginBottom: "8px" }}>
                    {article.title}
                </h2>

                {article.intro && (
                    <p
                        style={{
                            marginBottom: "12px",
                            color: "#555",
                            lineHeight: "1.5",
                        }}
                    >
                        {article.intro}
                    </p>
                )}

                <small style={{ color: "#888" }}>
                    By {article.author.username} ·{" "}
                    {new Date(article.createdAt).toLocaleDateString()}
                </small>
            </div>
        </Link>
    );
};

export default ArticleCard;