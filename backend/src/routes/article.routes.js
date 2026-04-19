const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const {
    createArticle,
    getArticles,
    getArticleBySlug,
    getArticleById,
    updateArticle,
    deleteArticle,
} = require("../controllers/article.controller");

// Crear artículo (privado)
router.post("/", authMiddleware, createArticle);

// Listar artículos (público)
router.get("/", getArticles);

// 👇 IMPORTANTE: poner antes que :slug
router.get("/id/:id", getArticleById);

// Detalle por slug
router.get("/:slug", getArticleBySlug);

// Actualizar
router.put("/:id", authMiddleware, updateArticle);

// Borrar
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;