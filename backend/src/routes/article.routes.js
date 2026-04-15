const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { createArticle } = require("../controllers/article.controller");

// POST /api/articles
router.post("/", authMiddleware, createArticle);

module.exports = router;