const express = require("express");
const router = express.Router();

const {
    getCategories,
    getArticlesByCategory,
} = require("../controllers/category.controller");

router.get("/", getCategories);
router.get("/:slug/articles", getArticlesByCategory);

module.exports = router;