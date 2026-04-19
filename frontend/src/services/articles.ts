import api from "./api";

export const getArticles = async () => {
    const response = await api.get("/articles");
    return response.data;
};

export const getArticleBySlug = async (slug: string) => {
    const response = await api.get(`/articles/${slug}`);
    return response.data;
};

export const createArticle = async (data: {
    title: string;
    content: string;
    intro?: string;
    }) => {
    const response = await api.post("/articles", data);
    return response.data;
};

export const updateArticle = async (
    id: string,
    data: { title?: string; content?: string; intro?: string }
    ) => {
    const response = await api.put(`/articles/${id}`, data);
    return response.data;
};

export const deleteArticle = async (id: string) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
};