const prisma = require("../config/prisma");

const createComment = async (articleId, userId, content) => {
    if (!content) throw new Error("Content is required");

    return prisma.comment.create({
        data: {
            content,
            articleId,
            authorId: userId,
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            },
        },
    });
};

const getCommentsByArticle = async (articleId) => {
    return prisma.comment.findMany({
        where: { articleId },
        orderBy: { createdAt: "desc" },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            },
        },
    });
};

const deleteComment = async (commentId, userId) => {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
    });

    if (!comment) throw new Error("Comment not found");

    if (comment.authorId !== userId) {
        throw new Error("Unauthorized");
    }

    return prisma.comment.delete({
        where: { id: commentId },
    });
};

module.exports = {
    createComment,
    getCommentsByArticle,
    deleteComment,
};