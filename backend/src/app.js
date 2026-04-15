const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(cors());
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

// Auth routes
app.use("/api/auth", authRoutes);

module.exports = app;