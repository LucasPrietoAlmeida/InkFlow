import api from "./api";

export const getArticles = async () => {
    const response = await api.get("/articles");
    return response.data;
};