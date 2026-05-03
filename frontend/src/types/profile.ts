import type { Article } from "../types/article";

export type Profile = {
    username: string;
    bio?: string;
    avatar?: string;
    articles: Article[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
};