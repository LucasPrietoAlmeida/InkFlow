import api from "./api";

export const getComments = async (articleId: string) => {
    const res = await api.get(`/comments/${articleId}`);
    return res.data;
};

export const createComment = async (data: {
    articleId: string;
    content: string;
}) => {
    const res = await api.post("/comments", data);
    return res.data;
};

export const deleteComment = async (id: string) => {
    const res = await api.delete(`/comments/${id}`);
    return res.data;
};