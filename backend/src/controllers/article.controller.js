const articleService = require("../services/article.service");

const createArticle = async (req, res) => {
    try {
        const article = await articleService.createArticle(
        req.body,
        req.user.userId
        );

        res.status(201).json(article);
    } catch (error) {
        console.error("Create article error:", error.message);

        res.status(400).json({
        error: error.message,
        });
    }
};

module.exports = {
    createArticle,
};