const categoryService = require("../services/category.service");

const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();

        res.json(categories);
    } catch (error) {
        res.status(500).json({
            error: "Error fetching categories",
        });
    }
};

const getArticlesByCategory = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 20);

        const result = await categoryService.getArticlesByCategory(
            req.params.slug,
            page,
            limit
        );

        res.json(result);
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};

module.exports = {
    getCategories,
    getArticlesByCategory,
};