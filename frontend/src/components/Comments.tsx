import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    getComments,
    createComment,
    deleteComment,
} from "../services/comments";

type Comment = {
    id: string;
    content: string;
    createdAt: string;
    author: {
        id: string;
        username: string;
    };
};

const Comments = ({ articleId }: { articleId: string }) => {
    const { user } = useAuth();

    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");

    const fetchComments = async () => {
        const data = await getComments(articleId);
        setComments(data);
    };

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    const handleSubmit = async () => {
        if (!content) return;

        await createComment({
            articleId,
            content,
        });

        setContent("");
        fetchComments();
    };

    const handleDelete = async (id: string) => {
        await deleteComment(id);
        fetchComments();
    };

    return (
        <div style={{ marginTop: "30px" }}>
            <h3>Comentarios</h3>

            {user && (
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe un comentario..."
                    />
                    <button onClick={handleSubmit}>Enviar</button>
                </div>
            )}

            <div>
                {comments.map((c) => (
                    <div key={c.id} style={{ marginTop: "10px" }}>
                        <strong>{c.author.username}</strong>
                        <p>{c.content}</p>

                        {user?.id === c.author.id && (
                            <button onClick={() => handleDelete(c.id)}>
                                Borrar
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;