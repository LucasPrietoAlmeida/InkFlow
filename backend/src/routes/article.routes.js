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

// Crear artículo (privado)
router.post("/", authMiddleware, createArticle);

// Listar artículos (público)
router.get("/", getArticles);

// Detalle artículo (público)
router.get("/:slug", getArticleBySlug);

// Actualizar (privado)
router.put("/:id", authMiddleware, updateArticle);

// Borrar (privado)
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;