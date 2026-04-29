const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const {
    createArticle,
    getArticles,
    getArticleBySlug,
    updateArticle,
    deleteArticle,
} = require("../controllers/article.controller");

const articleService = require("../services/article.service");

// Crear artículo (privado)
router.post("/", authMiddleware, createArticle);

// Listar artículos (público)
router.get("/", getArticles);

// Obtener artículo por ID (privado, para editar drafts)
router.get("/id/:id", authMiddleware, async (req, res) => {
    try {
        const article = await articleService.getArticleById(req.params.id);

        // solo el autor puede verlo
        if (article.authorId !== req.user.userId) {
        return res.status(403).json({ error: "Unauthorized" });
        }

        res.json(article);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Detalle artículo (público)
router.get("/:username/:slug", getArticleBySlug);

// Actualizar (privado)
router.put("/:id", authMiddleware, updateArticle);

// Borrar (privado)
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;