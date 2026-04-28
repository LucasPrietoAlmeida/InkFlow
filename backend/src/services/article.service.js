const prisma = require("../config/prisma");
const { generateSlug } = require("../utils/slug");

const publishedWhere = {
    status: "published",
    OR: [
        { publishedAt: null },
        { publishedAt: { lte: new Date() } },
    ],
};

const createArticle = async (data, userId) => {
    const {
        title,
        content,
        intro,
        coverImage,
        status,
        publishedAt,
        categories = [],
    } = data;

    if (!title || !content) {
        throw new Error("Missing fields");
    }

    let slug = generateSlug(title);

    const existing = await prisma.article.findUnique({
        where: { slug },
    });

    if (existing) {
        slug = `${slug}-${Date.now()}`;
    }

    return prisma.article.create({
        data: {
            title,
            content,
            intro,
            coverImage,
            slug,
            authorId: userId,
            status: status || "draft",
            publishedAt: publishedAt ? new Date(publishedAt) : null,
            categories: {
                connect: categories.map((id) => ({ id })),
            },
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                },
            },
            categories: true,
        },
    });
};

const getArticles = async (page = 1, limit = 6) => {
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
        prisma.article.findMany({
            where: publishedWhere,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                categories: true,
            },
        }),
        prisma.article.count({
            where: publishedWhere,
        }),
    ]);

    return {
        articles,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

const getArticleBySlug = async (slug) => {
    const article = await prisma.article.findFirst({
        where: {
            slug,
            ...publishedWhere,
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            },
            categories: true,
        },
    });

    if (!article) {
        throw new Error("Article not found");
    }

    return article;
};

const getArticleById = async (id) => {
    const article = await prisma.article.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            },
            categories: true,
        },
    });

    if (!article) {
        throw new Error("Article not found");
    }

    return article;
};

const updateArticle = async (id, data, userId) => {
    const article = await prisma.article.findUnique({
        where: { id },
    });

    if (!article) {
        throw new Error("Article not found");
    }

    if (article.authorId !== userId) {
        throw new Error("Unauthorized");
    }

    const updatedData = { ...data };

    if (data.title) {
        let newSlug = generateSlug(data.title);

        const existing = await prisma.article.findUnique({
            where: { slug: newSlug },
        });

        if (existing && existing.id !== id) {
            newSlug = `${newSlug}-${Date.now()}`;
        }

        updatedData.slug = newSlug;
    }

    if (data.publishedAt) {
        updatedData.publishedAt = new Date(data.publishedAt);
    }

    if (data.categories) {
        updatedData.categories = {
            set: data.categories.map((id) => ({ id })),
        };
    }

    return prisma.article.update({
        where: { id },
        data: updatedData,
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                },
            },
            categories: true,
        },
    });
};

const deleteArticle = async (id, userId) => {
    const article = await prisma.article.findUnique({
        where: { id },
    });

    if (!article) {
        throw new Error("Article not found");
    }

    if (article.authorId !== userId) {
        throw new Error("Unauthorized");
    }

    await prisma.article.delete({
        where: { id },
    });

    return {
        message: "Article deleted",
    };
};

module.exports = {
    createArticle,
    getArticles,
    getArticleBySlug,
    getArticleById,
    updateArticle,
    deleteArticle,
};