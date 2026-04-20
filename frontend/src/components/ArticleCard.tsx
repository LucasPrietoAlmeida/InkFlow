import { Link } from "react-router-dom";

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

const ArticleCard = ({ article }: { article: Article }) => {
    return (
        <div
        style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#fff",
        }}
        >
        <Link
            to={`/articles/${article.slug}`}
            style={{ textDecoration: "none", color: "black" }}
        >
            <h2 style={{ marginBottom: "8px" }}>{article.title}</h2>
        </Link>

        {article.intro && (
            <p style={{ marginBottom: "12px", color: "#555" }}>
            {article.intro}
            </p>
        )}

        <small style={{ color: "#888" }}>
            By {article.author?.username || "Unknown"} ·{" "}
            {new Date(article.createdAt).toLocaleDateString()}
        </small>
        </div>
    );
};

export default ArticleCard;