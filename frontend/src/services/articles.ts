import api from "./api";

export const getArticles = async (page = 1, limit = 6) => {
    const res = await api.get(`/articles?page=${page}&limit=${limit}`);
    return res.data;
};

export const getArticleBySlug = async (
    username: string,
    slug: string
) => {
    const res = await api.get(
        `/articles/${username}/${slug}`
    );

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