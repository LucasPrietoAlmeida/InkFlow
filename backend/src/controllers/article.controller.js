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

const getArticles = async (req, res) => {
    try {
        const articles = await articleService.getArticles();

        res.status(200).json(articles);
    } catch (error) {
        console.error("Get articles error:", error.message);

        res.status(500).json({
        error: "Error fetching articles",
        });
    }
};

module.exports = {
    createArticle,
    getArticles,
};