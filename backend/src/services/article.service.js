const prisma = require("../config/prisma");
const { generateSlug } = require("../utils/slug");

const createArticle = async (data, userId) => {
    const { title, content, intro, coverImage, status, publishedAt } = data;

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
        },
    });
};

const getArticles = async (page = 1, limit = 6) => {
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
        prisma.article.findMany({
        where: {
            status: "PUBLISHED",
            publishedAt: {
            lte: new Date(),
            },
        },
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
        },
        }),

        prisma.article.count({
        where: {
            status: "PUBLISHED",
            publishedAt: {
            lte: new Date(),
            },
        },
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
        status: "published",
        OR: [
            { publishedAt: null },
            { publishedAt: { lte: new Date() } },
        ],
        },
        include: {
        author: {
            select: {
            id: true,
            username: true,
            email: true,
            },
        },
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

    let updatedData = { ...data };

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

    return prisma.article.update({
        where: { id },
        data: updatedData,
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

    return { message: "Article deleted" };
};

module.exports = {
    createArticle,
    getArticles,
    getArticleBySlug,
    getArticleById,
    updateArticle,
    deleteArticle,
};