const prisma = require("../config/prisma");
const { generateSlug } = require("../utils/slug");

const createArticle = async (data, userId) => {
    const { title, content, intro, coverImage } = data;

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
        },
    });
    };

    const getArticles = async () => {
    return prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        include: {
        author: {
            select: {
            id: true,
            username: true,
            },
        },
        },
    });
};

const getArticleBySlug = async (slug) => {
    const article = await prisma.article.findUnique({
        where: { slug },
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