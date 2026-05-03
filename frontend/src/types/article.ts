export type Article = {
    id: string;
    title: string;
    slug: string;
    intro?: string;
    content?: string;
    createdAt: string;
    author: {
        id?: string;
        username: string;
    };
};