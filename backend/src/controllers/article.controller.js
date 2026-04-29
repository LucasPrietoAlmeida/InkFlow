const articleService = require("../services/article.service");

const prisma = require("../config/prisma");

const createArticle = async (req, res) => {
    try {
        const article = await articleService.createArticle(req.body, req.user.userId);
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getArticles = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 20);

        const result = await articleService.getArticles(page, limit);

        res.json(result);
    } catch (error) {
        console.error("GET ARTICLES ERROR:", error);

        res.status(500).json({
            error: error.message,
        });
    }
};

const getArticleBySlug = async (req, res) => {
    try {
        const { username, slug } = req.params;

        // Buscar usuario
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Buscar artículo del usuario
        const article = await prisma.article.findFirst({
            where: {
                slug,
                authorId: user.id,
                status: "published",
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                    },
                },
                categories: true,
            },
        });

        // Validación
        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        return res.json(article);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
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
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createArticle,
    getArticles,
    getArticleBySlug,
    updateArticle,
    deleteArticle
};