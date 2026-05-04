const commentService = require("../services/comment.service");

const createComment = async (req, res) => {
    try {
        const { articleId, content } = req.body;

        const comment = await commentService.createComment(
            articleId,
            req.user.userId,
            content
        );

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByArticle(
            req.params.articleId
        );

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        await commentService.deleteComment(
            req.params.id,
            req.user.userId
        );

        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createComment,
    getComments,
    deleteComment,
};