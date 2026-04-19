const articleService = require("../services/article.service");

const createArticle = async (req, res) => {
    try {
        const article = await articleService.createArticle(
        req.body,
        req.user.userId
        );

        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getArticles = async (req, res) => {
    try {
        const articles = await articleService.getArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Error fetching articles" });
    }
};

const getArticleBySlug = async (req, res) => {
    try {
        const article = await articleService.getArticleBySlug(req.params.slug);
        res.json(article);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getArticleById = async (req, res) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        res.json(article);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const article = await articleService.updateArticle(
        req.params.id,
        req.body,
        req.user.userId
        );

        res.json(article);
    } catch (error) {
        if (error.message === "Unauthorized") {
        return res.status(403).json({ error: error.message });
        }

        res.status(400).json({ error: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const result = await articleService.deleteArticle(
        req.params.id,
        req.user.userId
        );

        res.json(result);
    } catch (error) {
        if (error.message === "Unauthorized") {
        return res.status(403).json({ error: error.message });
        }

        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createArticle,
    getArticles,
    getArticleBySlug,
    getArticleById,
    updateArticle,
    deleteArticle,
};