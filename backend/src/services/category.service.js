const prisma = require("../config/prisma");

const publishedWhere = {
    status: "published",
    OR: [
        { publishedAt: null },
        { publishedAt: { lte: new Date() } },
    ],
};

const getCategories = async () => {
    return prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
};

const getArticlesByCategory = async (slug, page = 1, limit = 6) => {
    const skip = (page - 1) * limit;

    const category = await prisma.category.findUnique({
        where: { slug },
    });

    if (!category) {
        throw new Error("Category not found");
    }

    const where = {
        ...publishedWhere,
        categories: {
            some: {
                slug,
            },
        },
    };

    const [articles, total] = await Promise.all([
        prisma.article.findMany({
            where,
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
        prisma.article.count({ where }),
    ]);

    return {
        category,
        articles,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

module.exports = {
    getCategories,
    getArticlesByCategory,
};