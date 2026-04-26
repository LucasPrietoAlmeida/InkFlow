const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");

const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middlewares/auth.middleware");
const articleRoutes = require("./routes/article.routes");

const app = express();

// Middlewares
app.use(
    cors({
        origin: [
        "http://localhost:5173",
        "https://inkflow-kc.vercel.app",
        ],
        credentials: true,
    })
);
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "inkflow-backend",
        time: new Date().toISOString(),
    });
});

// Test DB connection
app.get("/test-db", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        error: "Database connection error",
        });
    }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// Test Ruta protegida 
app.get("/api/private", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route",
        user: req.user,
    });
});

module.exports = app;