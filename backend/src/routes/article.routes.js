const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {
    createArticle,
    getArticles,
} = require("../controllers/article.controller");

// Crear artículo (protegido)
router.post("/", authMiddleware, createArticle);

// Listar artículos (público)
router.get("/", getArticles);

module.exports = router;