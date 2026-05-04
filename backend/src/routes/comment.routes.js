const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const {
    createComment,
    getComments,
    deleteComment,
} = require("../controllers/comment.controller");

router.get("/:articleId", getComments);
router.post("/", authMiddleware, createComment);
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;