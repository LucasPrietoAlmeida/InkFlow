import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

type Comment = {
    id: string;
    content: string;
    createdAt: string;
    author: {
        username: string;
    };
};

const CommentSection = ({ articleId }: { articleId: string }) => {
    const { user } = useAuth();

    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await api.get(`/comments/${articleId}`);
                setComments(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchComments();
    }, [articleId]);

    const handleSubmit = async () => {
        if (!content.trim()) return;

        try {
            const res = await api.post("/comments", {
                articleId,
                content,
            });

            setComments((prev) => [...prev, res.data]);
            setContent("");

            toast.success("Comentario añadido");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div style={{ marginTop: "60px" }}>
            <h2 style={{ marginBottom: "20px" }}>Comentarios</h2>

            {user && (
                <div style={{ marginBottom: "30px" }}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe un comentario..."
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                        }}
                    />

                    <button
                        onClick={handleSubmit}
                        style={{
                            marginTop: "10px",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#111",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        Comentar
                    </button>
                </div>
            )}

            <div>
                {comments.map((c) => (
                    <div
                        key={c.id}
                        style={{
                            padding: "12px",
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        <strong>{c.author.username}</strong>
                        <p>{c.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;