import api from "./api";

export const getArticles = async () => {
    const res = await api.get("/articles");
    return res.data;
};

export const getArticleBySlug = async (slug: string) => {
    const res = await api.get(`/articles/${slug}`);
    return res.data;
};

export const getArticleById = async (id: string) => {
    const res = await api.get(`/articles/id/${id}`);
    return res.data;
};

export const createArticle = async (data: any) => {
    const res = await api.post("/articles", data);
    return res.data;
};

export const updateArticle = async (id: string, data: any) => {
    const res = await api.put(`/articles/${id}`, data);
    return res.data;
};

export const deleteArticle = async (id: string) => {
    const res = await api.delete(`/articles/${id}`);
    return res.data;
};