const prisma = require("../config/prisma");
const { generateSlug } = require("../utils/slug");

const createArticle = async (data, userId) => {
    const { title, content, intro, coverImage } = data;

    if (!title || !content) {
        throw new Error("Missing fields");
    }

    let slug = generateSlug(title);

    // Evitar duplicados de slug
    const existing = await prisma.article.findUnique({
        where: { slug },
    });

    if (existing) {
        slug = `${slug}-${Date.now()}`;
    }

    const article = await prisma.article.create({
        data: {
        title,
        content,
        intro,
        coverImage,
        slug,
        authorId: userId,
        },
    });

    return article;
};

module.exports = {
    createArticle,
};