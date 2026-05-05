export type Article = {
    id: string;
    title: string;
    slug: string;
    content: string;
    coverImage?: string;
    intro?: string;
    createdAt: string;
    categories?: {
        id: string;
        name: string;
        slug: string;
    }[];
    author: {
        id?: string;
        username: string;
        bio?: string;
    };
};