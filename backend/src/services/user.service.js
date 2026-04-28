const prisma = require("../config/prisma");

const getPublicProfile = async (username, page = 1, limit = 6) => {
    const skip = (page - 1) * limit;

    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            bio: true,
            avatar: true,
        },
    });

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const [articles, total] = await Promise.all([
        prisma.article.findMany({
            where: {
                authorId: user.id,
                status: "published",
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
            select: {
                id: true,
                title: true,
                slug: true,
                intro: true,
                createdAt: true,
            },
        }),

        prisma.article.count({
            where: {
                authorId: user.id,
                status: "published",
            },
        }),
    ]);

    return {
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
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
    getPublicProfile,
};