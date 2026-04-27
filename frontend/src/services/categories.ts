import api from "./api";

export const getCategories = async () => {
    const res = await api.get("/categories");
    return res.data;
};

export const getArticlesByCategory = async (
    slug: string,
    page = 1,
    limit = 6
) => {
        const res = await api.get(
            `/categories/${slug}/articles?page=${page}&limit=${limit}`
        );

        return res.data;
};