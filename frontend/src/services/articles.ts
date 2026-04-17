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